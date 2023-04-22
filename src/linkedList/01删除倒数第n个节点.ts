import { ListNode } from "./utils";

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return null;
  // 虚拟节点
  const dummy = new ListNode(0, head)
  // 快慢指针
  let slow = dummy, fast = dummy;
  // 快指针先向前移动n-1步
  for (let i = 0; i < n; i++) {
    fast = fast.next!;
  }
  // 快慢指针一起移动
  while (fast.next !== null) {
    slow = slow.next!;
    fast = fast.next!;
  }
  // 删除倒数第n个节点
  slow.next = slow.next!.next;
  return dummy.next;
}
