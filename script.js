const joystick = document.querySelector("#joystick");
const field = document.querySelector("#field");
const modal = document.querySelector(".modal");

const joyCtx = joystick.getContext("2d");
const fieldCtx = field.getContext("2d");
let savedBallCoords = {
  x: 20,
  y: 20,
};
let innerFunc;
let animFunc;

// Moving the field with joystick

let moveTheJoy = (e) => {
  if (!startDragging) return;
  let moveX = (e.pageX - joystick.offsetLeft - startCoords.x) * 0.6;
  let moveY = (startCoords.y - (e.pageY - joystick.offsetTop)) * 0.6;

  if (moveX > 20) {
    moveX = 20;
  }
  if (moveY > 20) {
    moveY = 20;
  }
  if (moveX < -20) {
    moveX = -20;
  }
  if (moveY < -20) {
    moveY = -20;
  }

  creatingTheBall({
    radius: 5,
    directionX: moveX,
    directionY: moveY,
    velocity: 2,
  });

  rotateTheField({ moveX, moveY });

  const params = {
    x: joystick.width / 2 + moveX,
    y: joystick.height / 2 - moveY,
    radius: 12,
  };

  renderJoyCircle(params);
};

const triangleCreator = (w, h, x1, y1, x2, y2, x3, y3) => {
  joyCtx.beginPath();
  joyCtx.moveTo(w / 2 + x1, h / 2 + y1);
  joyCtx.lineTo(w / 2 + x2, h / 2 + y2);
  joyCtx.lineTo(w / 2 + x3, h / 2 + y3);
  joyCtx.fill();
};

triangleCreator(joystick.width, joystick.height, 0, -45, 20, -35, -20, -35);
triangleCreator(joystick.width, joystick.height, 0, 45, 20, 35, -20, 35);
triangleCreator(joystick.width, joystick.height, -45, 0, -35, 20, -35, -20);
triangleCreator(joystick.width, joystick.height, 45, 0, 35, 20, 35, -20);

const renderJoyCircle = ({ radius, x, y }) => {
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

const startCoords = {
  x: joystick.width / 2,
  y: joystick.height / 2,
  radius: 12,
};

renderJoyCircle(startCoords);

let startDragging = false;

joystick.addEventListener("click", (e) => {
  const isClicked =
    Math.pow(startCoords.x - (e.pageX - joystick.offsetLeft), 2) +
      Math.pow(startCoords.y - (e.pageY - joystick.offsetTop), 2) <
    Math.pow(startCoords.radius, 2);
  if (isClicked) startDragging = true;
});

const rotateTheField = ({ moveX: x, moveY: y }) => {
  field.style.transform = `rotateX(${-y * 0.7}deg) rotateY(${-x * 0.7}deg)`;
};

// Maze creation

const intersectionCheck = (mouseX, mouseY, start, end, coord1, coord2) => {
  // Depends on a line vertical or horizontal coord X can be Y

  if (mouseY < end[coord2] + 10 && mouseY > start[coord2] - 10) {
    if (mouseX > start[coord1] - 12 && mouseX < start[coord1]) {
      savedBallCoords[coord1] = start[coord1] - 12;
    }
    if (mouseX < start[coord1] + 12 && mouseX > start[coord1]) {
      savedBallCoords[coord1] = start[coord1] + 12;
    }
  }
};

const renderTheMaze = ({ x, y }) => {
  let mazePartsCoords = [
    {
      start: { x: 50, y: 50 },
      end: { x: field.width / 3, y: 50 },
    },
    {
      start: { x: field.width / 3, y: 0 },
      end: { x: field.width / 3, y: 50 },
    },
    {
      start: { x: 50, y: 50 },
      end: { x: 50, y: 150 },
    },
    {
      start: { x: 50, y: 200 },
      end: { x: 50, y: 300 },
    },
    {
      start: { x: 0, y: 300 },
      end: { x: 50, y: 300 },
    },
    {
      start: { x: 0, y: 400 },
      end: { x: 50, y: 400 },
    },
    {
      start: { x: 50, y: 350 },
      end: { x: 100, y: 350 },
    },
    {
      start: { x: 100, y: 350 },
      end: { x: 100, y: field.height },
    },
    {
      start: { x: field.width / 3 + 50, y: 50 },
      end: { x: field.width / 3 + 50, y: 150 },
    },
    {
      start: { x: field.width / 3, y: 150 },
      end: { x: field.width / 3 + 50, y: 150 },
    },
    {
      start: { x: field.width / 3 - 50, y: 100 },
      end: { x: field.width / 3 + 50, y: 100 },
    },
    {
      start: { x: field.width / 3 - 50, y: 100 },
      end: { x: field.width / 3 - 50, y: 200 },
    },
    {
      start: { x: field.width / 3 - 50, y: 200 },
      end: { x: field.width / 3, y: 200 },
    },
    {
      start: { x: field.width / 3, y: 200 },
      end: { x: field.width / 3, y: 250 },
    },
    {
      start: { x: field.width / 3 - 50, y: 250 },
      end: { x: field.width / 3, y: 250 },
    },
    {
      start: { x: field.width / 3 - 50, y: 250 },
      end: { x: field.width / 3 - 50, y: 300 },
    },
    {
      start: { x: field.width / 3 + 100, y: 0 },
      end: { x: field.width / 3 + 100, y: 100 },
    },
    {
      start: { x: field.width / 3 + 100, y: 100 },
      end: { x: field.width / 3 + 200, y: 100 },
    },
    {
      start: { x: field.width / 3 + 200, y: 50 },
      end: { x: field.width / 3 + 200, y: 250 },
    },
    {
      start: { x: field.width / 3 + 150, y: 50 },
      end: { x: field.width / 3 + 200, y: 50 },
    },
    {
      start: { x: field.width / 3 + 200, y: 150 },
      end: { x: field.width / 3 + 300, y: 150 },
    },
    {
      start: { x: field.width / 3 + 250, y: 100 },
      end: { x: field.width / 3 + 250, y: 150 },
    },
    {
      start: { x: field.width / 3 + 250, y: 150 },
      end: { x: field.width / 3 + 300, y: 150 },
    },
    {
      start: { x: field.width / 3 + 250, y: 100 },
      end: { x: field.width / 3 + 300, y: 100 },
    },
    {
      start: { x: field.width / 3 + 300, y: 50 },
      end: { x: field.width / 3 + 300, y: 100 },
    },
    {
      start: { x: field.width / 3 + 250, y: 50 },
      end: { x: field.width / 3 + 300, y: 50 },
    },
    {
      start: { x: field.width - 100, y: 200 },
      end: { x: field.width, y: 200 },
    },
    {
      start: { x: field.width - 100, y: 200 },
      end: { x: field.width - 100, y: 300 },
    },
    {
      start: { x: field.width - 200, y: 300 },
      end: { x: field.width - 100, y: 300 },
    },
    {
      start: { x: field.width - 200, y: 300 },
      end: { x: field.width - 200, y: 350 },
    },
    {
      start: { x: field.width - 250, y: 350 },
      end: { x: field.width - 200, y: 350 },
    },
    {
      start: { x: field.width - 250, y: 300 },
      end: { x: field.width - 250, y: 350 },
    },
    {
      start: { x: field.width - 300, y: 300 },
      end: { x: field.width - 250, y: 300 },
    },
    {
      start: { x: field.width - 300, y: 300 },
      end: { x: field.width - 300, y: 350 },
    },
    {
      start: { x: field.width - 100, y: field.height - 50 },
      end: { x: field.width, y: field.height - 50 },
    },
    {
      start: { x: field.width - 50, y: field.height - 200 },
      end: { x: field.width - 50, y: field.height - 100 },
    },
    {
      start: { x: field.width - 150, y: field.height - 100 },
      end: { x: field.width - 50, y: field.height - 100 },
    },
    {
      start: { x: field.width - 150, y: field.height - 100 },
      end: { x: field.width - 150, y: field.height },
    },
    {
      start: { x: field.width / 2, y: field.height - 50 },
      end: { x: field.width / 2, y: field.height },
    },
    {
      start: { x: field.width / 2 - 100, y: field.height - 50 },
      end: { x: field.width / 2 + 50, y: field.height - 50 },
    },
    {
      start: { x: field.width / 2 - 100, y: field.height - 200 },
      end: { x: field.width / 2 - 100, y: field.height - 50 },
    },
    {
      start: { x: field.width - 100, y: field.height - 200 },
      end: { x: field.width - 100, y: field.height - 150 },
    },
    {
      start: { x: field.width - 200, y: field.height - 150 },
      end: { x: field.width - 100, y: field.height - 150 },
    },
    {
      start: { x: field.width / 2 + 50, y: field.height - 100 },
      end: { x: field.width / 2 + 50, y: field.height - 50 },
    },
  ];
  mazePartsCoords.forEach(({ start, end }) => {
    if (start.x - end.x) {
      intersectionCheck(y, x, start, end, "y", "x");
    } else {
      intersectionCheck(x, y, start, end, "x", "y");
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

renderTheMaze({ x: null, y: null });

// Creating the Finish Circle

const finalCircleCreation = ({ x, y }) => {
  const finalCircleCoords = {
    x: field.width / 2 + 50,
    y: field.height / 2 - 100,
  };

  const ifWon =
    Math.pow(finalCircleCoords.x - x, 2) +
      Math.pow(finalCircleCoords.y - y, 2) <
    30 ** 2;

  if (ifWon) {
    document.removeEventListener("mousemove", moveTheJoy);
    field.style.transform = "";
    modal.classList.add("animated");
    setTimeout(() => {
      modal.classList.remove("animated");
    }, 2000);
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

// Ball Creation

let creatingTheBall = ({ radius, directionX, directionY, velocity }) => {
  innerFunc = () => {
    savedBallCoords.x += (-directionX / 20) * velocity;
    savedBallCoords.y += (directionY / 20) * velocity;

    if (savedBallCoords.x >= field.width - radius * 2) {
      savedBallCoords.x = field.width - radius * 2;
    }
    if (savedBallCoords.x <= radius * 2) {
      savedBallCoords.x = radius * 2;
    }
    if (savedBallCoords.y >= field.height - radius * 2) {
      savedBallCoords.y = field.height - radius * 2;
    }
    if (savedBallCoords.y <= radius * 2) {
      savedBallCoords.y = radius * 2;
    }

    fieldCtx.clearRect(0, 0, field.width, field.height);
    let ifWon = finalCircleCreation({
      x: savedBallCoords.x,
      y: savedBallCoords.y,
    });
    renderTheMaze({ x: savedBallCoords.x, y: savedBallCoords.y });
    fieldCtx.save();
    fieldCtx.fillStyle = "red";
    fieldCtx.beginPath();
    fieldCtx.arc(
      savedBallCoords.x,
      savedBallCoords.y,
      radius,
      Math.PI * 2,
      0,
      false
    );
    fieldCtx.fill();
    fieldCtx.restore();

    if (!ifWon) {
      animFunc = requestAnimationFrame(innerFunc);
    }
  };

  return innerFunc;
};

animFunc = requestAnimationFrame(
  creatingTheBall({ radius: 5, directionX: 0, directionY: 0, velocity: 0 })
);

document.addEventListener("mousemove", moveTheJoy);
