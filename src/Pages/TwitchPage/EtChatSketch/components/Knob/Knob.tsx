import { cx } from "localboast";
import KnobImage from "../assets/Wheel.png";
import styles from "./styles.module.sass";

interface KnobProps {
  side: "left" | "right";
}

const Knob = (props: KnobProps) => {
  return <img className={cx(styles.knob, styles[`knob_${props.side}`])} src={KnobImage} role="presentation" />;
};

export default Knob;
