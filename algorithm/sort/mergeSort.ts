import { measureSort } from "hy-algokit";
import { testSort } from "../utils/sortTest";

// 归并排序
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  // 分解
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  // 合并
  return mergeSortedArr(mergeSort(leftArr), mergeSort(rightArr));
}
// 合并两个有序数组
function mergeSortedArr(a: number[], b: number[]) {
  let i = 0, j = 0;
  // 声明新数组
  const mergeArr: number[] = []
  while(i < a.length && j < b.length) {
    // 将较小的元素放入新数组
    a[i] < b[j] ? mergeArr.push(a[i++]) : mergeArr.push(b[j++]);
  }
  // 处理剩余元素
  if (i < a.length) mergeArr.push(...a.slice(i));
  if (j < b.length) mergeArr.push(...b.slice(j));
  return mergeArr;
}

// 测试
testSort(mergeSort)
measureSort(mergeSort, 100000)
