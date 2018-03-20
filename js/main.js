import { Compile } from './compile';
import { observe } from './observer';
import { isPlainObject } from "./util";

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
    this._data = typeof data === 'function'
      ? getData(data, this)
      : data || {};

    this._computed = this.$options.computed;
    // 初始化data
    this._initData();
    // 初始化计算
    this._initComputed();
    // 观察数据
    observe(this._data);
    // 处理DOM
    new Compile(this.$options.el, this);
  },
  _initData() {
    Object.keys(this._data).forEach((key) => {
      proxy(this, '_data', key);
    });
  },
  _initComputed() {
    const computed = this._computed;
    // 普通对象
    if (computed && isPlainObject(computed)) {
      // 遍历computed
      Object.keys(computed).forEach((key) => {
        const getter = typeof computed[key] === 'function'
          ? computed[key]
          : computed[key].get;
        proxy(this, '_computed', key, getter, function() {});
      });
    }
  }
};

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: function() {},
  set: function() {},
};
/*通过proxy函数将_data上面的数据代理到vm上，这样就可以用app.text代替app._data.text了。*/
export function proxy (vm, sourceKey, key, getter, setter) {
  // 如果执行get方法，那么就会执行相应的观察者中的get方法
  sharedPropertyDefinition.get = getter || function proxyGetter () {
    return vm[sourceKey][key]
  };
  sharedPropertyDefinition.set = setter || function proxySetter (val) {
    vm[sourceKey][key] = val
  };
  // 观察
  Object.defineProperty(vm, key, sharedPropertyDefinition)
}

function getData (data, vm) {
  try {
    return data.call(vm);
  } catch (e) {
    return {};
  }
}

export default Vue;