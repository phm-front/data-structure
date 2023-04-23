import { TreeNode } from './utils';
// leetcode 226
// 递归解法
// function invertTree(root: TreeNode | null): TreeNode | null {
//   if (!root) return null;
//   let leftTree = invertTree(root.left);
//   let rightTree = invertTree(root.right);
//   // 交换左右子节点
//   root.left = rightTree;
//   root.right = leftTree;
//   return root;
// };

// 栈解法
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const cur = stack.pop()!;
    // 交换左右子节点
    [cur.left, cur.right] = [cur.right, cur.left];
    if (cur.left) stack.push(cur.left);
    if (cur.right) stack.push(cur.right);
  }
  return root;
}
