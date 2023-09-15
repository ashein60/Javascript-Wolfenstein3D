"use strict";

let grid;
let gridWidth = 20;
let gridHeight = 20;

let playerPosition;
let playerFOV = 60;
let playerAngle = 25;
let playerRadian = ToRadian(playerAngle);

let rayAngleStep = 0.2;

let displayWidth = canvas.width / playerFOV * rayAngleStep;
let displayHeight = 500;
let rayHeightDisplayMultiplier = 30;

let backgroundStepHeight = 2;
let backgroundColorVarience = 1.5;
let rayDistanceColorMultiplier = 10;

function Start()
{
  playerPosition = new Point(9, 8);

  SetupWolfenstein();
  KeyEvents();
}
function Update()
{
  keyLoopEvents();
}
function Paint()
{
  PaintWolfenstein(60);
}

//Setup Wolfenstein
function SetupWolfenstein()
{
  grid = [gridWidth];
  grid [0] =  [1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  grid [1] =  [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [2] =  [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [3] =  [1, 0 ,0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [4] =  [1, 0 ,0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [5] =  [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [6] =  [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [7] =  [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1];
  grid [8] =  [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
  grid [9] =  [1, 0 ,0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
  grid [10] = [1, 0 ,0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
  grid [11] = [1, 0 ,0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [12] = [1, 0 ,0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [13] = [1, 0 ,1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [14] = [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [15] = [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [16] = [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [17] = [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1];
  grid [18] = [1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
  grid [19] = [1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
}
function PaintWolfenstein(scale)
{
  //Background
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < canvas.height / 2 / backgroundStepHeight; i++)
  {
    context.fillStyle = ColorToHex(200 - backgroundColorVarience * i, 200 - backgroundColorVarience * i, 0);
    context.fillRect(0, backgroundStepHeight * i, canvas.width, backgroundStepHeight);
    context.fillRect(0, canvas.height - backgroundStepHeight * i, canvas.width, backgroundStepHeight);
  }

  //ray
  let hitWall;
  let currentRadian;

  let directionX, directionY;
  let x1, y1, x2, y2;
  let distanceX, distanceY; //distanceX or Y to make a triangle with the current angle
  let posX, posY; //current viable triangle
  let hitX, hitY; //test if hit in these coordinates
  let hitDistance;
  let hitDisplayHeight;

  let count = 0;

  for (let currentAngle = playerAngle - playerFOV / 2; currentAngle <= playerAngle + playerFOV / 2; currentAngle += rayAngleStep)
  {
    currentRadian = ToRadian(currentAngle);
    hitWall = false;

    directionX = Math.cos(currentRadian);
    directionY = Math.sin(currentRadian);

    if (directionX < 0)
    {
      directionX = -1;
    }
    else if (directionX > 0)
    {
      directionX = 1;
    }
    else
    {
      directionX = 0;
    }

    if (directionY < 0)
    {
      directionY = -1;
    }
    else if (directionY > 0)
    {
      directionY = 1;
    }
    else
    {
      directionY = 0;
    }

    x1 = playerPosition.x;
    y1 = playerPosition.y;

    do
    {
      if (directionX >= 0)
      {
        x2 = Math.floor(x1 + directionX);
      }
      else
      {
        x2 = Math.ceil(x1 + directionX);
      }
      if (directionY >= 0)
      {
        y2 = Math.floor(y1 + directionY);
      }
      else
      {
        y2 = Math.ceil(y1 + directionY);
      }

      distanceX = Math.abs((x2 - x1) / Math.cos(currentRadian));
      distanceY = Math.abs((y2 - y1) / Math.sin(currentRadian));

      if (distanceX != 0 && (distanceX <= distanceY || distanceY == 0))
      {
        posX = x2;

        if (currentRadian == 0)
        {
          posY = 0;
        }
        else
        {
          posY = Math.tan(currentRadian) * (x2 - x1) + y1;
        }
      }
      else
      {
        posY = y2;

        if (currentRadian == 0)
        {
          posX = 0;
        }
        else
        {
          posX = (y2 - y1) / Math.tan(currentRadian) + x1;
        }
      }

      hitX = Math.floor(posX);
      hitY = Math.floor(posY);

      if (directionX < 0 && posX % 1 == 0)
      {
        hitX--;
      }
      if (directionY < 0 && posY % 1 == 0)
      {
        hitY--;
      }

      //Hit
      if (grid[hitX][hitY] == 1)
      {
        if (posX % 1 == 0)
        {
          hitDistance = (posX - playerPosition.x) / Math.cos(currentRadian);
        }
        else
        {
          hitDistance = (posY - playerPosition.y) / Math.sin(currentRadian);
        }

        //Fix fisheyes
        let nonFishDistance = Math.cos(ToRadian(currentAngle - playerAngle)) * hitDistance;

        let wallColorModifier = nonFishDistance * rayDistanceColorMultiplier;
        let wallColor = 200 - wallColorModifier;

        if (wallColor < 0)
        {
          wallColor = 0;
        }
        context.fillStyle = ColorToHex(wallColor, wallColor, wallColor);

        hitDisplayHeight = displayHeight - nonFishDistance * rayHeightDisplayMultiplier;

        if (hitDisplayHeight > 0)
        {
          context.fillRect(count * displayWidth, canvas.height / 2 - hitDisplayHeight / 2, displayWidth, hitDisplayHeight);
        }

        hitWall = true;
        count++;
      }

      if (distanceX != 0 && (distanceX <= distanceY || distanceY == 0))
      {
        x1 = x2;
        y1 = posY;
      }
      else
      {
        y1 = y2;
        x1 = posX;
      }
    } while (!hitWall);
  }
}

//Misc methods
function ToRadian(angle)
{
  return angle * Math.PI / 180;
}
function fixAngle(angle)
{
  while (angle > 360)
  {
    angle -= 360;
  }
  while (angle < 0)
  {
    angle += 360;
  }

  return angle;
}

//Misc Classes
class Point
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}
