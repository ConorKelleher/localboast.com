import { Button } from "@mantine/core";
import styles from "./styles.module.sass";

interface LoadStepProps {
  authenticated: boolean;
  cancelLogin: () => void;
  cancelJoin: () => void;
}
const LoadStep = (props: LoadStepProps) => {
  return (
    <Button className={styles.authButton} onClick={props.authenticated ? props.cancelJoin : props.cancelLogin}>
      Cancel
    </Button>
  );
};

export default LoadStep;
