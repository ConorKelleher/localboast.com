import { Button } from "@mantine/core";
import styles from "./styles.module.sass";

interface AuthStepProps {
  authenticate: () => void;
}

const AuthStep = (props: AuthStepProps) => {
  const { authenticate } = props;
  return (
    <Button className={styles.authButton} onClick={authenticate}>
      Authenticate
    </Button>
  );
};

export default AuthStep;
