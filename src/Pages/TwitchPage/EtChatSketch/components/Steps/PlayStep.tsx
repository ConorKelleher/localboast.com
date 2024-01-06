import { useMemo } from "react";

interface PlayStepProps {
  chats: string[];
  multiplier: number;
}

type Coords = [number, number];

const getNewCoordinateFromMessage = (currentCoords: Coords, multiplier: number, message: string) => {
  const newCoords: Coords = [...currentCoords];
  const messageDown = message.toLocaleLowerCase();

  if (messageDown.includes("up")) {
    newCoords[1] -= multiplier;
  }
  if (messageDown.includes("down")) {
    newCoords[1] += multiplier;
  }
  if (messageDown.includes("left")) {
    newCoords[0] -= multiplier;
  }
  if (messageDown.includes("right")) {
    newCoords[0] += multiplier;
  }

  return newCoords;
};

const PlayStep = (props: PlayStepProps) => {
  const pathD = useMemo(() => {
    let currentCoords: Coords = [0, 0];
    return `M${currentCoords[0]} ${currentCoords[1]}${props.chats
      .map((message) => {
        currentCoords = getNewCoordinateFromMessage(currentCoords, props.multiplier, message);
        return `L${currentCoords[0]} ${currentCoords[1]}`;
      })
      .join("")}`;
  }, [props.chats, props.multiplier]);
  console.log(pathD);
  return (
    <svg version="1.1" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD} strokeWidth={2} stroke="black" fill="transparent" />
    </svg>
  );
};

export default PlayStep;
