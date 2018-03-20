// Dep 类标识符
let id = 0;
export default class Dep {
  constructor() {
    this.id = ++id;
    // 订阅者容器（subscribers）
    this.subs = [];
  };

  /**
   * 添加订阅者
   * @param sub
   */
  addSub(sub) {
    this.subs.push(sub);
  };
  /*依赖收集，当存在Dep.target的时候添加订阅者对象*/
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  /**
   * 对订阅者进行通知
   */
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
};
// 是否收集的标识
Dep.target = null;
