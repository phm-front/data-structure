import { ListNode } from './utils';

function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let cur = dummy;
  while(cur.next !== null && cur.next.next !== null) {
    // 双指针
    const n1 = cur.next;
    const n2 = cur.next.next;
    // 交换位置
    cur.next = n2;
    n1.next = n2.next;
    n2.next = n1;
    // cur指向n1
    cur = n1;
  }
  return dummy.next;
}
