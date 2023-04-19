import { testSort } from "../utils/sortTest";
import { measureSort } from "hy-algokit";
// 堆排序
function heapSort(arr: number[]): number[] {
  // 原地建堆
  buildHeap(arr);
  // 堆长度
  let heapLen = arr.length;
  while(heapLen > 1) {
    // 交换堆顶元素和最后一个元素
    [arr[0], arr[heapLen - 1]] = [arr[heapLen - 1], arr[0]];
    // 堆长度减一
    heapLen--;
    // 从堆顶开始下沉
    shiftDown(arr, 0, heapLen);
  }
  return arr
}
// 下沉
function shiftDown(arr: number[], index: number, length: number) {
  // 获取左子结点索引
  let leftIndex = index * 2 + 1;
  // 如果左子结点索引大于等于数组长度 则说明没有子结点
  while (leftIndex < length) {
    // 获取右节点索引
    const rightIndex = leftIndex + 1;
    // 获取左右节点中较大元素的索引
    let maxIndex = leftIndex;
    if (rightIndex < length && arr[rightIndex] >= arr[leftIndex]) {
      // 存在右子节点
      maxIndex = rightIndex;
    } else {
      // 不存在右子节点
      maxIndex = leftIndex;
    }
    // 如果当前节点大于等于左右子节点中最大的值 则不需要下沉
    if (arr[index] >= arr[maxIndex]) {
      break;
    }
    // 如果当前节点小于左右子节点中最大的值 则交换位置
    [arr[index], arr[maxIndex]] = [arr[maxIndex], arr[index]];
    index = maxIndex;
    leftIndex = index * 2 + 1;
  }
}
// 原地建堆
function buildHeap(arr: number[]) {
  const len = arr.length;
  // 从最后一个非叶子节点开始下沉
  for(let i = Math.floor((arr.length - 2) / 2); i >= 0; i--){
    shiftDown(arr, i, len);
  }
}

testSort(heapSort);
measureSort(heapSort, 100000)
