export function round2DP(input: number) {
  return Number((Math.round(input * 100) / 100).toFixed(2));
}
