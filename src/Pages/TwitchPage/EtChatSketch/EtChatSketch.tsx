import { useEffect, useMemo, useRef, useState } from "react";
import { useTwitchChat, LS_KEY_TWITCH_CHANNEL } from "localboast";
import styles from "./styles.module.sass";
import { AuthStep, JoinStep, LoadStep, PlayStep } from "./components/Steps";
import { TWITCH_CHAT_BOT_CLIENT_ID } from "constants/twitchConstants";
import Panel from "./components/Panel";

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
      <Panel>
        {activeStep === Step.Loading && (
          <LoadStep authenticated={authenticated} cancelJoin={disconnectChat!} cancelLogin={logOut} />
        )}
        {activeStep === Step.Auth && <AuthStep authenticate={authenticate} />}
        {activeStep === Step.Join && (
          <JoinStep
            chatError={chatError}
            logOut={logOut}
            username={username!}
            channel={channel}
            joinChat={joinChannel}
            setChannel={setChannel}
          />
        )}
        {activeStep === Step.Play && (
          <PlayStep
            chats={chats}
            clearChats={clearChats}
            leaveChannel={leaveChannel!}
            channel={channel!}
            username={username!}
            logOut={logOut}
          />
        )}
      </Panel>
    </div>
  );
};

export default EtChatSketch;
