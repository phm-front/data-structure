function getLeftBound(nums: number[], target: number): number {
  // 左右指针
  let left = 0, right = nums.length - 1;
  // while循环条件：left<=right
  while(left <= right) {
    // 中间位置索引
    const mid = Math.floor((left + right) / 2);
    const num = nums[mid];
    if (target === num) {
      right = mid - 1
    } else if(target > num) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  if (left === nums.length) return -1
  return nums[left] === target ? left : -1;
};

function getRightBound(nums: number[], target: number): number {
  // 左右指针
  let left = 0, right = nums.length - 1;
  // while循环条件：left<=right
  while(left <= right) {
    // 中间位置索引
    const mid = Math.floor((left + right) / 2);
    const num = nums[mid];
    if (target === num) {
      left = mid + 1
    } else if(target > num) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  if (right === -1) return -1
  return nums[right] === target ? right : -1;
};

console.log(getRightBound([1, 3, 5, 5, 5, 10, 20], 5))
