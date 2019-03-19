export function logarithmApproximation(xValues, yValues) {

  // a * N + b * SumOf_LnX = SumOf_Y
  // a * SumOf_LnY + b * SumOf_SquareOfLnX = SumOf_YmultiplyLnX
  const N = xValues.length;
  const SumOf_LnX = xValues.reduce((result, x) => result + Math.log(x), 0);
  const SumOf_Y = yValues.reduce((total, y) => total + y, 0);
  const SumOf_SquareOfLnX = xValues.reduce((result, x) => result + Math.pow(Math.log(x), 2), 0);
  const SumOf_YmultiplyLnX = sumOf_YmultiplyLnX(xValues, yValues);

  const a = (SumOf_Y * SumOf_SquareOfLnX - SumOf_YmultiplyLnX * SumOf_LnX) / (N * SumOf_SquareOfLnX - Math.pow(SumOf_LnX, 2));
  const b = (N * SumOf_YmultiplyLnX - SumOf_Y * SumOf_LnX) / (N * SumOf_SquareOfLnX - Math.pow(SumOf_LnX, 2));

  return function (xValue) {
    return a + b * Math.log(xValue);
  }
}

function sumOf_YmultiplyLnX(xValues, yValues) {
  let result = 0;
  for (let i = 0; i < xValues.length; i++) {
    result += yValues[i] * Math.log(xValues[i]);
  }
  return result;
}

export function linearApproximation(xValues, yValues) {

  const SX = sumArray(xValues);
  const SXX = multiplyArrays(xValues);
  const SY = sumArray(yValues);
  const SYX = multiplyArrays(xValues, yValues);
  const length = xValues.length;

  // SXX * a + SX * b = SYX
  // SX * a + length * b = SY

  const v = SXX * length - SX * SX;
  if (v === 0) {
    console.log("ALARM")
  }

  const vA = SYX * length - SY * SX;
  const a = vA / v;

  const vB = SXX * SY - SX * SYX;
  const b = vB / v;

  return function (xValue) {
    return a * xValue + b;
  }
}

function sumArray(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i];
  }
  return result;
}

function multiplyArrays(firstArray, secondArray) {
  if (secondArray === undefined) {
    secondArray = firstArray;
  }
  let result = 0;
  for (let i = 0; i < firstArray.length; i++) {
    result += firstArray[i] * secondArray[i];
  }
  return result;
}
