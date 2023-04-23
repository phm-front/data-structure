import { TreeNode } from './utils';

function maxPathSum(root: TreeNode | null): number {
  let res: number = -Infinity;
  // 获取经过节点的最大一侧路径和
  function getMaxSideSum(root: TreeNode | null): number {
    if (!root) return 0;
    // 如果左右路径和小于0 就取0
    const leftSideMax = Math.max(0, getMaxSideSum(root.left));
    const rightSideMax = Math.max(0, getMaxSideSum(root.right));
    // 经过root节点的最大路径和
    res = Math.max(res, (leftSideMax + root.val + leftSideMax));
    // 返回经过节点最大一侧路径和
    return Math.max(leftSideMax, rightSideMax) + root.val;
  }
  getMaxSideSum(root);
  return res;
}
