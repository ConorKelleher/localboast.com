import React from "react";
import styles from "./styles.module.sass";

interface JoinStepProps {
  chatError: string | null;
  channel: string;
  username: string;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}

const JoinStep = (props: JoinStepProps) => {
  const { chatError, channel, username, setChannel } = props;

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
    </>
  );
};

export default JoinStep;
