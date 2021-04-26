export default function step(max, min, intervals) {
  return ((max - min) / intervals).toFixed(2);
}
