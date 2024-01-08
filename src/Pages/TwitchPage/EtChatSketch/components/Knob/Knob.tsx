import { cx } from "localboast";
import KnobInnerImage from "../assets/WheelInner.png";
import KnobOuterImage from "../assets/WheelOuter.png";
import styles from "./styles.module.sass";
import { Button } from "@mantine/core";

export interface KnobProps {
  side: "left" | "right";
  onClick?: () => void;
  buttonText?: string;
  rotation?: number;
}

const Knob = (props: KnobProps) => {
  const { side, onClick, buttonText } = props;
  return (
    <div className={cx(styles.knob, styles[`knob_${side}`])}>
      <img
        style={{ transform: props.rotation ? `rotate(${props.rotation}deg)` : undefined }}
        src={KnobOuterImage}
        role="presentation"
      />
      <img src={KnobInnerImage} role="presentation" />
      {buttonText && (
        <Button variant="subtle" color="dark.3" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Knob;
