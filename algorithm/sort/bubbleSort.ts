import { measureSort } from "hy-algokit";
import { testSort } from "../utils/sortTest";

// 冒泡排序
function bubbleSort(arr: number[]) {
  const len = arr.length;
  // 循环次数为len - 1 - i 因为是两个值进行比较，所以最后一个值不需要进行比较
  for (let i = 0; i < len - 1; i++) {
    // 减i是因为前i次循环已经将最大的数放到了最后 不需要进行比较
    let isSwap = false;
    for (let j = 0; j < len - 1 - i; j++) {
      // 如果前一个数比后一个数大 则交换位置
      if (arr[j] > arr[j + 1]) {
        // 解构赋值交换位置
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isSwap = true;
      }
    }
    if (!isSwap) break;
  }
  return arr;
}

// 测试
testSort(bubbleSort)
measureSort(bubbleSort, 10000)
