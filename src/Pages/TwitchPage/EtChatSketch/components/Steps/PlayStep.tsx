import styles from "./styles.module.sass";

interface PlayStepProps {
  chats: string[];
  clearChats: () => void;
  leaveChannel: () => void;
  channel: string;
  username: string;
  logOut: () => void;
}

const PlayStep = (props: PlayStepProps) => {
  return (
    <>
      <p>
        Signed in as: <strong>{props.username}</strong>
      </p>
      <p>
        Joined channel: <strong>{props.channel || props.username}</strong>
      </p>
      <ul>
        {props.chats.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <button className={styles.authButton} onClick={props.clearChats}>
        Clear
      </button>
      <button className={styles.authButton} onClick={props.leaveChannel}>
        Leave Channel
      </button>
      <button className={styles.authButton} onClick={props.logOut}>
        Log Out
      </button>
    </>
  );
};

export default PlayStep;
