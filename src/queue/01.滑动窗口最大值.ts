// leetcode 239
function maxSlidingWindow(nums: number[], k: number): number[] {
  // 声明双端队列
  const deque: number[] = [];
  let res: number[] = [],
    len = nums.length
  for (let i = 0; i < len; i++) {
    // 从队尾取出所有小于当前元素的索引
    while (
      deque.length &&
      nums[deque[deque.length - 1]] <= nums[i]
    ) {
      deque.pop();
    }
    // 将当前索引加入到deque
    deque.push(i);
    // 队头索引在边界之外的全部shift
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }
    // 只有窗口大小达到k才存储结果
    if (i + 1 >= k) res.push(nums[deque[0]]);
  }
  return res;
}

console.log(maxSlidingWindow([1,-1], 1))
