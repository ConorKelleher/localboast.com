import { useCallback, useMemo, useRef, useState } from "react";
import useTwitchChat from "localboast/hooks/useTwitchChat";
import useLocalStorage from "localboast/hooks/useLocalStorage";
import { LS_KEY_TWITCH_CHANNEL } from "localboast/constants/twitchConstants";
import styles from "./styles.module.sass";
import { AuthStep, JoinStep, LoadStep, PlayStep } from "./components/Steps";
import { LS_ET_CHAT_SKETCH_LINES, TWITCH_CHAT_BOT_CLIENT_ID } from "constants/twitchConstants";
import Panel from "./components/Panel";
import DebugPanel from "./components/Steps/DebugPanel";
import { PanelKnobProps } from "./components/Panel/Panel";
import { last } from "localboast/utils/arrayHelpers";
import usePageTitle from "localboast/hooks/usePageTitle";

enum Step {
  Loading,
  Auth,
  Join,
  Play,
}

export type Coordinate = [number, number];
const DEFAULT_START_COORDINATE: Coordinate = [0, 0];

const getNewCoordinateFromMessage = (currentCoordinates: Coordinate[] | null, multiplier: number, message: string) => {
  const newCoordinate: Coordinate = currentCoordinates ? [...last(currentCoordinates)] : DEFAULT_START_COORDINATE;
  const messageDown = message.toLocaleLowerCase();
  let hasMoved = false;

  if (messageDown.includes("up")) {
    newCoordinate[1] -= multiplier;
    hasMoved = true;
  }
  if (messageDown.includes("down")) {
    newCoordinate[1] += multiplier;
    hasMoved = true;
  }
  if (messageDown.includes("left")) {
    newCoordinate[0] -= multiplier;
    hasMoved = true;
  }
  if (messageDown.includes("right")) {
    newCoordinate[0] += multiplier;
    hasMoved = true;
  }

  return hasMoved ? newCoordinate : null;
};

const EtChatSketch = () => {
  usePageTitle("Et-Chat-Sketch - LocalBoast");
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const [channel, setChannel] = useLocalStorage(LS_KEY_TWITCH_CHANNEL, "");
  const [lineCoordinates, setLineCoordinates] = useLocalStorage<Coordinate[]>(
    LS_ET_CHAT_SKETCH_LINES,
    [DEFAULT_START_COORDINATE],
    {
      parse: JSON.parse,
      stringify: JSON.stringify,
    }
  );
  const [startCoordinate] = useState<Coordinate>(DEFAULT_START_COORDINATE);
  const [leftRotation, setLeftRotation] = useState(0);
  const [rightRotation, setRightRotation] = useState(0);
  const [multiplier, setMultiplier] = useState(10);
  const handleNewMessages = useCallback(
    (newMessages: string[]) => {
      setLineCoordinates((oldCoordinates) => {
        let updatedCoordinates = oldCoordinates || [];
        newMessages.forEach((newMessage) => {
          const newCoordinate = getNewCoordinateFromMessage(oldCoordinates, multiplier, newMessage);
          if (newCoordinate) {
            const prevCoordinate = last(updatedCoordinates);

            if (prevCoordinate) {
              if (newCoordinate[0] !== prevCoordinate[0]) {
                setLeftRotation((oldRotation) => {
                  if (newCoordinate[0] > prevCoordinate[0]) {
                    return oldRotation + multiplier;
                  } else {
                    return oldRotation - multiplier;
                  }
                });
              }
              if (newCoordinate[1] !== prevCoordinate[1]) {
                setRightRotation((oldRotation) => {
                  if (newCoordinate[1] > prevCoordinate[1]) {
                    return oldRotation - multiplier;
                  } else {
                    return oldRotation + multiplier;
                  }
                });
              }
            }

            updatedCoordinates = [...updatedCoordinates, newCoordinate];
          }
        });
        return updatedCoordinates;
      });
    },
    [multiplier, setLineCoordinates]
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
    chatReconnecting,
  } = useTwitchChat({ botId: TWITCH_CHAT_BOT_CLIENT_ID, onMessage: handleNewMessages });
  const activeStep = useMemo<Step>(() => {
    switch (true) {
      case authenticating || chatJoining || chatReconnecting:
        return Step.Loading;
      case !username:
        return Step.Auth;
      case !chatJoined:
        return Step.Join;
      default:
        return Step.Play;
    }
  }, [authenticating, chatJoining, chatJoined, chatReconnecting, username]);
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
            setLineCoordinates([startCoordinate]);
          },
          rotation: rightRotation,
        };
        break;
    }
    return newKnobProps;
  }, [
    activeStep,
    channel,
    startCoordinate,
    setLineCoordinates,
    clearChats,
    leaveChannel,
    joinChannel,
    logOut,
    leftRotation,
    rightRotation,
  ]);

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
        {activeStep === Step.Play && <PlayStep lineCoordinates={lineCoordinates} />}
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
