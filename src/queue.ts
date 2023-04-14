import { Queue } from "./interface";

class ArrayQueue<T> implements Queue<T> {
  private arr: T[] = [];
  // 进队列
  enqueue(element: T): void {
    this.arr.push(element);
  }
  // 出队列
  dequeue(): T | undefined {
    return this.arr.shift();
  }
  // 队列头
  front(): T | undefined {
    return this.arr[0];
  }
  // 队列是否为空
  isEmpty(): boolean {
    return this.arr.length === 0;
  }
  // 队列长度
  size(): number {
    return this.arr.length;
  }
  // 清空队列
  clear(): void {
    this.arr = [];
  }
  // 打印队列
  print(): void {
    console.log(this.arr.toString());
  }
}

// 击鼓传花
function getWinner<T>(nameList: T[], num: number): T {
  const queue = new ArrayQueue<T>();
  // 先全部放入队列
  nameList.forEach(name => {
    queue.enqueue(name);
  })
  // 开始传花
  while (queue.size() > 1) {
    // num-1次都不用淘汰
    for (let i = 1; i < num; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    // 第num次淘汰
    queue.dequeue();
  }
  return queue.front()!;
}

console.log(getWinner(["a", "b", "c", "d"], 1));
// 圆圈中最后剩下的数字 动态规划
function lastRemaining(n, m) {
  let f = 0;
  for (let i = 2; i != n + 1; ++i) {
    f = (m + f) % i;
  }
  return f;
}
