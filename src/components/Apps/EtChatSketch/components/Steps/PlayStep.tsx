import { useMemo } from "react";
import { Coords } from "../../EtChatSketch";

interface PlayStepProps {
  lineCoords: Coords[];
}

const PlayStep = (props: PlayStepProps) => {
  const pathD = useMemo(() => {
    let currentCoords: Coords;
    return `${props.lineCoords
      .map((coords, index) => {
        currentCoords = coords;
        return `${index === 0 ? "M" : "L"}${currentCoords[0]} ${currentCoords[1]}`;
      })
      .join("")}`;
  }, [props.lineCoords]);
  const hasDrawnLine = props.lineCoords.length > 1;

  return (
    <svg
      style={{ overflow: "visible", padding: 10 }}
      version="1.1"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {hasDrawnLine ? (
        <path d={pathD} strokeWidth={2} stroke="black" fill="transparent" />
      ) : (
        <circle rx={props.lineCoords[0][0]} ry={props.lineCoords[0][1]} r={5} />
      )}
    </svg>
  );
};

export default PlayStep;
