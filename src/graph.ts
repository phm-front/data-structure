class Graph<T> {
  // 顶点
  private vertices: T[] = [];
  // 边 用邻接表存储
  private adjList: Map<T, Set<T>> = new Map();
  // 添加顶点
  addVertex(v: T) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      // 初始化邻接表
      this.adjList.set(v, new Set());
    }
  }
  // 添加边 v和w之间添加边
  addEdge(v: T, w: T) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v)!.add(w);
    this.adjList.get(w)!.add(v);
  }
  // 打印
  print() {
    this.vertices.forEach((v) => {
      console.log(`${v} -> ${Array.from(this.adjList.get(v)!).join(' ')}`);
    });
  }
  // 广度优先搜索
  bfs() {
    // 判断有无顶点
    if (!this.vertices.length) return;
    // 创建一个队列
    const queue: T[] = [];
    // 创建一个Set来记录已经被加入到队列中的顶点
    const pushed = new Set<T>();
    // 将第一个顶点加入到队列
    queue.push(this.vertices[0]);
    // 添加到visited
    pushed.add(this.vertices[0])
    // 遍历队列
    while(queue.length) {
      const vertex = queue.shift()!;
      // 访问
      console.log(vertex)
      // 获取vertex的邻接表
      const adjList = this.adjList.get(vertex)!
      // 将邻接表中没有被访问过的顶点添加到队列
      adjList.forEach(vertexItem => {
        if (!pushed.has(vertexItem)) {
          queue.push(vertexItem)
          pushed.add(vertexItem)
        }
      })
    }
  }
  // 深度优先搜索
  dfs() {
    // 判断有无顶点
    if (!this.vertices.length) return;
    // 创建一个Set用来记录已经入栈的顶点
    const pushed = new Set<T>();
    // 创建一个栈
    const stack: T[] = [];
    // 先将第一个顶点入栈
    stack.push(this.vertices[0]);
    pushed.add(this.vertices[0]);
    while(stack.length) {
      // 出栈
      const vertex = stack.pop()!;
      console.log(vertex);
      // 获取邻接表
      const adjList = this.adjList.get(vertex)!;
      // 为了确保访问顺序是添加的顺序 需要翻转一下邻接表
      const adjListReverse = Array.from(adjList).reverse()
      adjListReverse.forEach(vertexItem => {
        if (!pushed.has(vertexItem)) {
          stack.push(vertexItem)
          pushed.add(vertexItem)
        }
      })
    }
  }
}
const graph = new Graph();
for (let i = 65; i < 74; i++) {
  graph.addVertex(String.fromCharCode(i));
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
graph.print();
// graph.bfs();
graph.dfs();
export {};
