import React, { useEffect, useRef } from "react";
import * as s from "./StyledCanvases";

const Joystick = (props) => {
  const {
    fieldRef,
    setIsModal,
    isStartGame,
    triangleCreator,
    renderJoyCircle,
    finalCircleCreation,
    renderTheMaze,
    difficulty,
    setDidGameStart,
    mazeParts,
  } = props;

  const joystickRef = useRef(null);

  useEffect(() => {
    let innerFunc, animFunc;
    let moveTheJoy;

    const renderTheGame = () => {
      const { current: joystick } = joystickRef;
      const { current: field } = fieldRef;

      const joyCtx = joystick.getContext("2d");
      const fieldCtx = field.getContext("2d");

      field.width = 550;
      field.height = 550;

      let startDragging = false;
      let savedBallCoords = {
        x: 20,
        y: 20,
      };

      fieldCtx.clearRect(0, 0, field.width, field.height);

      const rotateTheField = ({ moveX: x, moveY: y }) => {
        field.style.transform = `rotateX(${-y * 0.7}deg) rotateY(${
          -x * 0.7
        }deg)`;
      };

      moveTheJoy = (e) => {
        let x, y;
        if (e.targetTouches) {
          x = e.targetTouches[0].pageX;
          y = e.targetTouches[0].pageY;
        } else {
          x = e.pageX;
          y = e.pageY;
        }
        if (!startDragging) return;
        let moveX =
          (x - joystick.parentElement.offsetLeft - startCoords.x) * 0.6;
        let moveY =
          (startCoords.y - (y - joystick.parentElement.offsetTop)) * 0.6;

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
          velocity: difficulty.value,
        });

        rotateTheField({ moveX, moveY });

        const params = {
          x: joystick.width / 2 + moveX,
          y: joystick.height / 2 - moveY,
          radius: 12,
        };

        renderJoyCircle(params, joyCtx, joystick);
      };

      triangleCreator(
        joystick.width,
        joystick.height,
        0,
        -45,
        20,
        -35,
        -20,
        -35,
        joyCtx
      );
      triangleCreator(
        joystick.width,
        joystick.height,
        0,
        45,
        20,
        35,
        -20,
        35,
        joyCtx
      );
      triangleCreator(
        joystick.width,
        joystick.height,
        -45,
        0,
        -35,
        20,
        -35,
        -20,
        joyCtx
      );
      triangleCreator(
        joystick.width,
        joystick.height,
        45,
        0,
        35,
        20,
        35,
        -20,
        joyCtx
      );

      const startCoords = {
        x: joystick.width / 2,
        y: joystick.height / 2,
        radius: 12,
      };

      renderJoyCircle(startCoords, joyCtx, joystick);

      const clickTheJoystick = (e) => {
        let x, y;
        if (e.targetTouches) {
          x = e.targetTouches[0].pageX;
          y = e.targetTouches[0].pageY;
        } else {
          x = e.pageX;
          y = e.pageY;
        }

        setDidGameStart(true);
        const isClicked =
          Math.pow(startCoords.x - (x - joystick.parentElement.offsetLeft), 2) +
            Math.pow(
              startCoords.y - (y - joystick.parentElement.offsetTop),
              2
            ) <
          Math.pow(startCoords.radius, 2);
        if (isClicked) startDragging = true;
      };

      joystick.addEventListener("touchstart", clickTheJoystick);
      joystick.addEventListener("click", clickTheJoystick);

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
          let ifWon = finalCircleCreation(
            {
              x: savedBallCoords.x,
              y: savedBallCoords.y,
            },
            fieldCtx,
            field,
            moveTheJoy,
            setIsModal
          );
          renderTheMaze(
            { x: savedBallCoords.x, y: savedBallCoords.y },
            fieldCtx,
            savedBallCoords,
            mazeParts.current
          );
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
      creatingTheBall({
        radius: 5,
        directionX: 0,
        directionY: 0,
        velocity: 0,
      })();

      document.addEventListener("mousemove", moveTheJoy);
      document.addEventListener("touchmove", moveTheJoy);
    };
    renderTheGame();

    return () => {
      document.removeEventListener("mousemove", moveTheJoy);
      document.removeEventListener("touchmove", moveTheJoy);
      cancelAnimationFrame(animFunc);
    };
  }, [
    fieldRef,
    setIsModal,
    isStartGame,
    triangleCreator,
    renderJoyCircle,
    finalCircleCreation,
    renderTheMaze,
    difficulty,
    setDidGameStart,
    mazeParts,
  ]);

  return <s.Joystick ref={joystickRef} />;
};

export default Joystick;
