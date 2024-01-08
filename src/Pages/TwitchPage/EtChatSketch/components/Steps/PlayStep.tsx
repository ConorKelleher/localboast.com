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

  console.log(pathD);
  return (
    <svg version="1.1" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD} strokeWidth={2} stroke="black" fill="transparent" />
    </svg>
  );
};

export default PlayStep;
