import { Watcher } from './watcher';
import { elementNode, textNode, peelValue, isPlainObject } from './util';
import { textRE, bindRE, onRE, normalDirRE, dirRE } from './reg';
export class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    // 获取到该元素
    if (this.$el) {
      this.init();
    }
  }

  /**
   * 初始化编译类
   */
  init() {
    this.distinguishElement(this.$el);
  };
  /**
   * 区分不同节点
   * @param el 当前Vue 处理的Dom 范围的最外层标签
   */
  distinguishElement(el) {
    Array.from(el.childNodes, (node) => {
      if (elementNode(node)) {
        this.handleElement(node);
        // 有子节点
        if (node.childNodes && node.childNodes.length) {
          this.distinguishElement(node);
        }
      } else if (textNode(node) && textRE.test(node.textContent)) { // 文本节点，里面有{{}}
        this.compileText(node, node.textContent.match(textRE)[1]);
      }
    });
  };

  /**
   * 处理标签节点
   * @param node 标签节点
   */
  handleElement(node) {
    let value, attrName,
    cloneNode = node.cloneNode(true);// 克隆节点的原因是因为接下来会有node的属性增删等修改， 如果不克隆在原来的属性上修改，遍历的时候会出现错误
    // 把标签节点属性伪数组，转变成数组，并遍历
    Array.from(cloneNode.attributes, (attr) => {
      value = attr.value;
      attrName = attr.name;
      // 匹配v-、@以及:
      if (dirRE.test(attrName)) {
        // 匹配v-bind以及:
        if (bindRE.test(attrName)) {
          createWatcher(node, this.$vm, peelValue(attrName, attrName.match(bindRE)[0]), value);
          /*匹配@以及v-on，绑定事件 */
        } else if (onRE.test(attrName)) {
          handleEvent(node, this.$vm, peelValue(attrName, attrName.match(onRE)[0]), value);
          // 普通指令 匹配 v-
        } else if (normalDirRE.test(attrName)) {
          this.distinguishDirective(node, value, peelValue(attrName, attrName.match(normalDirRE)[0]));
        }
        // 删除相应Vue属性
        node.removeAttribute(attrName);
      }
    });
  };

  /**
   * 编译文本，如： {{}}， v-text
   * @param node 需要修改的节点
   * @param exp 已经观察的属性名，此属性名已经剥离了前缀如v-,@ ,: 等等
   */
  compileText(node, exp) {
    createWatcher(node, this.$vm, 'text', exp);
  };

  /**
   * 区分普通的vue 内置指令，并分别处理，如：v-text, v-model
   * @param node 需要修改的节点
   * @param exp 已经观察的属性名，此属性名已经剥离了前缀如v-,@ ,: 等等
   * @param type 需要编译的类型
   */
  distinguishDirective(node, exp, type) {
    if (type === 'text') {
      this.compileText(node, exp);
    } else if (type === 'model') {
      this.compileModel(node, exp);
    }
  };

  /**
   * 编译普通的vue 内置v-model指令
   * @param node 需要修改的节点
   * @param exp 已经观察的属性名，此属性名已经剥离了前缀如v-,@ ,: 等等
   */
  compileModel(node, exp) {
    // 对该指令所绑定的进行订阅
    createWatcher(node, this.$vm, 'model', exp);
    // 旧值
    let oldValue = getProxyVal(this.$vm, exp);
    // 监听用户输入，并更新旧值
    node.addEventListener('input', (ev) => {
      const value = ev.target.value;
      if (value === oldValue) {
        return;
      }
      // 修改代理在 $vm 上的值，然后进行观察
      setProxyVal(this.$vm, exp, value);
      // 更新旧值， 此处因为是闭包，oldValue 不会丢失
      oldValue = value;
    }, false);
  };
}

/**
 * 创建一个订阅者
 * @param node 需要修改的节点
 * @param vm 当前Vue对象
 * @param name 剥离后的属性名，和订阅者回调函数名称保持一致
 * @param exp 已经观察的属性名，此属性名已经剥离了前缀如v-,@ ,: 等等
 */
function createWatcher(node, vm, name, exp) {
  // 从订阅者回调函数库中找到相应的回调函数
  const updaterFn = updater[name];
  // 初始化页面数据
  updaterFn && updaterFn(node, getProxyVal(vm, exp));
  // 创建订阅者
  new Watcher(vm, exp, function(value, oldValue) {
    updaterFn && updaterFn(node, value, oldValue);
  });
}

/**
 * 获取 $vm 上代理的值
 * @param obj 当前Vue 对象
 * @param exp 已经观察的属性名（key）
 * @returns {*} 返回找到的属性值
 */
function getProxyVal(obj, exp) {
  // exp 可能是 对象嵌套，如 user.name，分离成数组
  exp = exp.split('.');
  exp.forEach(function(k) {
    obj = obj[k];
  });
  return obj;
}

/**
 * 设置 $vm 上代理的值， 触发相应的通知
 * @param obj 当前Vue 对象
 * @param exp 已经观察的属性名（key）
 * @param newValue
 */
function setProxyVal(obj, exp, newValue) {
  // exp 可能是 对象嵌套，如 user.name, 分离成数组
  exp = exp.split('.');
  exp.forEach(function(k, i) {
    // 非最后一个key，更新obj
    if (i < exp.length - 1) {
      obj = obj[k];
    } else {
      obj[k] = newValue;
    }
  });
}

/**
 * 绑定事件到节点上
 * @param node 需要绑定事件的节点
 * @param vm 当前vue对象
 * @param ev 需要绑定到元素上的事件名称
 * @param exp 已经观察的属性名（key）
 */
function handleEvent(node, vm, ev, exp) {
  const fn = vm.$options.methods && vm.$options.methods[exp];
  if (fn) {
    node.addEventListener(ev, fn.bind(vm), false);
  }
}

/**
 * 订阅者回调函数
 * @type {{text: (function(*, *=)), class: (function(*, *, *=)), style: (function(*, *=, *=)), model: (function(*, *=, *))}}
 */
export const updater = {
  text(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  class(node, value, oldValue) {
    let className = node.className;
    className = className.replace(oldValue, '');
    node.className = `${className ? className.trim() + ' ': ''}${value}`;
  },
  style(node, value, oldValue) {
    const style = node.style;
    if (isPlainObject(oldValue)) {
      Object.keys(oldValue).forEach((key) => {
        style[key] = '';
      })
    }
    if (isPlainObject(value)) {
      Object.keys(value).forEach((key) => {
        node.style[key] = value[key];
      })
    }
  },
  model(node, value, oldValue) {
    node.value = value === undefined ? '' : value;
  }
};