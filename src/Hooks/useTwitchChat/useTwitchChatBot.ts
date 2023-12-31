import { useCallback, useRef, useState } from "react";
import { parseMessage } from "./helpers/MessageHelpers";

const useTwitchChatBot = () => {
  const disconnectRef = useRef<() => void>();
  const partRef = useRef<() => void>();
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectIRC = useCallback(
    (oauthPass: string, channelName: string, accountName: string, onNewChats: (chats: string[]) => void) => {
      console.log("Connecting with args:", oauthPass, channelName, accountName);
      const ws = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

      const channel = `#${channelName}`;
      const account = accountName.toLowerCase();

      setJoined(false);
      setJoining(true);
      setError(null);

      // On socket open, try auth
      ws.onopen = () => {
        ws.send(`PASS oauth:${oauthPass}`);
        ws.send(`NICK ${account}`);
      };

      // On socket close, clean up
      ws.onclose = (closeEvent) => {
        console.log("Connection Closed");
        console.log(`close description: ${closeEvent.reason}`);
        console.log(`close reason code: ${closeEvent.code}`);

        setJoined(false);
        setJoining(false);
        // setError(`Connection closed: ${closeEvent.reason}`)
      };

      // Process the Twitch IRC message.
      ws.onmessage = (ircMessage) => {
        const rawIrcMessage: string = ircMessage.data.trimEnd();
        console.log(`Message received (${new Date().toISOString()}): '${rawIrcMessage}'\n`);

        const messages = rawIrcMessage.split("\r\n"); // The IRC message may contain one or more messages.
        const newChats: string[] = [];
        messages.forEach((message) => {
          const parsedMessage = parseMessage(message);

          if (parsedMessage?.command) {
            switch (parsedMessage.command.command) {
              case "PRIVMSG":
                if (typeof parsedMessage.parameters === "string") {
                  newChats.push(parsedMessage.parameters);
                }
                break;
              case "PING":
                ws.send("PONG " + parsedMessage.parameters);
                break;
              case "001":
                console.log("Bot Logged in, joining");
                // Successfully logged in, so join the channel.
                ws.send(`JOIN ${channel}`);
                break;
              case "JOIN":
                console.log("Bot Joined");
                setJoined(true);
                setJoining(false);
                // Send the initial move message. All other move messages are
                // sent by the timer.
                ws.send(`PRIVMSG ${channel} :LocalBoast bot watching chat`);
                break;
              case "PART":
                setJoined(false);
                console.log("The channel must have banned (/ban) the bot.");
                ws.close();
                break;
              case "NOTICE":
                // If the authentication failed, leave the channel.
                // The server will close the connection.
                if ("Login authentication failed" === parsedMessage.parameters) {
                  setError(parsedMessage.parameters);
                  console.log(`Authentication failed; left ${channel}`);
                  setJoined(false);
                  setJoining(false);
                  ws.send(`PART ${channel}`);
                } else if ("You don’t have permission to perform that action" === parsedMessage.parameters) {
                  setError(parsedMessage.parameters);
                  console.log(`No permission. Check if the access token is still valid. Left ${channel}`);
                  setJoined(false);
                  setJoining(false);
                  ws.send(`PART ${channel}`);
                }
                break;
              default:
              // do nothing
            }
          }
        });
        if (newChats.length) {
          onNewChats(newChats);
        }
      };

      disconnectRef.current = () => {
        if (ws.readyState === 1) {
          setJoined(false);
          setJoining(false);
          ws.close();
        }
      };
      partRef.current = () => {
        setJoined(false);
        setJoining(false);
        ws.send(`PART ${channel}`);
      };
    },
    []
  );

  return {
    connect: connectIRC,
    disconnect: disconnectRef.current,
    part: partRef.current,
    joined,
    joining,
    error,
  };
};

export default useTwitchChatBot;
