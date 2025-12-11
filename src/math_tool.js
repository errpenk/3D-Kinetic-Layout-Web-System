export const lerp = (start, end, t) => start * (1 - t) + end * t;
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
export const mapRange = (value, inMin, inMax, outMin, outMax) => 
  (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
