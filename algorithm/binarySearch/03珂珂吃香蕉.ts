function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // console.log(getTime(mid, piles), left, right, mid)
    if (h === getTime(mid, piles)) {
      right = mid - 1;
    } else if (h > getTime(mid, piles)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
// 速度是speed时 吃完所有苹果需要的时间
function getTime(speed: number, piles: number[]): number {
  let hours: number = 0;
  for (let i = 0; i < piles.length; i++) {
    hours += Math.floor((piles[i] + speed - 1) / speed)
  }
  return hours;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8));
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5));
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6));
