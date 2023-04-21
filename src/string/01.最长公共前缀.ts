// leetcode14
function longestCommonPrefix(strs: string[]): string {
  let commonPrefix = "",
      curI = 0, // 记录当前比较字符索引
      firststr = strs[0],
      len = strs.length;
  for(let val of firststr) {
    // 遍历其余数组项
    for(let i = 1; i < len; i++) {
      if (strs[i][curI] !== val) return commonPrefix;
    }
    curI++
    commonPrefix += val
  }
  return commonPrefix;
};
