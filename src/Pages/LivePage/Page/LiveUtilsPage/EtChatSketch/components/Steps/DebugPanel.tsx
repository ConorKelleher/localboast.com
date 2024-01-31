import { Button } from "@mantine/core";
import styles from "./styles.module.sass";

interface DebugPanelProps {
  chats: string[];
  clearChats: () => void;
  leaveChannel: () => void;
  channel: string;
  username: string;
  logOut: () => void;
}

const DebugPanel = (props: DebugPanelProps) => {
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
      <Button className={styles.authButton} onClick={props.clearChats}>
        Clear
      </Button>
      <Button className={styles.authButton} onClick={props.leaveChannel}>
        Leave Channel
      </Button>
      <Button className={styles.authButton} onClick={props.logOut}>
        Log Out
      </Button>
    </>
  );
};

export default DebugPanel;
