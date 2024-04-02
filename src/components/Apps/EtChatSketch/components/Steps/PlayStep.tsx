import { useMemo } from "react";
import { Coordinate } from "../../EtChatSketch";
import { first } from "localboast/utils/arrayHelpers";

interface PlayStepProps {
  lineCoordinates: Coordinate[];
}

const PlayStep = (props: PlayStepProps) => {
  const pathD = useMemo(() => {
    let currentCoords: Coordinate;
    return `${props.lineCoordinates
      .map((coords, index) => {
        currentCoords = coords;
        return `${index === 0 ? "M" : "L"}${currentCoords[0]} ${currentCoords[1]}`;
      })
      .join("")}`;
  }, [props.lineCoordinates]);
  const hasDrawnLine = props.lineCoordinates.length > 1;
  const hasAnyCoords = !!props.lineCoordinates.length;
  const startCoord = first(props.lineCoordinates) || [0, 0];

  return (
    <svg
      style={{ overflow: "visible", padding: 10 }}
      version="1.1"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {hasAnyCoords &&
        (hasDrawnLine ? (
          <path d={pathD} strokeWidth={2} stroke="black" fill="transparent" />
        ) : (
          <circle rx={startCoord[0]} ry={startCoord[1]} r={5} />
        ))}
    </svg>
  );
};

export default PlayStep;
