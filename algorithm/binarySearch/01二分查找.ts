function search(nums: number[], target: number): number {
  // 左右指针
  let left = 0, right = nums.length - 1;
  // while循环条件：left<=right
  while(left <= right) {
    // 中间位置索引
    const mid = Math.floor((left + right) / 2);
    const num = nums[mid];
    if (target === num) {
      return mid
    } else if(target > num) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1;
};
