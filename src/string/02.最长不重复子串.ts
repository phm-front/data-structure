// leetcode 3
function lengthOfLongestSubstring(s: string): number {
  let left = 0, // 左指针
      map = new Map<string, number>(), // 保存元素和其索引的映射关系
      max = 0,
      len = s.length;
  // 右指针向右滑动
  for(let right = 0; right < len; right++) {
    const rightVal = s.charAt(right)
    // 查看map是否存在重复的值
    if(map.has(rightVal) && map.get(rightVal)! >= left) {
      // 更新left的值
      left = map.get(rightVal)! + 1
    }
    // 设置map键值
    map.set(rightVal, right);
    // 更新最大值
    max = Math.max(max, right - left + 1)
  }
  return max;
};