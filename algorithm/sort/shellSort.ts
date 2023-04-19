import { testSort } from "../utils/sortTest";
import { measureSort } from "hy-algokit";

// 希尔排序
function shellSort(arr: number[]): number[] {
  let len = arr.length;
  // 增量
  let gap = Math.floor(len / 2);
  while (gap > 0) {
    // 从增量开始遍历 遍历增量集合
    for (let i = gap; i < len; i++) {
      // 增量集合的插入排序操作
      // 记录当前元素
      const newNum = arr[i];
      let j = i - gap;
      // 如果新元素比已排序的元素小 则将已排序的元素后移
      while (j >= 0 && arr[j] > newNum) {
        arr[j + gap] = arr[j];
        j -= gap;
      }
      arr[j + gap] = newNum;
    }
    // 缩小增量
    gap = Math.floor(gap / 2);
  }
  return arr;
}

// 测试
testSort(shellSort, 12);
measureSort(shellSort, 100000);
