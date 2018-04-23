/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["c"] = isPlainObject;
/* unused harmony export remove */
/* harmony export (immutable) */ __webpack_exports__["a"] = elementNode;
/* harmony export (immutable) */ __webpack_exports__["e"] = textNode;
/* harmony export (immutable) */ __webpack_exports__["d"] = peelValue;
// 判断数据类型是否对象
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

const _toString = Object.prototype.toString;
// 判断是否普通对象
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

// 删除数组中的某一项
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

// 判断是否标签节点
function elementNode(node) {
  return node.nodeType === 1;
}

// 判断是否文本节点
function textNode(node) {
  return node.nodeType === 3;
}

// 剥离无用的字符串
function peelValue(value, peel) {
  return value.replace(peel, '');
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dep; });
// Dep 类标识符
let id = 0;
let Dep = class Dep {
  constructor() {
    this.id = ++id;
    // 订阅者容器（subscribers）
    this.subs = [];
  }

  /**
   * 添加订阅者
   * @param sub
   */
  addSub(sub) {
    this.subs.push(sub);
  }
  /*依赖收集，当存在Dep.target的时候添加订阅者对象*/
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  /**
   * 对订阅者进行通知
   */
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
};

;
// 是否收集的标识
Dep.target = null;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(9);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_main__ = __webpack_require__(4);

let id = 1;
new __WEBPACK_IMPORTED_MODULE_0__js_main__["a" /* default */]({
  el: '#app',
  data: function () {
    return {
      classColor: 'text-black',
      styleColor: {
        fontSize: '14px',
        backgroundColor: '#CCC',
      },
      text: '文字设置',
      inputVal: '',
      testJson: {
        value: '这是测试对象',
        color: 'text-black',
      }
    }
  },
  methods: {
    click1() {
      this.classColor = 'text-gray';
      this.testJson.color = 'text-gray';
    },
    click2(){
      this.classColor = 'text-red';
      this.testJson.color = 'text-red';

    },
    click3() {
      this.styleColor = !this.styleColor.padding ? { padding: '20px' } : {
        fontSize: '14px',
        backgroundColor: '#CCC',
      }
    },
    click4() {
      this.text = `${this.text} ${++id}`;
    },
  },
  computed: {
    getClassColor() {
      return this.classColor;
    },
    getStyleColor() {
      return Object.assign({}, this.styleColor, { fontSize: '18px' });
    },
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export proxy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compile__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);




/**
 * Vue 构造函数
 * @param options
 * @constructor
 */
function Vue(options) {
  this._init(options);
}

/**
 * Vue 构造函数原型方法
 * @type {{constructor: Vue, _init: (function(*)), _initData: (function()), _initComputed: (function())}}
 */
Vue.prototype = {
  // 防止 constructor 丢失和修改
  constructor: Vue,
  // Vue 初始化函数
  _init(options) {
    this.$options = options;
    const data = this.$options.data;
    this._data = typeof data === 'function' ? getData(data, this) : data || {};

    this._computed = this.$options.computed;
    // 初始化data
    this._initData();
    // 初始化计算
    this._initComputed();
    // 观察数据
    Object(__WEBPACK_IMPORTED_MODULE_1__observer__["a" /* observe */])(this._data);
    // 处理DOM
    new __WEBPACK_IMPORTED_MODULE_0__compile__["a" /* Compile */](this.$options.el, this);
  },
  _initData() {
    Object.keys(this._data).forEach(key => {
      proxy(this, '_data', key);
    });
  },
  _initComputed() {
    const computed = this._computed;
    // 普通对象
    if (computed && Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* isPlainObject */])(computed)) {
      // 遍历computed
      Object.keys(computed).forEach(key => {
        const getter = typeof computed[key] === 'function' ? computed[key] : computed[key].get;
        proxy(this, '_computed', key, getter, function () {});
      });
    }
  }
};

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: function () {},
  set: function () {}
};
/*
* computed自执行的原理：
* 无论computed还是data我们都进行了数据绑定，并且都代理到vm上了，
* computed 所代理的get函数就是写在computed中的函数，
* 此时在创建watcher时，会获取这个computed中这个get函数，
* 而get中又包含data中数据，也会执行data中绑定的get方法，也就是会执行observer的defineReactive中get方法，
* 因为此时target = this; 也就会执行 dep.depend(); 添加watcher到这个subs中，
* 这个时候data的观察在正常情况下就有两个了: [绑定自己的watcher， 绑定包含自己的computed的watcher]
* 当修改data中数据时，就会执行这两个watcher，所以computed所绑定的就会自动执行
*
* */
/*通过proxy函数将_data上面的数据代理到vm上，这样就可以用app.text代替app._data.text了。*/
function proxy(vm, sourceKey, key, getter, setter) {
  // 如果执行get方法，那么就会执行相应的观察者中的get方法
  sharedPropertyDefinition.get = getter || function proxyGetter() {
    return vm[sourceKey][key];
  };
  sharedPropertyDefinition.set = setter || function proxySetter(val) {
    vm[sourceKey][key] = val;
  };
  // 观察
  Object.defineProperty(vm, key, sharedPropertyDefinition);
}

function getData(data, vm) {
  try {
    return data.call(vm);
  } catch (e) {
    return {};
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Compile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reg__ = __webpack_require__(7);



let Compile = class Compile {
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
  }
  /**
   * 区分不同节点
   * @param el 当前Vue 处理的Dom 范围的最外层标签
   */
  distinguishElement(el) {
    Array.from(el.childNodes, node => {
      if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* elementNode */])(node)) {
        this.handleElement(node);
        // 有子节点
        if (node.childNodes && node.childNodes.length) {
          this.distinguishElement(node);
        }
      } else if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* textNode */])(node) && __WEBPACK_IMPORTED_MODULE_2__reg__["e" /* textRE */].test(node.textContent)) {
        // 文本节点，里面有{{}}
        this.compileText(node, node.textContent.match(__WEBPACK_IMPORTED_MODULE_2__reg__["e" /* textRE */])[1]);
      }
    });
  }

  /**
   * 处理标签节点
   * @param node 标签节点
   */
  handleElement(node) {
    let value,
        attrName,
        cloneNode = node.cloneNode(true); // 克隆节点的原因是因为接下来会有node的属性增删等修改， 如果不克隆在原来的属性上修改，遍历的时候会出现错误
    // 把标签节点属性伪数组，转变成数组，并遍历
    Array.from(cloneNode.attributes, attr => {
      value = attr.value;
      attrName = attr.name;
      // 匹配v-、@以及:
      if (__WEBPACK_IMPORTED_MODULE_2__reg__["b" /* dirRE */].test(attrName)) {
        // 匹配v-bind以及:
        if (__WEBPACK_IMPORTED_MODULE_2__reg__["a" /* bindRE */].test(attrName)) {
          createWatcher(node, this.$vm, Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* peelValue */])(attrName, attrName.match(__WEBPACK_IMPORTED_MODULE_2__reg__["a" /* bindRE */])[0]), value);
          /*匹配@以及v-on，绑定事件 */
        } else if (__WEBPACK_IMPORTED_MODULE_2__reg__["d" /* onRE */].test(attrName)) {
          handleEvent(node, this.$vm, Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* peelValue */])(attrName, attrName.match(__WEBPACK_IMPORTED_MODULE_2__reg__["d" /* onRE */])[0]), value);
          // 普通指令 匹配 v-
        } else if (__WEBPACK_IMPORTED_MODULE_2__reg__["c" /* normalDirRE */].test(attrName)) {
          this.distinguishDirective(node, value, Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* peelValue */])(attrName, attrName.match(__WEBPACK_IMPORTED_MODULE_2__reg__["c" /* normalDirRE */])[0]));
        }
        // 删除相应Vue属性
        node.removeAttribute(attrName);
      }
    });
  }

  /**
   * 编译文本，如： {{}}， v-text
   * @param node 需要修改的节点
   * @param exp 已经观察的属性名，此属性名已经剥离了前缀如v-,@ ,: 等等
   */
  compileText(node, exp) {
    createWatcher(node, this.$vm, 'text', exp);
  }

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
  }

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
    node.addEventListener('input', ev => {
      const value = ev.target.value;
      if (value === oldValue) {
        return;
      }
      // 修改代理在 $vm 上的值，然后进行观察
      setProxyVal(this.$vm, exp, value);
      // 更新旧值， 此处因为是闭包，oldValue 不会丢失
      oldValue = value;
    }, false);
  }
};

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
  new __WEBPACK_IMPORTED_MODULE_0__watcher__["a" /* Watcher */](vm, exp, function (value, oldValue) {
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
  exp.forEach(function (k) {
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
  exp.forEach(function (k, i) {
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
const updater = {
  text(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  class(node, value, oldValue) {
    let className = node.className;
    className = className.replace(oldValue, '');
    node.className = `${className ? className.trim() + ' ' : ''}${value}`;
  },
  style(node, value, oldValue) {
    const style = node.style;
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* isPlainObject */])(oldValue)) {
      Object.keys(oldValue).forEach(key => {
        style[key] = '';
      });
    }
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* isPlainObject */])(value)) {
      Object.keys(value).forEach(key => {
        node.style[key] = value[key];
      });
    }
  },
  model(node, value, oldValue) {
    node.value = value === undefined ? '' : value;
  }
};
/* unused harmony export updater */


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Watcher; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dep__ = __webpack_require__(1);

let Watcher = class Watcher {
  constructor(vm, expOrFn, cb) {
    this.$vm = vm;
    this.cb = cb;
    // 创建集合，保存不重复的 订阅者容器 唯一标志符Id
    this.depIds = new Set();
    // 获取数据的函数
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = this.parseGetter(expOrFn);
    }
    // 获取数据
    this.value = this.get();
  }
  get() {
    // 是否添加订阅者的标志
    __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target = this;
    // 一次获取，会执行观察者的get方法，并添加订阅者
    const value = this.getter.call(this.$vm, this.$vm);
    // 清除标志
    __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target = null;
    return value;
  }

  /**
   * 添加订阅者到subs 数组中
   * @param dep 某个观察数据的 订阅者对象
   */
  addDep(dep) {
    const id = dep.id;
    // 防止添加重复的订阅者
    if (!this.depIds.has(id)) {
      // 添加订阅者
      dep.addSub(this);
      this.depIds.add(id);
    }
  }

  /**
   * 通知订阅者，执行回调函数，更新界面
   */
  update() {
    const oldValue = this.value;
    const value = this.get();
    if (oldValue === value) {
      return;
    }
    // 老数据更新
    this.value = value;
    this.cb.call(this.$vm, value, oldValue);
  }

  /**
   * 根据表达式获取getter函数
   * @param exp
   * @returns {Function}
   */
  parseGetter(exp) {
    // 不是合法字符返回
    if (/[^\w.$]/.test(exp)) {
      return;
    }
    // 查分exp成数组
    const exps = exp.split('.');
    // 查询绑定到vm上的data或computed
    return function (obj) {
      // 根据exps遍历 获取绑定到vm的数据， 此时会执行proxy代理的get方法
      for (let i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    };
  }
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*匹配{{}} */
const textRE = /\{\{(.*)\}\}/;
/* harmony export (immutable) */ __webpack_exports__["e"] = textRE;

/*匹配v- */
const normalDirRE = /^v-/;
/* harmony export (immutable) */ __webpack_exports__["c"] = normalDirRE;

/*匹配v-、@以及:*/
const dirRE = /^v-|^@|^:/;
/* harmony export (immutable) */ __webpack_exports__["b"] = dirRE;

/*匹配v-bind以及:*/
const bindRE = /^:|^v-bind:/;
/* harmony export (immutable) */ __webpack_exports__["a"] = bindRE;

/*匹配@以及v-on，绑定事件 */
const onRE = /^@|^v-on:/;
/* harmony export (immutable) */ __webpack_exports__["d"] = onRE;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = observe;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dep__ = __webpack_require__(1);



let Observer = class Observer {
  constructor(value) {
    // 判断是数组
    if (Array.isArray(value)) {
      for (let i = 0, l = value.length; i < l; i += 1) {
        // 实例化观察者对象
        observe(value[i]);
      }
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
};

/**
 * 实例化观察者对象
 * @param value
 * @returns {*}
 */

function observe(value) {
  if (!value || !Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isObject */])(value)) {
    return;
  }
  return new Observer(value);
}

/**
 * 进行数据观察（数据活性）
 * @param obj 数据对象
 * @param key 数据属性key
 * @param value 数据属性值
 */
function defineReactive(obj, key, value) {
  // 获取属性配置
  const property = Object.getOwnPropertyDescriptor(obj, key);
  // 当属性不可配置时，返回
  if (property && property.configurable === false) {
    return;
  }
  // 实例化 当前对象 具体属性的 订阅者容器对象 （即：一个属性 就是 一个dep 对象和一个dep 的subs 订阅者数组容器）
  const dep = new __WEBPACK_IMPORTED_MODULE_1__dep__["a" /* default */]();
  // 判断value是否是对象，并进行观察
  let childOb = observe(value);
  // 定义观察
  Object.defineProperty(obj, key, {
    enumerable: true, // 可以遍历
    configurable: true, // 可以重复定义
    get: () => {
      if (__WEBPACK_IMPORTED_MODULE_1__dep__["a" /* default */].target) {
        // 添加订阅者
        dep.depend();
      }
      return value;
    },
    set: newVal => {
      if (newVal === value) {
        return;
      }
      value = newVal;
      // 新的值是object，再进行监听
      childOb = observe(newVal);
      // 通知订阅者
      dep.notify();
    }
  });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {/**
 * Created by administrato on 2017/6/16.
 */
var path = __webpack_require__(10);
module.exports = {
  entry: "./test.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'js'),
        use: ["babel-loader"]
      },
    ],
  },
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);