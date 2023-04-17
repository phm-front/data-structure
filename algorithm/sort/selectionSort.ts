import { measureSort } from "hy-algokit";
import { testSort } from "../utils/sortTest";

// 选择排序
function selectionSort(arr: number[]) {
  const len = arr.length;
  // 循环次数为len - 1 因为当n-1个元素都在正确的位置时 最后一个元素就也在正确位置了
  for (let i = 0; i < len - 1; i++) {
    // 记录最小值的索引
    let minIndex = i;
    // 从i+1开始遍历
    for (let j = i + 1; j < len; j++) {
      // 如果前一个数比后一个数大 则交换位置
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 如果最小值的索引不是i 则交换位置
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

// 测试
testSort(selectionSort)
measureSort(selectionSort, 10000)
