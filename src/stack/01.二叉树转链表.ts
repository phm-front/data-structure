// leetcode 114
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
// 栈解法
function flatten(root: TreeNode | null): void {
  if (root === null) return;
  // 声明栈结构
  const stack = [root];
  let prev;
  while (stack.length) {
    const cur = stack.pop()!;
    // 子节点入栈
    if (cur.right) stack.push(cur.right);
    if (cur.left) stack.push(cur.left);
    if (prev) {
      // 设置prev左右子节点
      prev.right = cur;
      prev.left = null;
    }
    // 更新prev
    prev = cur;
  }
}
// 递归解法
// function flatten(root: TreeNode | null): void {
//   if (root === null) return
//   flatten(root.left);
//   flatten(root.right);
//   // 后续位置 左右节点已经拉成链表的形式
//   let left = root.left, right = root.right
//   root.left = null
//   root.right = left
//   while(left && left.right) {
//     left = left.right
//   }
//   if (left) {
//     left.right = right
//   } else {
//     root.right = right
//   }
// };
