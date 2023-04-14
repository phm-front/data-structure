// AVl树节点
class AVLTreeNode<T> {
  value: T;
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
  // 高度
  get height(): number {
    return Math.max(this.left?.height || 0, this.right?.height || 0) + 1;
  }
  // 是否是父节点的左子节点
  get isLeftChild() {
    return this.parent !== null && this.parent.left === this;
  }
  // 是否是父节点的右子节点
  get isRightChild() {
    return this.parent !== null && this.parent.right === this;
  }
}


