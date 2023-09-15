"use strict";

function ColorToHex(red, green, blue)
{
  return "#" + SingleColorToHex(red) + SingleColorToHex(green) + SingleColorToHex(blue);
}
function SingleColorToHex(color)
{
  let num1 = Math.floor(color / 16);
  let num2 = Math.floor((color / 16 - num1) * 16);

  return ConvertToHexValue(num1) + ConvertToHexValue(num2) + "";
}
function ConvertToHexValue(number)
{
  if (number < 10)
  {
    return number + "";
  }
  else if (number == 10)
  {
    return "a";
  }
  else if (number == 11)
  {
    return "b";
  }
  else if (number == 12)
  {
    return "c";
  }
  else if (number == 13)
  {
    return "d";
  }
  else if (number == 14)
  {
    return "e";
  }
  else //if (number == 15)
  {
    return "f";
  }
}
