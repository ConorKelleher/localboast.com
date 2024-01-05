import React from "react";
import { cx } from "localboast";

import styles from "./styles.module.sass";
import TRSegmentImage from "../assets/TR.png";
import TMSegmentImage from "../assets/TM.png";
import MRSegmentImage from "../assets/MR.png";
import BMSegmentImage from "../assets/BM.png";
import BRSegmentImage from "../assets/BR.png";
import Knob from "../Knob";

const Panel = (props: React.PropsWithChildren) => {
  return (
    <div className={styles.panel_grid}>
      <img className={cx(styles.segment, styles.segment_inverse)} src={TRSegmentImage} role="presentation" />
      <img className={styles.segment} src={TMSegmentImage} role="presentation" />
      <img className={styles.segment} src={TRSegmentImage} role="presentation" />
      <img className={cx(styles.segment, styles.segment_inverse)} src={MRSegmentImage} role="presentation" />
      <div className={styles.child_container}>{props.children}</div>
      <img className={styles.segment} src={MRSegmentImage} role="presentation" />
      <div className={styles.bottom_corner_wrapper}>
        <img className={cx(styles.segment, styles.segment_inverse)} src={BRSegmentImage} role="presentation" />
        <Knob side="left" />
      </div>
      <img className={styles.segment} src={BMSegmentImage} role="presentation" />
      <div className={styles.bottom_corner_wrapper}>
        <img className={styles.segment} src={BRSegmentImage} role="presentation" />
        <Knob side="right" />
      </div>
    </div>
  );
};

export default Panel;
