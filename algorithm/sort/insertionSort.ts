import { measureSort } from "hy-algokit";
import { testSort } from "../utils/sortTest";

// 插入排序
function insertionSort(arr: number[]): number[] {
  const len = arr.length;
  // 第一个元素当成已排序的元素 从第二个元素开始遍历
  for (let i = 1; i < len; i++) {
    // 记录当前元素
    const newNum = arr[i];
    let j = i - 1;
    // 如果新元素比已排序的元素小 则将已排序的元素后移
    while (j >= 0 && arr[j] > newNum) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = newNum;
  }
  return arr;
}

// 测试
testSort(insertionSort)
measureSort(insertionSort, 10000)
