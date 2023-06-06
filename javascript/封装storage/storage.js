/**
 * localStorage & sessionStorage 操作封装
 */

const createStorage = (storage) => {
  const set = (key, value) => {
    value = typeof value === 'object' ? JSON.stringify(value) : value;
    storage.setItem(key, value);
  };

  const get = (key) => {
    let value = storage.getItem(key);
    try {
      if (JSON.parse(value) === Number(value)) {
        return value;
      }
      value = JSON.parse(value);
    } catch (e) {
      return value;
    }
    return value;
  };

  const remove = (key) => {
    storage.removeItem(key);
  };

  const clear = () => {
    storage.clear();
  };

  return {
    set,
    get,
    remove,
    clear,
  };
};

const local_storage =
  typeof window !== 'undefined' && createStorage(window.localStorage);
const session_storage =
  typeof window !== 'undefined' && createStorage(window.sessionStorage);

export default { local_storage, session_storage };
