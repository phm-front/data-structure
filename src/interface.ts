// 栈接口
interface Stack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
  print(): void;
}

// 队列接口
interface Queue<T> {
  enqueue(element: T): void;
  dequeue(): T | undefined;
  front(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
  print(): void;
}

export {
  Stack,
  Queue
};
