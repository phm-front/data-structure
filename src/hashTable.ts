class HashTable<T> {
  // 存储数据的数组
  private storage: Array<[string, T]>[] = []
  // 当前插入的元素个数
  private count: number = 0
  // 最大容量
  private limit: number = 7
  // hash函数
  private hashFunction(key: string, max: number) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      // 使用霍纳法则降低时间复杂度
      hash = 31 * hash + key.charCodeAt(i);
    }
    // 返回hash值(索引值)
    return hash % max;
  }
  // 扩容/缩容
  private resize(newLimit: number) {
    // 保存旧的数组内容
    const oldStorage = this.storage;
    // 重置所有属性
    this.storage = [];
    this.count = 0;
    this.limit = newLimit;
    // 遍历oldStorage中的所有bucket
    for (let i = 0; i < oldStorage.length; i++) {
      const bucket = oldStorage[i];
      if (bucket === undefined) {
        continue;
      }
      // 遍历bucket中的所有元素
      for (let j = 0; j < bucket.length; j++) {
        const tuple = bucket[j];
        this.put(tuple[0], tuple[1]);
      }
    }
  }
  // 获取最近的质数
  private getPrime(num: number) {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }
  // 判断是否为质数
  private isPrime(num: number) {
    const temp = Math.sqrt(num);
    for (let i = 2; i <= temp; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  // 插入/修改
  put(key: string, value: T) {
    // 获取索引值
    const index = this.hashFunction(key, this.limit);
    // 获取对应的bucket
    let bucket = this.storage[index];
    // 判断bucket是否为undefined
    if (bucket === undefined) {
      bucket = [];
      this.storage[index] = bucket;
    }
    // 判断是否是修改数据
    let override = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        override = true;
      }
    }
    // 如果不是修改数据 则插入数据
    if (!override) {
      bucket.push([key, value]);
      this.count++;
      // 判断是否需要扩容 装填因子超过0.75
      if (this.count > this.limit * 0.75) {
        // 扩容需要对以前容器的数据进行重新散列
        // 因为扩容后取余的值发生了变化 对应的索引值也发生了变化
        const newSize = this.limit * 2;
        // 保证newSize是质数
        const primeSize = this.getPrime(newSize);
        this.resize(primeSize);
      }
    }
  }
  // 获取值
  get(key: string) {
    // 获取索引值
    const index = this.hashFunction(key, this.limit);
    // 获取对应的bucket
    const bucket = this.storage[index];
    // 判断bucket是否为undefined
    if (bucket === undefined) {
      return undefined;
    }
    // 遍历bucket
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }
    return undefined;
  }
  // 删除
  delete(key: string) {
  // 获取索引值
  const index = this.hashFunction(key, this.limit);
  // 获取对应的bucket
  const bucket = this.storage[index];
  // 判断bucket是否为undefined
  if (bucket === undefined) {
    return undefined;
  }
  // 遍历bucket
  for (let i = 0; i < bucket.length; i++) {
    const tuple = bucket[i];
    if (tuple[0] === key) {
      bucket.splice(i, 1);
      this.count--;
      // 判断是否需要缩容 装填因子小于0.25 最小容量为7
      if (this.limit > 7 && this.count < this.limit * 0.25) {
        const newSize = Math.floor(this.limit / 2);
        // 保证newSize是质数
        const primeSize = this.getPrime(newSize);
        this.resize(primeSize);
      }
      return tuple[1];
    }
  }
  return undefined;
  }
  get max() {
    return this.limit;
  }
}

// 测试
const hashTable = new HashTable<number>();
hashTable.put('abc', 123);
hashTable.put('cba', 321);
hashTable.put('nba', 456);
hashTable.put('mba', 654);
hashTable.put('aaa', 654);
hashTable.put('ccc', 654);
// 获取
console.log(hashTable.get('abc'));
console.log(hashTable.get('cba'));
// 删除
console.log(hashTable.delete('abc'));
console.log(hashTable.delete('cba'));
console.log(hashTable.get('abc'));
console.log(hashTable.get('cba'));

export {}
