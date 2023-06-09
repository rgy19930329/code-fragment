/**
 * 深度优先遍历
 * @param {*} node 根节点对象
 * @param {*} visit 读取节点的方法
 * @param {*} f 子节点字段
 */
function dfs(node, visit, f = 'child') {
  if (node) {
    visit(node);
    const children = node[f];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        dfs(children[i], visit, f);
      }
    }
  }
}

/**
 * 堆叠数组（一维转二维）
 * @param {*} array
 * @param {*} number
 * @returns
 */
function stacking(array, number = 2) {
  const result = [];

  for (let i = 0, len = array.length; i < len; i += number) {
    if (i % number === 0) {
      if (!result[i / number]) {
        result[i / number] = [];
        for (let j = 0; j < number; j++) {
          if (i + j < len) {
            result[i / number].push(array[i + j]);
          }
        }
      }
    }
  }

  return result;
}

/**
 * 数组去重
 * @param {*} list
 * @param {*} f 对象唯一标识，为普通类型时不能传该字段
 */
function unique(list, f) {
  // 对象类型
  if (f) {
    const cache = {};
    const r = [];
    for (let i = 0; i < list.length; i++) {
      if (!cache[list[i][f]]) {
        cache[list[i[f]]] = true;
        r.push(list[i]);
      }
    }
    return r;
  }
  // 普通类型
  else {
    return [...new Set(list)];
  }
}

/**
 * 从数组中移除指定元素
 * @param {*} list
 * @param {*} n 要移除的元素，可以是单个元素（普通类型、对象类型），也可以是数组（普通类型数组、对象类型数组）
 * @param {*} f 对象唯一标识，为普通类型时不能传该字段
 * @returns
 */
function remove(list, n, f) {
  if (!Array.isArray(n)) {
    n = [n];
  }
  // 对象类型
  if (f) {
    const ids = n.map((item) => item[f]);
    const r = list.filter((item) => !ids.includes(item[f]));
    return r;
  }
  // 普通类型
  else {
    const ids = n;
    const r = list.filter((item) => !ids.includes(item));
    return r;
  }
}

/**
 * 从数组中筛选指定元素
 * @param {*} list
 * @param {*} n 要移除的元素，可以是单个元素（普通类型、对象类型），也可以是数组（普通类型数组、对象类型数组）【通常为普通（数组）类型即可】
 * @param {*} f 对象唯一标识，为普通类型时不能传该字段
 * @returns
 */
function filter(list, n, f) {
  if (!Array.isArray(n)) {
    n = [n];
  }
  // 对象类型
  if (f) {
    const ids = n.map((item) => item[f]);
    const r = list.filter((item) => ids.includes(item[f]));
    return r;
  }
  // 普通类型
  else {
    const ids = n;
    const r = list.filter((item) => ids.includes(item));
    return r;
  }
}

/**
 * 获取两个数组交叉部分的数据，返回数组（支持普通类型和对象类型）
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} f
 * @returns
 */
function cross(arr1, arr2, f) {
  // 对象类型
  if (f) {
    const r = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr[i][f] === arr2[j][f]) {
          r.push(arr1[i]);
        }
      }
    }
    return r;
  }
  // 普通类型
  else {
    const r = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr[i] === arr2[j]) {
          r.push(arr1[i]);
        }
      }
    }
    return r;
  }
}
