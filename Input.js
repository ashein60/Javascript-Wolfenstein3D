let upKey, rightKey, downKey, leftKey; //booleans also for wasd

let playerMoveSpeed = 5;
let playerRotateSpeed = 100;

let mouseX, mouseY;

//KeyEvents
function KeyEvents()
{
  document.addEventListener("keydown",
      function (event) {
        if (event.keyCode == 87 || event.keyCode == 38) // W or Up
        {
          upKey = true;
        }
        if (event.keyCode == 68 || event.keyCode == 39)  // D or Right
        {
          rightKey = true;
        }
        if (event.keyCode == 83 || event.keyCode == 40) // S or Down
        {
          downKey = true;
        }
        if (event.keyCode == 65 || event.keyCode == 37)  // A or Left
        {
          leftKey = true;
        }
      }, false);

      document.addEventListener("keyup",
          function (event) {
            if (event.keyCode == 87 || event.keyCode == 38) // W or Up
            {
              upKey = false;
            }
            if (event.keyCode == 68 || event.keyCode == 39)  // D or Right
            {
              rightKey = false;
            }
            if (event.keyCode == 83 || event.keyCode == 40) // S or Down
            {
              downKey = false;
            }
            if (event.keyCode == 65 || event.keyCode == 37)  // A or Left
            {
              leftKey = false;
            }
          }, false);
}
function keyLoopEvents()
{
  if (upKey)
  {
    playerPosition.x += Math.cos(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;
    playerPosition.y += Math.sin(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;

    if (PlayerHitWall())
    {
      playerPosition.x -= Math.cos(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;
      playerPosition.y -= Math.sin(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;
    }
  }
  if (rightKey)
  {
    playerAngle += playerRotateSpeed * secondsPassed;
    playerRadian = ToRadian(playerRadian);
  }
  if (downKey)
  {
    playerPosition.x -= Math.cos(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;
    playerPosition.y -= Math.sin(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;

    if (PlayerHitWall())
    {
      playerPosition.x += Math.cos(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;
      playerPosition.y += Math.sin(ToRadian(playerAngle)) * playerMoveSpeed * secondsPassed;
    }
  }
  if (leftKey)
  {
    playerAngle -= playerRotateSpeed * secondsPassed;
    playerRadian = ToRadian(playerRadian);
  }
}

//Mouse Events
/*
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
};
*/

function MouseEvents() //Fake Mouse Events
{
  if (document.exitPointerLock === canvas || document.mozExitPointerLock === canvas)
  {
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;

    context.fillStyle = "black";
    context.beginPath();
    context.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
    context.fill();
  }
}


//Misc methods
function PlayerHitWall()
{
  let x = Math.floor(playerPosition.x);
  let y = Math.floor(playerPosition.y);

  if (grid[x][y] == 1)
  {
    return true;
  }
  else
  {
    return false;
  }
}
