const store = new Store('test');

store.on('name', onNameChange);

store.off('name', onNameChange);

function onNameChange({ type, value }) {
  console.log('type', type, 'value', value);
}

store.set('name', 'rgy');

store.set('age', 20);

store.get(); // 返回全部

store.get('age'); // 返回指定字段