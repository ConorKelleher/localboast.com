import React from "react";
import cx from "localboast/utils/cx";

import LocalBoastWhiteWideLogo from "assets/logo_white_wide.svg?react";

import styles from "./styles.module.sass";
import TRSegmentImage from "../assets/TR.png";
import TMSegmentImage from "../assets/TM.png";
import MRSegmentImage from "../assets/MR.png";
import BMSegmentImage from "../assets/BM.png";
import BRSegmentImage from "../assets/BR.png";
import EtChatSketchTextImage from "../assets/EtChatSketchText.png";
import Knob from "../Knob";
import { KnobProps } from "../Knob/Knob";
import { NumberInput } from "@mantine/core";
import { Link } from "react-router-dom";
import Paths from "Paths";

export type PanelKnobProps = Omit<KnobProps, "side">;

interface PanelProps extends React.PropsWithChildren {
  knobProps?: PanelKnobProps[];
  multiplier: number;
  setMultiplier: React.Dispatch<React.SetStateAction<number>>;
}

const Panel = (props: PanelProps) => {
  const { knobProps = [] } = props;
  return (
    <div className={styles.panel_grid}>
      <img className={cx(styles.segment, styles.segment_inverse)} src={TRSegmentImage} role="presentation" />
      <div className={styles.top_middle_wrapper}>
        <img className={styles.segment} src={TMSegmentImage} role="presentation" />
        <img className={styles.etchatsketch_logo} src={EtChatSketchTextImage} role="presentation" />
      </div>
      <img className={styles.segment} src={TRSegmentImage} role="presentation" />
      <img className={cx(styles.segment, styles.segment_inverse)} src={MRSegmentImage} role="presentation" />
      <div className={styles.child_container}>{props.children}</div>
      <div className={styles.middle_right_wrapper}>
        <img className={styles.segment} src={MRSegmentImage} role="presentation" />
        <NumberInput
          className={styles.multiplier_input}
          label="Multiplier"
          value={props.multiplier}
          onChange={(newValue) => props.setMultiplier(parseFloat(newValue as "string"))}
          step={props.multiplier <= 1 ? 0.1 : 1}
          min={0.1}
          max={100}
        />
      </div>
      <div className={styles.bottom_corner_wrapper}>
        <img className={cx(styles.segment, styles.segment_inverse)} src={BRSegmentImage} role="presentation" />
        <Knob side="left" {...knobProps[0]} />
      </div>
      <div className={styles.bottom_middle_wrapper}>
        <img className={styles.segment} src={BMSegmentImage} role="presentation" />
        <Link to={Paths.HomePage}>
          <LocalBoastWhiteWideLogo className={styles.localboast_watermark} />
        </Link>
      </div>
      <div className={styles.bottom_corner_wrapper}>
        <img className={styles.segment} src={BRSegmentImage} role="presentation" />
        <Knob side="right" {...knobProps[1]} />
      </div>
    </div>
  );
};

export default Panel;
