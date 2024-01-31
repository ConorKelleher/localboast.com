import { UnstyledButton } from "@mantine/core";
// import { Group, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { PropsWithChildren } from "react";
// import LocalButtonSVG from "./LocalButton.svg?react";
import styles from "./styles.module.sass";
// import { LB_COLORS } from "theme";

// const REFERENCE_WIDTH = 470;
// const REFERENCE_HEIGHT = 465;

// const SMALL_CURVE_RADIUS = 10;
// const BIG_CURVE_RADIUS = 20;
// const SMALL_CURVE_DIAMETER = SMALL_CURVE_RADIUS * 2;
// const LEFT_EDGE = 30;
// const BOTTOM_EDGE = 20;
// const BORDER = 3;
// const EDGE_RATIO = LEFT_EDGE / BOTTOM_EDGE;
// const X_RADIUS = SMALL_CURVE_DIAMETER * EDGE_RATIO;
// const Y_RADIUS = SMALL_CURVE_DIAMETER / EDGE_RATIO;
// const X_DIAMETER = X_RADIUS * 2;
// const Y_DIAMETER = Y_RADIUS * 2;

// type Dimensions = {
//   height: number;
//   width: number;
// };
// const getLocalButtonBackgroundPath = ({ height, width }: Dimensions) => {
//   // M top left corner (right side of curve)
//   const currentPoint = { x: 0, y: 0 };
//   let path = `M${(currentPoint.x = LEFT_EDGE + SMALL_CURVE_RADIUS)} ${(currentPoint.y = 0)}`;
//   // C top left (upper)
//   path += `C ${(currentPoint.x -= X_DIAMETER / 3)} ${currentPoint.y}`;
//   path += ` ${currentPoint.x} ${(currentPoint.y += SMALL_CURVE_RADIUS / 2)}`;
//   path += ` ${(currentPoint.x -= SMALL_CURVE_RADIUS / 3)} ${(currentPoint.y += SMALL_CURVE_RADIUS / 2)}`;
//   // L diagonal down left
//   path += `L ${(currentPoint.x -= SMALL_CURVE_RADIUS)} ${(currentPoint.y = BOTTOM_EDGE)}`;
//   // C top left (lower)
//   path += `C ${(currentPoint.x = X_RADIUS / 3)} ${(currentPoint.y += SMALL_CURVE_RADIUS / 2)}`;
//   path += ` ${(currentPoint.x = 0)} ${(currentPoint.y += SMALL_CURVE_RADIUS / 2)}`;
//   path += ` ${(currentPoint.x = 0)} ${(currentPoint.y += SMALL_CURVE_RADIUS / 2)}`;
//   // L straight down
//   path += `L ${currentPoint.x} ${(currentPoint.y = height - BIG_CURVE_RADIUS)}`;
//   // Q bottom left
//   path += `Q ${currentPoint.x} ${(currentPoint.y = height)}`;
//   path += ` ${(currentPoint.x += BIG_CURVE_RADIUS)} ${currentPoint.y}`;
//   // L straight across
//   path += `L ${(currentPoint.x = width - LEFT_EDGE - SMALL_CURVE_RADIUS)} ${currentPoint.y}`;
//   // C bottom right (lower)
//   path += `C ${(currentPoint.x += SMALL_CURVE_RADIUS / 3)} ${currentPoint.y}`;
//   path += ` ${(currentPoint.x += SMALL_CURVE_RADIUS / 3)} ${(currentPoint.y -= SMALL_CURVE_RADIUS / 2)}`;
//   path += ` ${(currentPoint.x += SMALL_CURVE_RADIUS / 3)} ${(currentPoint.y -= SMALL_CURVE_RADIUS / 2)}`;
//   // L up right
//   path += `L ${(currentPoint.x += LEFT_EDGE - SMALL_CURVE_RADIUS)} ${(currentPoint.y -= BOTTOM_EDGE)}`;
//   // C bottom right (upper)
//   path += `C ${(currentPoint.x += SMALL_CURVE_RADIUS / 3)} ${(currentPoint.y -= SMALL_CURVE_RADIUS / 3)}`;
//   path += ` ${(currentPoint.x += SMALL_CURVE_RADIUS / 3)} ${(currentPoint.y -= SMALL_CURVE_RADIUS / 3)}`;
//   path += ` ${currentPoint.x} ${(currentPoint.y -= SMALL_CURVE_RADIUS / 3)}`;
//   // L straight up
//   path += `L ${currentPoint.x} ${(currentPoint.y = BIG_CURVE_RADIUS)}`;
//   // Q top right
//   path += `Q ${currentPoint.x} ${(currentPoint.y = 0)}`;
//   path += ` ${(currentPoint.x = width - BIG_CURVE_RADIUS)} ${currentPoint.y}`;

//   path += "Z";
//   return path;
// };

// const LocalButtonSVG = ({ height, width }: Dimensions) => {
//   const { colorScheme } = useMantineColorScheme();
//   const widthRatio = width / REFERENCE_WIDTH;
//   const heightRatio = height / REFERENCE_HEIGHT;
//   const isDarkMode = colorScheme === "dark";
//   const buttonBackgroundColor = isDarkMode ? LB_COLORS.boastfulBlue : LB_COLORS.boastfulYellow;
//   const buttonAccentColor = isDarkMode ? LB_COLORS.boastfulYellow : LB_COLORS.boastfulBlue;

//   return (
//     <svg preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
//       <defs />
//       <g id="logoKeyWrapper">
//         <path id="logoKeyOutline" d={getLocalButtonBackgroundPath({ height, width })} fill={buttonAccentColor} />
//         {/* <path
//           d="M164.545 87.4872L441.541 87.4872C450.625 87.4872 458.063 94.668 458.063 103.751L458.063 388.75C458.063 397.833 450.625 405.272 441.541 405.271L164.545 405.271C155.462 405.271 148.283 397.833 148.282 388.75L148.282 103.751C148.282 94.6675 155.461 87.4868 164.545 87.4872Z"
//           fill={buttonBackgroundColor}
//         /> */}
//       </g>
//     </svg>
//   );
// };
// const OldLocalButtonSVG = ({ height, width }: React.SVGAttributes<SVGSVGElement>) => {
//   const { colorScheme } = useMantineColorScheme();
//   const isDarkMode = colorScheme === "dark";
//   const buttonBackgroundColor = isDarkMode ? LB_COLORS.boastfulBlue : LB_COLORS.boastfulYellow;
//   const buttonAccentColor = isDarkMode ? LB_COLORS.boastfulYellow : LB_COLORS.boastfulBlue;

//   return (
//     <svg preserveAspectRatio="none" viewBox="70 75 400 390" width={width} height={height}>
//       <defs />
//       <g id="logoKeyWrapper">
//         <path
//           d="M142.993 94.2853C142.993 89.3746 146.974 85.3937 151.885 85.3937L450.259 88.0161C455.169 88.0161 459.15 91.997 459.15 96.9077L459.818 397.889C459.818 402.8 455.837 406.781 450.926 406.781L139.964 408.439C135.053 408.439 131.072 404.458 131.072 399.547L142.993 94.2853Z"
//           fill={buttonBackgroundColor}
//         />
//         <path
//           id="logoKeyOutline"
//           d="M156.284 75.8704C152.06 75.8704 149.144 77.1463 144.151 80.2589C143.983 80.3639 143.2 80.9265 142.602 81.2915L107.1951 111.291C105.6337 112.594 103.3278 114.484 101.2576 117.229C97.6725 121.982 95.5785 127.168 95.5783 132.46C95.5783 136.151 95.5783 414.026 95.5783 417.717C95.5783 433.664 108.543 446.63 124.4912 446.63L409.49 446.63C413.665 446.63 422.684 444.205 426.012 441.725C442.188 429.665 454.083 415.685 461.161 408.627C466.348 403.44 469.422 396.211 469.422 388.75L469.422 103.493C469.422 88.1777 456.928 75.8706 441.541 75.8704C432.626 75.8704 165.199 75.8704 156.284 75.8704ZM164.545 87.4872L441.541 87.4872C450.625 87.4872 458.063 94.668 458.063 103.751L458.063 388.75C458.063 397.833 450.625 405.272 441.541 405.271L164.545 405.271C155.462 405.271 148.283 397.833 148.282 388.75L148.282 103.751C148.282 94.6675 155.461 87.4868 164.545 87.4872Z"
//           fill={buttonAccentColor}
//         />
//       </g>
//     </svg>
//   );
// };

const LocalButton = (props: PropsWithChildren) => {
  return (
    <UnstyledButton className={styles.localButton}>
      {/* <Group>
        <LocalButtonSVG height={300} width={300} />
        <OldLocalButtonSVG height={300} width={300} />
      </Group> */}
      <div className={styles.contentsWrapper}>{props.children}</div>
    </UnstyledButton>
  );
};

export default LocalButton;
