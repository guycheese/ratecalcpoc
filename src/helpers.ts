export function round2DP(input: number) {
  return parseFloat((Math.round(input * 100) / 100).toFixed(2));
}

export function roundUp2DP(input: number) {
  return Math.ceil(input * 100) / 100;
}
