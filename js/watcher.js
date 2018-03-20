import Dep from './dep';
export class Watcher {
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
    Dep.target = this;
    // 一次获取，会执行观察者的get方法，并添加订阅者
    const value = this.getter.call(this.$vm, this.$vm);
    // 清除标志
    Dep.target = null;
    return value;
  };

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
  };

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
  };

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
    return function(obj) {
      // 根据exps遍历 获取绑定到vm的数据， 此时会执行proxy代理的get方法
      for (let i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    }
  }
}