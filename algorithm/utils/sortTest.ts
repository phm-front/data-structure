type sortAlgo = (arr: number[]) => number[];
// 判断数组是否升序
function isSorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true
}
// 测试排序算法
export function testSort(sortAlgo: sortAlgo, n: number = 10) {
  // 随机生成一个长度为n的数组
  const arr = Array.from({ length: n }, () =>
    Math.floor(Math.random() * n * 10)
  );
  console.log('排序前数组：', arr)
  // 调用排序算法
  const sortedArr = sortAlgo(arr);
  console.log('排序后数组：', sortedArr)
  // 判断排序后数组是否是升序的
  console.log('排序后数组是否是升序的：', isSorted(sortedArr))
}
