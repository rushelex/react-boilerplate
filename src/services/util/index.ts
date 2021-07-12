/**
 * Generate a random number between a min and max
 */
export function randomNumber(min = 1, max = 3): number {
  return Number(Math.random() * (max - min) + min);
}
