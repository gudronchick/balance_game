import React, {  useEffect, useRef, useState } from 'react';
import * as s from './StyledApp.js';
import Field from './components/canvases/Field';
import Joystick from './components/canvases/Joystick';
import { finalCircleCreation, randomMaze, renderJoyCircle, renderTheMaze, triangleCreator } from './utilities/canvasDraw.js';
import ModalComponent from './components/Modal/ModalComponent.js';


const App = () => {
  const [isModal, setIsModal] = useState(false);
  const [isStartGame, setIsStartGame] = useState(0);
  const [didGameStart, setDidGameStart] = useState(false);
  const [isResized, setIsResized] = useState(false);
  const [difficultySettings, setDifficultySettings] = useState({difficult: false, value: 2});
  const mazePartsRef = useRef(randomMaze());
  const field = useRef();
  
  const cancelTheModal = () => {setIsModal(false); setDidGameStart(false)};


  useEffect(() => {
    const resizeFunc = (e) => {
      let sizeW = window.innerWidth;
      let sizeH = window.innerHeight;
      let size = sizeW > sizeH ? sizeW : sizeH;
      
      if (size < 950) {
        if (!isResized) setIsResized(true);
        field.current.style.width = field.current.style.height = 250 + size/10  + 'px'
      } else {
        if (isResized) setIsResized(false);
        field.current.style.width = field.current.style.height = 550 + 'px'
      }
    };
    resizeFunc();

    window.addEventListener('resize', resizeFunc);
    
    return () => {
      window.removeEventListener('resize', resizeFunc);
    }
  }, [isResized]);

  useEffect(() => {
    if (isStartGame) {
      mazePartsRef.current = randomMaze();
    }
  }, [isStartGame]);

  const restartTheGame = () => {
    setIsStartGame(prev => ++prev);
    setIsModal(false);
    setDidGameStart(false);
  }

  const changeDifficulty = () => {
    if (difficultySettings.difficult) {
      setDifficultySettings({difficult: false, value: 2})
    } else {
      setDifficultySettings({difficult: true, value: 4})
    }
  }

return ( <>
    <s.CanvasWrapper isResized={isResized}>
      <Field ref={field} />
      <s.JoystickWrap >
        <Joystick fieldRef={field} 
          setIsModal={setIsModal}
          isModal={isModal}
          isStartGame={isStartGame}
          triangleCreator={triangleCreator}
          renderJoyCircle={renderJoyCircle}
          finalCircleCreation={finalCircleCreation}
          difficulty={difficultySettings}
          setDidGameStart={setDidGameStart}
          renderTheMaze={renderTheMaze}
          mazeParts={mazePartsRef}
        />
        {!didGameStart && !isResized && <s.StartText>Click the red circle to start</s.StartText>}
      </s.JoystickWrap>
    </s.CanvasWrapper>
    <s.DifficultyBtn 
      hard={difficultySettings.difficult } 
      onClick={changeDifficulty}
      disabled={didGameStart}
      >
        {difficultySettings.difficult ? 'Make It Easier ✔' : 'Make It Harder🔥'}
    </s.DifficultyBtn>
    {isModal &&
      <ModalComponent 
        cancelTheModal={cancelTheModal} 
        restartTheGame={restartTheGame}  
      />
    }
    </>
  )
}

export default App;
