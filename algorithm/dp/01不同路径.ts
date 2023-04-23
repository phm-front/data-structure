// leetcode 62
function uniquePaths(m: number, n: number): number {
  if (m === 1 || n === 1) return 1;
  const table: number[][] = Array.from({ length: m }, () =>
    new Array(n).fill(1)
  );
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      table[i][j] = table[i - 1][j] + table[i][j - 1];
    }
  }
  return table[m - 1][n - 1];
}

console.log(uniquePaths(3, 7));
