import { useCallback, useEffect, useState } from "react";
import useTwitchChatBot from "./useTwitchChatBot";

interface UseTwitchChatBotMessages {
  oauthToken: string | null;
  username: string | null;
}

const useTwitchChatBotMessages = ({ username, oauthToken }: UseTwitchChatBotMessages) => {
  const [chats, setChats] = useState<string[]>([]);
  const { connect, part, disconnect, joined, joining, error } = useTwitchChatBot();

  const joinChannel = useCallback(
    (channel?: string) => {
      if (username) {
        const channelToJoin = channel || username;
        connect(oauthToken!, channelToJoin, username, (newChats: string[]) => {
          setChats((oldChats) => [...oldChats, ...newChats]);
        });
      }
    },
    [connect, oauthToken, username]
  );

  const clearChats = useCallback(() => {
    setChats([]);
  }, []);

  // Disconnect on unmount
  useEffect(() => {
    return disconnect;
  }, [disconnect]);

  return {
    chats,
    clearChats,
    joinChannel,
    leaveChannel: part,
    chatJoined: joined,
    chatJoining: joining,
    chatError: error,
    disconnect: useCallback(() => {
      disconnect && disconnect();
      clearChats();
    }, [disconnect, clearChats]),
  };
};

export default useTwitchChatBotMessages;
