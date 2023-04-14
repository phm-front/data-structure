import { Heap, HeapType } from './heap';

class PriorityNode<T> {
  value: T;
  priority: number; // 优先级
  constructor(value: T, priority: number) {
    this.value = value;
    this.priority = priority;
  }
  valueOf() {
    return this.priority;
  }
}

class PriorityQueue<T> {
  // 使用堆存储优先级节点
  private heap: Heap<PriorityNode<T>>;
  // 由传入的type决定是最大堆还是最小堆 默认是最小堆
  constructor(type: HeapType = 0) {
    this.heap = new Heap(type);
  }
  // 入队
  enqueue(value: T, priority: number) {
    this.heap.insert(new PriorityNode(value, priority));
  }
  // 出队
  dequeue() {
    return this.heap.extractTop()?.value;
  }
  // 获取队首元素
  getFront() {
    return this.heap.getTop()?.value;
  }
  // 非空判断
  isEmpty() {
    return this.heap.isEmpty();
  }
  // 获取队列中元素的个数
  size() {
    return this.heap.size();
  }
}

// 测试
const pq = new PriorityQueue<string>();
pq.enqueue('c', 3);
pq.enqueue('d', 4);
pq.enqueue('e', 5);
pq.enqueue('a', 1);
pq.enqueue('b', 2);
while (!pq.isEmpty()) {
  console.log(pq.dequeue());
}

