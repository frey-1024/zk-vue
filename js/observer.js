import { isObject } from './util';
import Dep from './dep';

class Observer {
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
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

/**
 * 实例化观察者对象
 * @param value
 * @returns {*}
 */
export function observe(value) {
  if (!value || !isObject(value) ) {
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
    return
  }
  // 实例化 当前对象 具体属性的 订阅者容器对象 （即：一个属性 就是 一个dep 对象和一个dep 的subs 订阅者数组容器）
  const dep = new Dep();
  // 判断value是否是对象，并进行观察
  let childOb = observe(value);
  // 定义观察
  Object.defineProperty(obj, key, {
    enumerable: true, // 可以遍历
    configurable: true, // 可以重复定义
    get: () => {
      if (Dep.target) {
        // 添加订阅者
        dep.depend();
      }
      return value;
    },
    set: (newVal) => {
      if (newVal === value) {
        return;
      }
      value = newVal;
      // 新的值是object，再进行监听
      childOb = observe(newVal);
      // 通知订阅者
      dep.notify();
    }
  })
}