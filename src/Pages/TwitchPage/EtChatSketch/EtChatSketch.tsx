import { useEffect, useMemo, useRef, useState } from "react";
import { useTwitchChat, LS_KEY_TWITCH_CHANNEL } from "localboast";
import styles from "./styles.module.sass";
import { AuthStep, JoinStep, LoadStep, PlayStep } from "./components/Steps";
import { TWITCH_CHAT_BOT_CLIENT_ID } from "constants/twitchConstants";
import Panel from "./components/Panel";
import DebugPanel from "./components/Steps/DebugPanel";
import { KnobProps } from "./components/Panel/Panel";

enum Step {
  Loading,
  Auth,
  Join,
  Play,
}

const EtChatSketch = () => {
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const [channel, setChannel] = useState<string | null>(localStorage.getItem(LS_KEY_TWITCH_CHANNEL));
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
  } = useTwitchChat({ botId: TWITCH_CHAT_BOT_CLIENT_ID });
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
    const buttonProps: KnobProps[] = [];
    switch (activeStep) {
      case Step.Loading:
        buttonProps[0] = {
          buttonText: "Cancel",
          onClick: logOut,
        };
        break;
      case Step.Auth:
        break;
      case Step.Join:
        buttonProps[0] = {
          buttonText: "Back",
          onClick: logOut,
        };
        buttonProps[1] = {
          buttonText: "Start",
          onClick: () => joinChannel(channel || undefined),
        };
        break;
      case Step.Play:
        buttonProps[0] = {
          buttonText: "Back",
          onClick: leaveChannel!,
        };
        buttonProps[1] = {
          buttonText: "Clear",
          onClick: clearChats,
        };
        break;
    }
    return buttonProps;
  }, [activeStep, channel, clearChats, leaveChannel, joinChannel, logOut]);

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
      <Panel knobProps={knobProps}>
        {activeStep === Step.Loading && (
          <LoadStep authenticated={authenticated} cancelJoin={disconnectChat!} cancelLogin={logOut} />
        )}
        {activeStep === Step.Auth && <AuthStep authenticate={authenticate} />}
        {activeStep === Step.Join && (
          <JoinStep chatError={chatError} username={username!} channel={channel} setChannel={setChannel} />
        )}
        {activeStep === Step.Play && <PlayStep chats={chats} multiplier={10} />}
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
