class MaxHeap<T> {
  // 属性
  private data: T[] = [];
  private length: number = 0;
  constructor(initArr: T[] = []) {
    initArr.length && this.buildHeap(initArr);
  }
  // 交换i和j位置的元素
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
  // 上浮
  private shiftUp(index: number) {
    while (index > 0) {
      // 获取父节点的索引
      const parentIndex = Math.floor((index - 1) / 2);
      // 如果父节点的值大于等于当前节点的值 则不需要上浮
      if (this.data[parentIndex] >= this.data[index]) {
        break;
      }
      // 如果父节点的值小于当前节点的值 则交换位置
      this.swap(parentIndex, index);
      // 更新index
      index = parentIndex;
    }
  }
  // 插入元素
  insert(value: T) {
    // 将元素插入到数组的末尾
    this.data.push(value);
    this.length++;
    // 上浮
    this.shiftUp(this.length - 1);
  }
  // 下沉
  shiftDown(index: number) {
    // 获取左子结点索引
    let leftIndex = index * 2 + 1;
    // 如果左子结点索引大于等于数组长度 则说明没有子结点
    while (leftIndex < this.length) {
      // 获取右节点索引
      const rightIndex = leftIndex + 1;
      // 获取左右节点中较大元素的索引
      let maxIndex = leftIndex;
      if (rightIndex < this.length && this.data[rightIndex] >= this.data[leftIndex]) {
        // 存在右子节点
        maxIndex = rightIndex;
      } else {
        // 不存在右子节点
        maxIndex = leftIndex;
      }
      // 如果当前节点大于等于左右子节点中最大的值 则不需要下沉
      if (this.data[index] >= this.data[maxIndex]) {
        break;
      }
      // 如果当前节点小于左右子节点中最大的值 则交换位置
      this.swap(index, maxIndex);
      index = maxIndex;
      leftIndex = index * 2 + 1;
    }
  }
  // 取出堆顶元素
  extractMax() {
    if (!this.length) return null;
    const max = this.data[0];
    const tail = this.data.pop()!;
    this.length--;
    if (this.length >= 1) {
      // 如果堆中还有元素 则将最后一个元素放到堆顶 然后下沉
      this.data[0] = tail;
      this.shiftDown(0);
    }
    return max;
  }
  // 原地建堆
  buildHeap(arr: T[]) {
    this.data = arr;
    this.length = arr.length;
    // 从最后一个非叶子节点开始下沉 即最后一个元素的父节点
    for (let i = Math.floor((this.length - 2) / 2); i >= 0; i--) {
      this.shiftDown(i);
    }
  }
  // 获取堆顶元素
  getMax() {
    return this.data[0];
  }
  // 获取堆中元素的个数
  size() {
    return this.length;
  }
  // 判断堆是否为空
  isEmpty() {
    return this.length === 0;
  }
  // 打印
  print() {
    console.log(this.data);
  }
}

class MinHeap<T> {
  // 属性
  private data: T[] = [];
  private length: number = 0;
  constructor(initArr: T[] = []) {
    initArr.length && this.buildHeap(initArr);
  }
  // 交换i和j位置的元素
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
  // 上浮
  private shiftUp(index: number) {
    while (index > 0) {
      // 获取父节点的索引
      const parentIndex = Math.floor((index - 1) / 2);
      // 如果当前节点大于等于父节点的值 则不需要上浮
      if (this.data[index] >= this.data[parentIndex]) {
        break;
      }
      // 如果父节点的值小于当前节点的值 则交换位置
      this.swap(parentIndex, index);
      // 更新index
      index = parentIndex;
    }
  }
  // 插入元素
  insert(value: T) {
    // 将元素插入到数组的末尾
    this.data.push(value);
    this.length++;
    // 上浮
    this.shiftUp(this.length - 1);
  }
  // 下沉
  shiftDown(index: number) {
    // 获取左子结点索引
    let leftIndex = index * 2 + 1;
    // 如果左子结点索引大于等于数组长度 则说明没有子结点
    while (leftIndex < this.length) {
      // 获取右节点索引
      const rightIndex = leftIndex + 1;
      // 获取左右节点中较小元素的索引
      let minIndex = leftIndex;
      if (rightIndex < this.length && this.data[rightIndex] <= this.data[leftIndex]) {
        // 存在右子节点
        minIndex = rightIndex;
      } else {
        // 不存在右子节点
        minIndex = leftIndex;
      }
      // 如果当前节点小于等于左右子节点中最大的值 则不需要下沉
      if (this.data[index] <= this.data[minIndex]) {
        break;
      }
      // 如果当前节点小于左右子节点中最大的值 则交换位置
      this.swap(index, minIndex);
      index = minIndex;
      leftIndex = index * 2 + 1;
    }
  }
  // 取出堆顶元素
  extractMin() {
    if (!this.length) return null;
    const min = this.data[0];
    const tail = this.data.pop()!;
    this.length--;
    if (this.length >= 1) {
      // 如果堆中还有元素 则将最后一个元素放到堆顶 然后下沉
      this.data[0] = tail;
      this.shiftDown(0);
    }
    return min;
  }
  // 原地建堆
  buildHeap(arr: T[]) {
    this.data = arr;
    this.length = arr.length;
    // 从最后一个非叶子节点开始下沉 即最后一个元素的父节点
    for (let i = Math.floor((this.length - 2) / 2); i >= 0; i--) {
      this.shiftDown(i);
    }
  }
  // 获取堆顶元素
  getMin() {
    return this.data[0];
  }
  // 获取堆中元素的个数
  size() {
    return this.length;
  }
  // 判断堆是否为空
  isEmpty() {
    return this.length === 0;
  }
  // 打印
  print() {
    console.log(this.data);
  }
}
export enum HeapType {
  MIN = 0, // 默认是最小堆
  MAX = 1, // 最大堆
}
export class Heap<T> {
  // 属性
  private data: T[] = [];
  private length: number = 0;
  constructor(private type: HeapType = 0, initArr: T[] = []) {
    initArr.length && this.buildHeap(initArr);
  }
  // 交换i和j位置的元素
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
  // 比较a和b位置的元素
  compare(a: number, b: number) {
    if (this.type) {
      // 如果是最大堆
      return this.data[a] >= this.data[b];
    } else {
      // 如果是最小堆
      return this.data[a] <= this.data[b];
    }
  }
  // 上浮
  private shiftUp(index: number) {
    while (index > 0) {
      // 获取父节点的索引
      const parentIndex = Math.floor((index - 1) / 2);
      // 如果是最大堆且父节点的值大于等于当前节点的值 则不需要上浮
      // 如果是最小堆且父节点的值小于等于当前节点的值 则不需要上浮
      if (this.compare(parentIndex, index)) {
        break;
      }
      // 如果父节点的值小于当前节点的值 则交换位置
      this.swap(parentIndex, index);
      // 更新index
      index = parentIndex;
    }
  }
  // 插入元素
  insert(value: T) {
    // 将元素插入到数组的末尾
    this.data.push(value);
    this.length++;
    // 上浮
    this.shiftUp(this.length - 1);
  }
  // 下沉
  shiftDown(index: number) {
    // 获取左子结点索引
    let leftIndex = index * 2 + 1;
    // 如果左子结点索引大于等于数组长度 则说明没有子结点
    while (leftIndex < this.length) {
      // 获取右节点索引
      const rightIndex = leftIndex + 1;
      // 最大/最小值的索引
      let extremeIndex = leftIndex;
      if (rightIndex < this.length && this.compare(rightIndex, leftIndex)) {
        // 存在右子节点且满足比较条件
        extremeIndex = rightIndex;
      } else {
        // 不存在右子节点
        extremeIndex = leftIndex;
      }
      // 如果是最大堆且当前节点大于等于左右子节点中最大的值 则不需要下沉
      // 如果是最小堆且当前节点小于等于左右子节点中最小的值 则不需要下沉
      if (
        (this.type && this.data[index] >= this.data[extremeIndex]) ||
        (!this.type && this.data[index] <= this.data[extremeIndex])
      ) {
        break;
      }
      // 如果当前节点小于左右子节点中最大的值 则交换位置
      this.swap(index, extremeIndex);
      index = extremeIndex;
      leftIndex = index * 2 + 1;
    }
  }
  // 取出堆顶元素
  extractTop() {
    if (!this.length) return undefined;
    const min = this.data[0];
    const tail = this.data.pop()!;
    this.length--;
    if (this.length >= 1) {
      // 如果堆中还有元素 则将最后一个元素放到堆顶 然后下沉
      this.data[0] = tail;
      this.shiftDown(0);
    }
    return min;
  }
  // 原地建堆
  buildHeap(arr: T[]) {
    this.data = arr;
    this.length = arr.length;
    // 从最后一个非叶子节点开始下沉 即最后一个元素的父节点
    for (let i = Math.floor((this.length - 2) / 2); i >= 0; i--) {
      this.shiftDown(i);
    }
  }
  // 获取堆顶元素
  getTop() {
    return this.data[0];
  }
  // 获取堆中元素的个数
  size() {
    return this.length;
  }
  // 判断堆是否为空
  isEmpty() {
    return this.length === 0;
  }
  // 打印
  print() {
    console.log(this.data);
  }
}

// 测试最大堆
// const maxHeap = new MaxHeap<number>();
// maxHeap.buildHeap([9, 11, 20, 56, 23, 45]);
// const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
// arr.forEach((item) => {
//   maxHeap.insert(item);
// });
// while(maxHeap.size()) {
//   console.log(maxHeap.extractMax());
// }
// maxHeap.print();

// 测试最小堆
// const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
// const minHeap = new MinHeap<number>();
// arr.forEach((item) => {
//   minHeap.insert(item);
// });
// while(minHeap.size()) {
//   console.log(minHeap.extractMin());
// }
// minHeap.print();

// 通用的堆
// const comMaxHeap = new Heap<number>(1); // 最大堆
// arr.forEach((item) => {
//   comMaxHeap.insert(item);
// });
// while(comMaxHeap.size()) {
//   console.log(comMaxHeap.extractTop());
// }
// comMaxHeap.print();

// const comMinHeap = new Heap<number>(0); // 最小堆
// [19, 100, 36, 17, 3, 25, 1, 2, 7].forEach((item) => {
//   comMinHeap.insert(item);
// });
// while(comMinHeap.size()) {
//   console.log(comMinHeap.extractTop());
// }
// comMinHeap.print();
