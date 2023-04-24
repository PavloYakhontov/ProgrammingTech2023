import React, { useEffect, useState } from "react";
import '../styles/GamePage.css';

const game_height=770;
const game_height_pipe=753;
const game_wight=1050;
const bird_size=40;
const gravity=5; 
const jump_height=70;
const obstacle_wight=70;
const obstacle_gap=200;
const obstacle_end=450;
/*const obstacle_count=770;*/

function GamePage() { 
  const [position, setPosition] = useState(350);
  const [gameIsStarted, setGameIsStarted]=useState(false);
  const [obstacleHeight, setobstaclHeight]=useState(250);
  const [obstacleLeft, setobstaclLeft]=useState(game_wight-obstacle_wight);
  const [score, setScore]=useState(0);

  const bottomObstacleHeight=game_height_pipe-obstacle_gap - obstacleHeight;

  useEffect (() =>{
    let timeId;
    if (gameIsStarted && position<game_height-bird_size){
      timeId=setInterval(()=>{
        setPosition(position=>position+gravity)
      }, 18)
    }
    return () =>{
      clearInterval(timeId);
    };
  }, [position, gameIsStarted]);

  useEffect(()=>{
    let obstacleId
    if (gameIsStarted && obstacleLeft >=obstacle_end){
      obstacleId=setInterval(() => {
        setobstaclLeft(obstacleLeft =>obstacleLeft-5);  
        if(obstacleLeft >=1500/2-1 && obstacleLeft<=1500/2){
          setScore(score=>score+1)
        }
      }, 18);

      return ()=>{
        clearInterval(obstacleId);
      }
    }
    else{
      setobstaclLeft(game_wight-obstacle_wight);
      setobstaclHeight(game_height/2-Math.random()*200);
    }
  }, [gameIsStarted, obstacleLeft]);

  useEffect (()=>{
    const hasCollidedWithTopObstacle = 
      position >= 0 && position < obstacleHeight;
    const hasCollidedWithBottomObstacle = 
      position <=736 && position >=736 - bottomObstacleHeight;
    if (obstacleLeft >=1500/2-60 && obstacleLeft<=1500/2+30 &&(hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle)){
      setGameIsStarted(false);
      setPosition(350)
      setScore(0);
    }
  },[position, obstacleLeft, obstacleHeight, bottomObstacleHeight])

  const handleCkick = () =>{
    let newBirdPosition=position-jump_height;
    if (!gameIsStarted){
      setGameIsStarted(true);
    }
    if(newBirdPosition<0){
      setPosition(0);
    }
    else{
      setPosition(newBirdPosition);
    }
  };

  return (
    <div className="back" >
          <div className="background"onClick={handleCkick}/>
          <div className="pipetop"
            style={{
              top: 0,
              width: obstacle_wight,
              height: obstacleHeight,
              left: obstacleLeft,
            }}
          />
          <div className="pipe"
            style={{
              top: game_height_pipe-obstacleHeight-bottomObstacleHeight,
              width: obstacle_wight,
              height: bottomObstacleHeight,
              left: obstacleLeft,
            }}
          />
        <div className="bird" 
          style={{
            width: '50px',
            height: '40px', 
            top: position,
          }}
        />
        <div className="score">{score}</div>
    </div>
  );
};

export default GamePage;
