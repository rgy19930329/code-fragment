/**
 * 数据存储类
 */

export default class Store {
  id = '';

  store = {};

  onObj = {};

  constructor(id) {
    this.id = id;
  }

  clear() {
    this.store = {};
    for (let key in this.onObj) {
      if (Array.isArray(this.onObj[key])) {
        this.onObj[key].forEach((item) => {
          item({ type: 'remove', value: undefined, store: this.store });
        });
      }
    }
  }

  get(key) {
    return key ? this.store[key] : this.store;
  }

  set(key, value) {
    console.log('store.set', key, value);
    this.store[key] = value;
    // 执行 on 监听中的回调方法
    if (Array.isArray(this.onObj[key])) {
      this.onObj[key].forEach((item) => {
        item({ type: 'set', value, store: this.store });
      });
    }
  }

  remove(key) {
    console.log('store.remove', key);
    delete this.store[key];
    // 执行 on 监听中的回调方法
    if (Array.isArray(this.onObj[key])) {
      this.onObj[key].forEach((item) => {
        item({ type: 'remove', value: undefined, store: this.store });
      });
    }
  }

  on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }
    this.onObj[key].push(fn);
  }

  off(key, fn) {
    const onObjNews = [];
    if (Array.isArray(this.onObj[key])) {
      this.onObj[key].forEach((item) => {
        if (item !== fn) {
          onObjNews.push(item);
        }
      });
    }
    this.onObj[key] = onObjNews;
  }
}
