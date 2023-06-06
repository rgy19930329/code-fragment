const observer = new Observer('test');

observer.on('event1', event1);

observer.off('event1', event1);

function event1(a, b, c) {
  console.log('a', a, 'b', b, 'c', c);
}

observer.trigger('event1', 1, 2, 3);
