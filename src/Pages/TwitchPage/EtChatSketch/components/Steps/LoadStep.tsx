import styles from "./styles.module.sass";

interface LoadStepProps {
  authenticated: boolean;
  cancelLogin: () => void;
  cancelJoin: () => void;
}
const LoadStep = (props: LoadStepProps) => {
  return (
    <button className={styles.authButton} onClick={props.authenticated ? props.cancelJoin : props.cancelLogin}>
      Cancel
    </button>
  );
};

export default LoadStep;
