import { useCallback } from "react";
import useTwitchChatBotAuth, {
  UseTwitchChatBotAuthOptions,
  DEFAULT_OPTIONS as USE_CHAT_BOT_AUTH_DEFAULT_OPTIONS,
} from "./useTwitchChatBotAuth";
import useTwitchChatBotMessages from "./useTwitchChatBotMessages";

interface UseTwitchChatOptions extends UseTwitchChatBotAuthOptions {}

const DEFAULT_OPTIONS = {
  ...USE_CHAT_BOT_AUTH_DEFAULT_OPTIONS,
};

const useTwitchChat = (options?: UseTwitchChatOptions) => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const { authenticated, oauthToken, username, authenticating, authenticate, unauthenticate, authIFrameRef } =
    useTwitchChatBotAuth(mergedOptions);
  const {
    chats,
    clearChats,
    joinChannel,
    disconnect: disconnectChat,
    leaveChannel,
    chatJoined,
    chatJoining,
    chatError,
  } = useTwitchChatBotMessages({ oauthToken, username });

  return {
    authIFrameRef,
    username,
    authenticate,
    logOut: useCallback(() => {
      unauthenticate();
      disconnectChat && disconnectChat();
    }, [unauthenticate, disconnectChat]),
    authenticated,
    authenticating,
    chats,
    disconnectChat,
    clearChats,
    joinChannel,
    leaveChannel,
    chatJoined,
    chatJoining,
    chatError,
  };
};

export default useTwitchChat;
