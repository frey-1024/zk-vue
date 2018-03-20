// 判断数据类型是否对象
export function isObject (obj){
  return obj !== null && typeof obj === 'object';
}

const _toString = Object.prototype.toString;
// 判断是否普通对象
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]';
}

// 删除数组中的某一项
export function remove (arr, item){
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

// 判断是否标签节点
export function elementNode(node) {
  return node.nodeType === 1;
}

// 判断是否文本节点
export function textNode(node) {
  return node.nodeType === 3;
}

// 剥离无用的字符串
export function peelValue(value, peel) {
  return value.replace(peel, '');
}