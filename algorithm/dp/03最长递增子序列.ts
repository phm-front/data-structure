// 动态规划
// function lengthOfLIS(nums: number[]): number {
//   const n = nums.length;
//   // 初始化状态 记录i为结尾的最长递增子序列长度
//   const dp = new Array(n).fill(1);
//   let max: number = 1;
//   // 状态转移方程
//   for(let i = 1; i < n; i++) {
//     for(let j = 0; j < i; j++) {
//       if (nums[j] < nums[i]) {
//         dp[i] = Math.max(dp[j] + 1, dp[i])
//       }
//     }
//     max = Math.max(dp[i], max)
//   }
//   return max;
// };

// 贪心+二分查找
function lengthOfLIS(nums: number[]) {
  const len = nums.length;
  const tails: number[] = [];
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    // 二分查找
    let left = 0,
      right = tails.length - 1;
    while(left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (num <= tails[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    if (left === tails.length) {
      tails.push(num)
    } else {
      tails[left] = num
    }
  }
  console.log(tails);
  return tails.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
