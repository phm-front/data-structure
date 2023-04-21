// leetcode 5
function longestPalindrome(s: string): string {
  let len = s.length, res = ''
  for(let i = 0; i < len; i++) {
    // 定义双指针
    let left = i - 1;
    let right = i + 1;
    // 检查左侧相同字符（可省略）
    // while(left >= 0 && s[left] === s[i]) {
    //    left--
    // }
    // 检查右侧相同字符
    while(right < len && s[right] === s[i]) {
      right++
      // 右侧字符与当前字符一样的话 右侧字符就不用再进入for循环执行相同的逻辑了 直接++即可
      // 这也是为什么不用检查左侧相同元素
      i++ 
    }
    // 检查两侧字符
    while(left >= 0 && right < len && s[left] === s[right]) {
      left--;
      right++
    }
    // 更新res
    if (right - left - 1 > res.length) {
      res = s.slice(left + 1, right)
    }
  }
  return res;
};
