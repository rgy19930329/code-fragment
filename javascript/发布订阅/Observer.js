/**
 * 发布订阅类
 */

export default class Observers {
  id = "";

  onObj = {};

  oneObj = {};

  constructor(id) {
    this.id = id;
  }

  reset() {
    this.onObj = {};
    this.oneObj = {};
  }

  on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  }

  one(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  }

  off(key, fn) {
    const onObjNews = [];
    const oneObjNews = [];
    if (typeof fn === "function") {
      if (Array.isArray(this.onObj[key])) {
        this.onObj[key].forEach((item) => {
          if (item !== fn) {
            onObjNews.push(item);
          }
        });
      }
    }

    if (Array.isArray(this.oneObj[key])) {
      this.oneObj[key].forEach((item) => {
        if (item !== fn) {
          oneObjNews.push(item);
        }
      });
    }

    this.onObj[key] = onObjNews;
    this.oneObj[key] = oneObjNews;
  }

  trigger(key, ...args) {
    if (typeof key !== "string") {
      return;
    }

    if (Array.isArray(this.onObj[key])) {
      this.onObj[key].forEach((item) => {
        item(...args);
      });
    }

    if (Array.isArray(this.oneObj[key]) && this.oneObj[key].length > 0) {
      this.oneObj[key].forEach((item) => {
        item(...args);
        item = undefined;
      });
      this.oneObj[key] = [];
    }
  }
}
