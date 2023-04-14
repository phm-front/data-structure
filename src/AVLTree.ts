import { btPrint } from 'hy-algokit';
import { TreeNode } from './BSTree';

// AVl树节点
class AVLTreeNode<T> extends TreeNode<T> {
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;
  // 高度
  get height(): number {
    return Math.max(this.left?.height || 0, this.right?.height || 0) + 1;
  }
  // 平衡因子 = 左子树高度 - 右子树高度
  get balanceFactor(): number {
    return (this.left?.height || 0) - (this.right?.height || 0);
  }
  // 是否是平衡节点
  get isBalanced(): boolean {
    return Math.abs(this.balanceFactor) <= 1;
  }
  // 获取子节点中高度较高的节点 该节点就是要旋转的轴心节点
  get higherChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left?.height || 0;
    const rightHeight = this.right?.height || 0;
    // 如果左右子树高度相等且当前节点是父节点的左子节点，返回左子节点，否则返回右子节点
    if (leftHeight === rightHeight) return this.isLeftChild ? this.left : this.right;
    // 如果左子树高度大于右子树高度，返回左子节点，否则返回右子节点
    return leftHeight > rightHeight ? this.left : this.right;
  }
  // 右旋转
  rotateRight() {
    // 1、获取轴心节点
    const pivot = this.higherChild!;
    // 2、处理pivot的右子节点
    this.left = pivot.right;
    if (pivot.right) {
      pivot.right.parent = this;
    }
    // 3、处理pivot节点
    pivot.right = this;
    pivot.parent = this.parent;
    if (this.parent) {
      if (this.isLeftChild) {
        this.parent.left = pivot;
      } else {
        this.parent.right = pivot;
      }
    }
    // 4、处理root节点(this)
    this.parent = pivot;
    // 如果pivot是根节点，返回pivot
    if (!pivot.parent) return pivot;
  }
  // 左旋转
  rotateLeft() {
    // 1、获取轴心节点
    const pivot = this.higherChild!;
    // 2、处理pivot的左子节点
    this.right = pivot.left;
    if (pivot.left) {
      pivot.left.parent = this;
    }
    // 3、处理pivot节点
    pivot.left = this;
    pivot.parent = this.parent;
    if (this.parent) {
      if (this.isLeftChild) {
        this.parent.left = pivot;
      } else {
        this.parent.right = pivot;
      }
    }
    // 4、处理root节点(this)
    this.parent = pivot;
    // 如果pivot是根节点，返回pivot
    if (!pivot.parent) return pivot;
  }
  // 左右旋转封装 传入旋转方向
  rotateByDir(direction: 'left' | 'right') {
    // 1、获取轴心节点
    const pivot = this.higherChild!;
    // 2、处理pivot的子节点
    this[direction === 'left' ? 'right' : 'left'] = pivot[direction];
    if (pivot[direction]) {
      pivot[direction]!.parent = this;
    }
    // 3、处理pivot节点
    pivot[direction] = this;
    pivot.parent = this.parent;
    if (this.parent) {
      if (this.isLeftChild) {
        this.parent.left = pivot;
      } else {
        this.parent.right = pivot;
      }
    }
    // 4、处理root节点(this)
    this.parent = pivot;
    // 如果pivot是根节点，返回pivot
    if (!pivot.parent) return pivot;
  }
}

// 测试右旋转
// const node1 = new AVLTreeNode(3);
// const node2 = new AVLTreeNode(2);
// const node3 = new AVLTreeNode(1);
// const parent = new AVLTreeNode(4);
// parent.left = node1;
// node1.parent = parent;
// node1.left = node2;
// node2.parent = node1;
// node2.left = node3;
// node3.parent = node2;
// btPrint(parent);
// node1.rotateRight();
// node1.rotateByDir('right')
// btPrint(parent);
// 测试左旋转
const node1 = new AVLTreeNode(2);
const node2 = new AVLTreeNode(3);
const node3 = new AVLTreeNode(4);
const parent = new AVLTreeNode(1);
parent.right = node1;
node1.parent = parent;
node1.right = node2;
node2.parent = node1;
node2.right = node3;
node3.parent = node2;
btPrint(parent);
// node1.rotateLeft();
node1.rotateByDir('left')
btPrint(parent);
export {}
