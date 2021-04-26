export default function getCoefficientOfVariation(standardDeviation, arithmeticMean) {
  return (standardDeviation/arithmeticMean).toFixed(3);
}
