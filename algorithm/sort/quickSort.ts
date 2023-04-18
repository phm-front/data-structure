import { measureSort } from "hy-algokit";
import { testSort } from "../utils/sortTest";

// 快速排序
function quickSort(arr: number[]): number[] {
  // 定义递归函数
  function partition(left: number, right: number): void {
    if (left >= right) return;
    // 基准元素
    const pivot = arr[right];
    // 双指针
    let i = left;
    let j = right - 1;
    while (i <= j) {
      // 找比基准元素大的元素 这里不用处理指针边界 因为i为right时等于pivot
      while(arr[i] < pivot){
        i++
      }
      // 找比基准元素小的元素
      while(j >= left && arr[j] > pivot){
        j--
      }
      // 交换位置
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      };
    }
    // 将基准元素放到i的位置
    [arr[i], arr[right]] = [arr[right], arr[i]];
    // 递归基准元素左右两边的元素
    partition(left, i - 1);
    partition(i + 1, right);
  }
  partition(0, arr.length - 1);
  return arr;
}

// 测试
testSort(quickSort)
measureSort(quickSort, 100000)
