class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}
class LinkedList<T> {
  // 链表头部
  head: ListNode<T> | null = null;
  // 链表尾部
  tail: ListNode<T> | null = null;
  // 链表长度
  size: number = 0;
  // 获取index位置的元素 没有返回null
  getNode(index: number) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let cur = this.head;
    for (let i = 0; i < index; i++) {
      cur = cur!.next;
    }
    return cur;
  }
  // 获取值是value的node在链表中的索引 如果不存在 则返回-1
  indexOf(value: T): number {
    let cur = this.head;
    for (let i = 0; i < this.size; i++) {
      if (cur!.value === value) {
        return i;
      }
      cur = cur!.next;
    }
    return -1;
  }
  // 在链表头部添加元素
  addAtHead(value: T) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.tail = node;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
  }
  // 在链表尾部添加元素
  addAtTail(value: T) {
    const node = new ListNode(value);
    if (this.tail === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.size++;
  }
  // 在链表的index位置添加元素 如果index等于链表长度 则添加到链表尾部 如果index大于链表长度 则不添加
  addAtIndex(index: number, value: T) {
    if (index < 0 || index > this.size) {
      throw new Error("index out of range");
    }
    if (index === 0) {
      this.addAtHead(value);
      return;
    }
    if (index === this.size) {
      this.addAtTail(value);
      return;
    }
    const prev = this.getNode(index - 1);
    const node = new ListNode(value);
    node.next = prev!.next;
    prev!.next = node;
    this.size++;
  }
  // 删除
  deleteAtIndex(index: number): Boolean {
    if (index < 0 || index >= this.size) {
      return false;
    }
    if (index === 0) {
      this.head = this.head!.next;
      if (this.size === 1) {
        this.tail = null;
      }
    } else {
      const prev = this.getNode(index - 1);
      prev!.next = prev!.next!.next;
      if (index === this.size - 1) {
        this.tail = prev;
      }
    }
    this.size--;
    return true;
  }
  // 遍历链表
  tranverse() {
    let cur = this.head;
    while (cur) {
      console.log(cur.value);
      cur = cur.next;
    }
  }
}

export {};
