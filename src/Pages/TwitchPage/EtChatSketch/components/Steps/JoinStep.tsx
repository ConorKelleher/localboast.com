import React from "react";
import styles from "./styles.module.sass";
import { Button } from "@mantine/core";

interface JoinStepProps {
  chatError: string | null;
  channel: string | null;
  username: string;
  joinChat: (channel?: string) => void;
  logOut: () => void;
  setChannel: React.Dispatch<React.SetStateAction<string | null>>;
}

const JoinStep = (props: JoinStepProps) => {
  const { chatError, channel, username, setChannel, joinChat, logOut } = props;

  return (
    <>
      <div className={styles.inputWrapper}>
        <label>Channel to watch (Optional - leave blank to just use your channel)</label>
        <input
          type="text"
          aria-label="channel"
          placeholder={username}
          value={channel || ""}
          onChange={(e) => setChannel(e.target.value)}
        />
      </div>
      <p className={styles.errorText}>{chatError}</p>
      <Button className={styles.authButton} onClick={() => joinChat(channel || undefined)}>
        Join
      </Button>
      <Button className={styles.authButton} onClick={logOut}>
        Log Out
      </Button>
    </>
  );
};

export default JoinStep;