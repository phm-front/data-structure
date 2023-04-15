import { btPrint } from 'hy-algokit';

export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
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

export class BSTree<T> {
  protected root: TreeNode<T> | null = null;
  // 创建节点
  protected createTreeNode(value: T): TreeNode<T> {
    return new TreeNode(value);
  }
  // 打印
  print() {
    btPrint(this.root);
  }
  // 检查是否平衡
  checkBalance(node: TreeNode<T> | null, isStartFromParent = true) {}
  // 插入
  insert(value: T) {
    const node = this.createTreeNode(value);
    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
    // 检查是否平衡
    this.checkBalance(node);
  }
  insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      if (node.right === null) {
        node.right = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      console.warn('The value is already in the tree', newNode.value);
    }
  }
  // 先序遍历
  preOrderTraverse(root: TreeNode<T> | null = this.root) {
    if (root === null) {
      return;
    }
    console.log(root.value);
    this.preOrderTraverse(root.left);
    this.preOrderTraverse(root.right);
  }
  // 中序遍历
  inOrderTraverse(root: TreeNode<T> | null = this.root) {
    if (root === null) {
      return;
    }
    this.inOrderTraverse(root.left);
    console.log(root.value);
    this.inOrderTraverse(root.right);
  }
  // 后序遍历
  postOrderTraverse(root: TreeNode<T> | null = this.root) {
    if (root === null) {
      return;
    }
    this.postOrderTraverse(root.left);
    this.postOrderTraverse(root.right);
    console.log(root.value);
  }
  // 层序遍历
  levelOrderTraverse() {
    if (this.root === null) {
      return;
    }
    const queue: TreeNode<T>[] = [];
    // 将根节点入队
    queue.push(this.root);
    while (queue.length) {
      // 将队头出队 并将其左右子节点依次入队
      const node = queue.shift()!;
      console.log(node.value);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }
  // 获取最小值节点
  getMinNode(node: TreeNode<T> | null) {
    let cur = node;
    while (cur && cur.left) {
      cur = cur.left;
    }
    return cur;
  }
  // 获取最大值节点
  getMaxNode(node: TreeNode<T> | null) {
    let cur = node;
    while (cur && cur.right) {
      cur = cur.right;
    }
    return cur;
  }
  // 查找最大值
  max() {
    const maxNode = this.getMaxNode(this.root);
    return maxNode ? maxNode.value : null;
  }
  // 查找最小值
  min() {
    const minNode = this.getMinNode(this.root);
    return minNode ? minNode.value : null;
  }
  // 查找特定值的节点
  searchNode(value: T) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) {
        return cur;
      } else if (value < cur.value) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    return null;
  }
  // 查找特定值
  search(value: T) {
    return !!this.searchNode(value);
  }
  // 获取后继节点
  getSuccessor(node: TreeNode<T>) {
    const successor = this.getMinNode(node.right)!;
    // 处理后继结点的左子节点
    successor.left = node.left;
    node.left!.parent = successor;
    node.left = null;
    // 处理后继节点的右子节点
    // 如果后继节点是要删除节点的右子节点 则不用处理
    if (successor !== node.right) {
      // 如果后继节点有右子节点 则将其赋值到后继节点的父节点的左子节点
      if (successor.right) {
        successor.parent!.left = successor.right;
        successor.right.parent = successor.parent;
      } else {
        // 如果后继节点没有右子节点 则将其父节点的左子节点置为null
        successor.parent!.left = null;
      }
      successor.right = node.right;
      node.right!.parent = successor;
    }
    return successor;
  }
  // 删除
  remove(value: T) {
    // 检查节点是否平衡的开始节点
    let checkBlcStart: TreeNode<T> | null = null;
    // 获取要删除的节点
    const removeNode = this.searchNode(value);
    // 如果删除节点不存在 直接return
    if (removeNode === null) {
      return false;
    }
    // 判断removeNode是否是叶子节点
    if (removeNode.left === null && removeNode.right === null) {
      if (removeNode.parent) {
        // 判断removeNode是否是父节点的左子节点
        if (removeNode.isLeftChild) {
          removeNode.parent.left = null;
        } else {
          removeNode.parent.right = null;
        }
      } else {
        // 如果是根节点
        this.root = null;
      }
      checkBlcStart = removeNode.parent;
    }
    // 删除节点只有一个子节点
    else if (removeNode.left === null || removeNode.right === null) {
      if (removeNode.parent) {
        // 判断removeNode是否是父节点的左子节点
        if (removeNode.isLeftChild) {
          removeNode.parent.left = removeNode.left || removeNode.right;
        } else {
          removeNode.parent.right = removeNode.left || removeNode.right;
        }
      } else {
        // 如果是根节点
        this.root = removeNode.left || removeNode.right;
      }
      checkBlcStart = removeNode.parent;
      // 处理removeNode子节点的父节点
      (removeNode.left || removeNode.right)!.parent = removeNode.parent;
    }
    // 删除节点有两个子节点
    else {
      // 获取后继节点
      const successor = this.getSuccessor(removeNode);
      // 如果后置节点就是removeNode的右节点 checkBlcStart需要赋值为successor
      // 因为removeNode要被删除了 不能参与到旋转操作中
      if (successor === removeNode.right) {
        checkBlcStart = successor
      } else {
        checkBlcStart = successor.parent
      }
      if (removeNode.parent) {
        // 判断removeNode是否是父节点的左子节点
        if (removeNode.isLeftChild) {
          removeNode.parent.left = successor;
        } else {
          removeNode.parent.right = successor;
        }
      } else {
        // 如果是根节点
        this.root = successor;
      }
      // 处理后继节点的父节点
      successor.parent = removeNode.parent;
    }
    // 删除完成后 检查树平衡
    this.checkBalance(checkBlcStart, false);
  }
}

// const bst = new BSTree<number>();
// bst.insert(11);
// bst.insert(7);
// bst.insert(5);
// bst.insert(3);
// bst.insert(9);
// bst.insert(8);
// bst.insert(10);
// bst.insert(15);
// bst.insert(13);
// bst.insert(12);
// bst.insert(14);
// bst.insert(20);
// bst.insert(18);
// bst.insert(25);
// bst.insert(19);
// bst.preOrderTraverse()
// bst.inOrderTraverse()
// bst.postOrderTraverse()
// bst.levelOrderTraverse()
// bst.print()
// bst.remove(15);
// bst.remove(7);
// bst.remove(8);
// bst.remove(11);
// bst.print()
export {};
