import { Stack } from "./interface";

class ArrayStack<T> implements Stack<T> {
  // 定义一个数组来保存栈元素
  private arr: T[] = [];
  // 入栈
  push(item: T) {
    this.arr.push(item);
  }
  // 出栈
  pop(): T | undefined {
    return this.arr.pop();
  }
  // 返回栈顶元素
  peek(): T | undefined {
    return this.arr[this.arr.length - 1];
  }
  // 判断栈是否为空
  isEmpty(): boolean {
    return this.arr.length === 0;
  }
  // 返回栈的元素个数
  size(): number {
    return this.arr.length;
  }
  // 清空栈
  clear() {
    this.arr = [];
  }
  // 打印栈
  print() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
    } else {
      console.log(this.arr.toString());
    }
  }
}

// 十进制转二进制 借助ArrayStack
function decimalToBinary(decNumber: number) {
  const remStack = new ArrayStack<number>();
  let rem: number;
  let binaryString: string = "";

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop();
  }

  return binaryString;
}
console.log(decimalToBinary(100))

// 有效的括号
function isValid(s: string): boolean {
  const stack = new ArrayStack<string>();
  const map = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (map.has(c)) {
      if (stack.isEmpty() || stack.pop() !== map.get(c)) {
        return false;
      }
    } else {
      stack.push(c);
    }
  }

  return stack.isEmpty();
}
