// 斐波那契数列
function fib(n: number, memo: number[] = []): number {
  if (n <= 1) {
    return n;
  }
  if (memo[n]) {
    return memo[n];
  } else {
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  }
  return memo[n]
}

// 动态规划
function fibDP(n: number): number {
  if (n <= 1) return n;
  // 定义状态和初始化状态(步骤一和步骤三)
  let prev = 0;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    // 状态转移方程(步骤二)
    cur = prev + cur;
    prev = cur - prev;
  }
  // 返回最终结果(步骤四)
  return cur;
}
