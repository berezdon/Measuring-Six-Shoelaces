export default function getVariance(arithmeticMean, numArray) {
  let sum = 0;
  for (let i =0; i<numArray.length; i++) {
    sum += Math.pow(numArray[i] - arithmeticMean, 2);
  }
  return (sum/numArray.length).toFixed(2);
}
