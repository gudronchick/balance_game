import { mazePartsCoords } from "../data";

export const triangleCreator = (w, h, x1, y1, x2, y2, x3, y3, context) => {
  context.fillStyle = "black";
  context.beginPath();
  context.moveTo(w / 2 + x1, h / 2 + y1);
  context.lineTo(w / 2 + x2, h / 2 + y2);
  context.lineTo(w / 2 + x3, h / 2 + y3);
  context.fill();
};

export const renderJoyCircle = ({ radius, x, y }, joyCtx, joystick) => {
  joyCtx.clearRect(117.5, 42.5, 65, 65);
  joyCtx.beginPath();
  joyCtx.fillStyle = "black";
  joyCtx.arc(joystick.width / 2, joystick.height / 2, 30, 0, Math.PI * 2);
  joyCtx.fill();
  joyCtx.beginPath();
  joyCtx.fillStyle = "red";
  joyCtx.arc(x, y, radius, Math.PI * 2, 0);
  joyCtx.fill();
};

// Creating the Finish Circle

export const finalCircleCreation = (
  { x, y },
  fieldCtx,
  field,
  moveTheJoy,
  setIsModal
) => {
  const finalCircleCoords = {
    x: field.width / 2 + 50,
    y: field.height / 2 - 100,
  };

  const ifWon =
    Math.pow(finalCircleCoords.x - x, 2) +
      Math.pow(finalCircleCoords.y - y, 2) <
    40 ** 2;

  if (ifWon) {
    document.removeEventListener("mousemove", moveTheJoy);
    document.removeEventListener("touchmove", moveTheJoy);
    field.style.transform = "";
    setIsModal(true);
  }

  fieldCtx.save();
  fieldCtx.beginPath();
  fieldCtx.setLineDash([5, 10]);
  fieldCtx.strokeStyle = "white";
  fieldCtx.lineWidth = 2;
  fieldCtx.arc(finalCircleCoords.x, finalCircleCoords.y, 40, Math.PI * 2, 0);
  fieldCtx.stroke();
  fieldCtx.restore();
  return ifWon;
};

export const intersectionCheck = (
  mouseX,
  mouseY,
  start,
  end,
  coord1,
  coord2,
  savedBallCoords
) => {
  // The X coord can be Y depending on whether the line is vertical or horizontal

  if (mouseY < end[coord2] + 10 && mouseY > start[coord2] - 10) {
    if (mouseX > start[coord1] - 10 && mouseX < start[coord1] + 10) {
      if (mouseY > end[coord2] + 8) {
        savedBallCoords[coord2] = end[coord2] + 11;
      }
      if (mouseY < start[coord2] - 8) {
        savedBallCoords[coord2] = start[coord2] - 11;
      }
    }
  }

  if (mouseY < end[coord2] + 8 && mouseY > start[coord2] - 8) {
    if (mouseX > start[coord1] - 12 && mouseX < start[coord1]) {
      savedBallCoords[coord1] = start[coord1] - 12;
      savedBallCoords[coord2] += 0.01;
    }

    if (mouseX < start[coord1] + 12 && mouseX > start[coord1]) {
      savedBallCoords[coord1] = start[coord1] + 12.2;
      savedBallCoords[coord2] += 0.01;
    }
  }
};

// Maze creation

export const randomMaze = () => {
  return mazePartsCoords[Math.floor(Math.random() * mazePartsCoords.length)];
};

export const renderTheMaze = (
  { x, y },
  fieldCtx,
  savedBallCoords,
  mazeParts
) => {
  mazeParts.forEach(({ start, end }) => {
    if (start.x - end.x) {
      intersectionCheck(y, x, start, end, "y", "x", savedBallCoords);
    } else {
      intersectionCheck(x, y, start, end, "x", "y", savedBallCoords);
    }
    fieldCtx.beginPath();
    fieldCtx.strokeStyle = "white";
    fieldCtx.lineWidth = 10;
    fieldCtx.lineCap = "round";
    fieldCtx.moveTo(start.x, start.y);
    fieldCtx.lineTo(end.x, end.y);
    fieldCtx.stroke();
  });
};
