import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTwitchChat, LS_KEY_TWITCH_CHANNEL } from "localboast";
import styles from "./styles.module.sass";
import { AuthStep, JoinStep, LoadStep, PlayStep } from "./components/Steps";
import { LS_ET_CHAT_SKETCH_LINES, TWITCH_CHAT_BOT_CLIENT_ID } from "constants/twitchConstants";
import Panel from "./components/Panel";
import DebugPanel from "./components/Steps/DebugPanel";
import { PanelKnobProps } from "./components/Panel/Panel";

enum Step {
  Loading,
  Auth,
  Join,
  Play,
}

export type Coords = [number, number];

const getNewCoordinateFromMessage = (currentCoords: Coords, multiplier: number, message: string) => {
  const newCoords: Coords = [...currentCoords];
  const messageDown = message.toLocaleLowerCase();
  let hasMoved = false;

  if (messageDown.includes("up")) {
    newCoords[1] -= multiplier;
    hasMoved = true;
  }
  if (messageDown.includes("down")) {
    newCoords[1] += multiplier;
    hasMoved = true;
  }
  if (messageDown.includes("left")) {
    newCoords[0] -= multiplier;
    hasMoved = true;
  }
  if (messageDown.includes("right")) {
    newCoords[0] += multiplier;
    hasMoved = true;
  }

  return hasMoved ? newCoords : null;
};

const getInitialCoordinateData = (startCoordsFallback: Coords) => {
  const persistedLinesString = localStorage.getItem(LS_ET_CHAT_SKETCH_LINES);
  let coords = [startCoordsFallback];
  if (persistedLinesString) {
    try {
      coords = JSON.parse(persistedLinesString);
    } catch (e) {
      // Failed to parse persisted drawing, just clear persistence
      localStorage.removeItem(LS_ET_CHAT_SKETCH_LINES);
    }
  }
  return coords;
};

const EtChatSketch = () => {
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const [channel, setChannel] = useState<string | null>(localStorage.getItem(LS_KEY_TWITCH_CHANNEL));
  const [startCoords] = useState<Coords>([0, 0]);
  const [leftRotation, setLeftRotation] = useState(0);
  const [rightRotation, setRightRotation] = useState(0);
  const [lineCoords, setLineCoords] = useState<Coords[]>(() => getInitialCoordinateData(startCoords));
  const [multiplier, setMultiplier] = useState(10);
  const handleNewMessages = useCallback(
    (newMessages: string[]) => {
      setLineCoords((oldCoords) => {
        let updatedCoords = oldCoords;
        newMessages.forEach((newMessage) => {
          const newCoords = getNewCoordinateFromMessage(oldCoords[oldCoords.length - 1], multiplier, newMessage);
          if (newCoords) {
            const prevCoords = updatedCoords[updatedCoords.length - 1];

            if (newCoords[0] !== prevCoords[0]) {
              setLeftRotation((oldRotation) => {
                if (newCoords[0] > prevCoords[0]) {
                  return oldRotation + multiplier;
                } else {
                  return oldRotation - multiplier;
                }
              });
            }
            if (newCoords[1] !== prevCoords[1]) {
              setRightRotation((oldRotation) => {
                if (newCoords[1] > prevCoords[1]) {
                  return oldRotation - multiplier;
                } else {
                  return oldRotation + multiplier;
                }
              });
            }

            updatedCoords = [...updatedCoords, newCoords];
          }
        });
        return updatedCoords;
      });
    },
    [multiplier]
  );
  const {
    authIFrameRef,
    username,
    authenticate,
    logOut,
    authenticated,
    authenticating,
    chats,
    clearChats,
    joinChannel,
    disconnectChat,
    leaveChannel,
    chatJoined,
    chatJoining,
    chatError,
  } = useTwitchChat({ botId: TWITCH_CHAT_BOT_CLIENT_ID, onMessage: handleNewMessages });
  const activeStep = useMemo<Step>(() => {
    switch (true) {
      case authenticating || chatJoining:
        return Step.Loading;
      case !username:
        return Step.Auth;
      case !chatJoined:
        return Step.Join;
      default:
        return Step.Play;
    }
  }, [authenticating, chatJoining, chatJoined, username]);
  const knobProps = useMemo(() => {
    const newKnobProps: PanelKnobProps[] = [];
    switch (activeStep) {
      case Step.Loading:
        newKnobProps[0] = {
          buttonText: "Cancel",
          onClick: logOut,
        };
        break;
      case Step.Auth:
        break;
      case Step.Join:
        newKnobProps[0] = {
          buttonText: "Back",
          onClick: logOut,
        };
        newKnobProps[1] = {
          buttonText: "Start",
          onClick: () => joinChannel(channel || undefined),
        };
        break;
      case Step.Play:
        newKnobProps[0] = {
          buttonText: "Back",
          onClick: leaveChannel!,
          rotation: leftRotation,
        };
        newKnobProps[1] = {
          buttonText: "Clear",
          onClick: () => {
            clearChats();
            setLineCoords([startCoords]);
          },
          rotation: rightRotation,
        };
        break;
    }
    return newKnobProps;
  }, [activeStep, channel, startCoords, clearChats, leaveChannel, joinChannel, logOut, leftRotation, rightRotation]);

  // Persist any line changes to LS
  useEffect(() => {
    localStorage.setItem(LS_ET_CHAT_SKETCH_LINES, JSON.stringify(lineCoords));
  }, [lineCoords]);

  useEffect(() => {
    if (channel) {
      localStorage.setItem(LS_KEY_TWITCH_CHANNEL, channel);
    } else {
      localStorage.removeItem(LS_KEY_TWITCH_CHANNEL);
    }
  }, [channel]);

  return (
    <div
      className={styles.mainWindow}
      ref={(ref) => {
        iframeContainerRef.current = ref;
        if (authIFrameRef.current) {
          ref?.appendChild(authIFrameRef.current);
          authIFrameRef.current.className = styles.authIframe;
        }
      }}
    >
      <Panel multiplier={multiplier} setMultiplier={setMultiplier} knobProps={knobProps}>
        {activeStep === Step.Loading && (
          <LoadStep authenticated={authenticated} cancelJoin={disconnectChat!} cancelLogin={logOut} />
        )}
        {activeStep === Step.Auth && <AuthStep authenticate={authenticate} />}
        {activeStep === Step.Join && (
          <JoinStep chatError={chatError} username={username!} channel={channel} setChannel={setChannel} />
        )}
        {activeStep === Step.Play && <PlayStep lineCoords={lineCoords} />}
      </Panel>
      {activeStep === Step.Play && (
        <DebugPanel
          chats={chats}
          clearChats={clearChats}
          leaveChannel={leaveChannel!}
          channel={channel!}
          username={username!}
          logOut={logOut}
        />
      )}
    </div>
  );
};

export default EtChatSketch;
