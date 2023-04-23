function maxValue(grid: number[][]): number {
  let deep = grid.length,
    width = grid[0].length;
  for (let i = 0; i < deep; i++) {
    for (let j = 0; j < width; j++) {
      if (!(i === 0 && j === 0)) {
        if (i === 0) {
          grid[i][j] = grid[i][j] + grid[i][j - 1];
        } else if (j === 0) {
          grid[i][j] = grid[i][j] + grid[i - 1][j];
        } else {
          grid[i][j] = grid[i][j] + Math.max(grid[i][j - 1], grid[i - 1][j]);
        }
      }
    }
  }
  return grid[deep - 1][width - 1];
}

console.log(
  maxValue([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
);
