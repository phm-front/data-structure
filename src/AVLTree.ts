import { btPrint } from 'hy-algokit';
import { BSTree, TreeNode } from './BSTree';

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
    return null
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
    return null
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
    // 默认返回null 意味着不需要更新根节点
    return null;
  }
}

class AVLTree<T> extends BSTree<T> {
  // 重写创建节点方法
  protected createTreeNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value);
  }
  // 重新平衡非平衡节点
  rebalance(unbalancedNode: AVLTreeNode<T>) {
    // 获取pivot节点
    const pivot = unbalancedNode.higherChild!;
    // 获取导致不平衡的节点
    const theCauseNode = pivot.higherChild!;
    // 如果旋转后pivot没有父节点 则将其设置为根节点
    let newRoot: AVLTreeNode<T> | null = null;
    // 区分四种情况 LL LR RL RR
    // 如果pivot是左子节点 一定是LL或者LR
    if (pivot.isLeftChild) {
      if (theCauseNode.isLeftChild) {
        // LL 右旋转
        newRoot = unbalancedNode.rotateByDir('right');
      } else {
        // LR 先左旋转 以pivot为root theCauseNode为轴心 
        pivot.rotateByDir('left');
        // 再右旋转 以unbalancedNode为root pivot为轴心 
        newRoot = unbalancedNode.rotateByDir('right');
      }
    } else {
      // 如果pivot是右子节点 一定是RL或者RR
      if (theCauseNode.isLeftChild) {
        // RL 先右旋转 以pivot为root theCauseNode为轴心 
        pivot.rotateByDir('right');
        // 再左旋转 以unbalancedNode为root pivot为轴心 
        newRoot = unbalancedNode.rotateByDir('left');
      } else {
        // RR 左旋转
        newRoot = unbalancedNode.rotateByDir('left');
      }
    }
    // 如果newRoot存在 则将其设置为根节点
    if (newRoot) this.root = newRoot;
  }
  // 实现检查是否平衡 isStartFromParent为false时表示从当前节点开始向上遍历，此时代表删除操作
  checkBalance(node: AVLTreeNode<T> | null, isStartFromParent = true) {
    let cur = isStartFromParent ? node!.parent : node;
    // 从当前节点的父节点开始向上遍历
    while (cur) {
      // 如果不平衡 则进行平衡操作
      if (!cur.isBalanced) {
        this.rebalance(cur);
        // 插入只会导致一个节点不平衡 直接break即可
        if (isStartFromParent) break;
        // 删除可能会导致多个节点不平衡 所以需要继续向上遍历
      }
      cur = cur.parent;
    }
  }
}

// 测试
const avl = new AVLTree<number>();
// 随机删除测试
const removeArr: number[] = [];
for(let i = 0; i < 20; i++) {
  const redom = Math.floor(Math.random() * 400);
  if (i < 5) {
    removeArr.push(redom);
  }
  avl.insert(redom);
}
avl.print();
console.log(removeArr)
removeArr.forEach(item => {
  avl.remove(item);
  // avl.print();
})
// 自定义数据测试
// avl.insert(50);
// avl.insert(25);
// avl.insert(100);
// avl.insert(12);
// avl.insert(150);
// avl.remove(25)
// avl.remove(12)
avl.print();

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
// const node1 = new AVLTreeNode(2);
// const node2 = new AVLTreeNode(3);
// const node3 = new AVLTreeNode(4);
// const parent = new AVLTreeNode(1);
// parent.right = node1;
// node1.parent = parent;
// node1.right = node2;
// node2.parent = node1;
// node2.right = node3;
// node3.parent = node2;
// btPrint(parent);
// node1.rotateLeft();
// node1.rotateByDir('left')
// btPrint(parent);
export {}
