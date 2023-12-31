import styles from "./styles.module.sass";

interface AuthStepProps {
  authenticate: () => void;
}

const AuthStep = (props: AuthStepProps) => {
  const { authenticate } = props;
  return (
    <button className={styles.authButton} onClick={authenticate}>
      Authenticate
    </button>
  );
};

export default AuthStep;
