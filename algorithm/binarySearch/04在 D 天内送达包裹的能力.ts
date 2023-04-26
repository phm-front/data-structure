function shipWithinDays(weights: number[], days: number): number {
  let left = Math.max(...weights);
  let right = left * weights.length;
  while(left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (getDays(mid, weights) <= days) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return left;
};

function getDays(carring: number, weights: number[]): number {
  let day: number = 0;
  let curCarring = 0;
  for(let i = 0; i < weights.length; i++) {
    curCarring += weights[i]
    if (curCarring > carring) {
      day++
      curCarring = weights[i]
    } else if (curCarring == carring) {
      day++
      curCarring = 0
    }
  }
  if (curCarring) day++
  return day;
}

console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5))
console.log(shipWithinDays([3,2,2,4,1,4], 3))
