// leetcode 剑指offer9
class CQueue {
  private stack1: number[] = []
  private stack2: number[] = []
  constructor() {

  }
  appendTail(value: number): void {
    this.stack1.push(value);
  }
  deleteHead(): number {
    if (!this.stack2.length) {
      while(this.stack1.length){
        this.stack2.push(this.stack1.pop()!)
      }
    }
    return this.stack2.pop() ?? -1;
  }
}

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
