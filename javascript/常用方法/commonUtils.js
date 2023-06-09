/**
 * 生成随机字符串
 * @param {*} hashLength
 * @returns
 */
function createHash(hashLength) {
  if (!hashLength || typeof Number(hashLength) != 'number') {
    return;
  }
  const ar = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const hs = [];
  const hl = Number(hashLength);
  const al = ar.length;
  for (let i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }
  return hs.join('');
}

/**
 * 判断对象是否为空对象
 * @param {*} obj
 * @returns
 */
function isEmptyObject(obj) {
  for (let t in obj) {
    return false;
  }
  return true;
}

/**
 * 简单数据类型值判空
 * @param {*} value
 * @returns
 */
function isPureEmpty(value) {
  if (value === undefined) {
    return true;
  }
  if (value === null) {
    return true;
  }
  if (value === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  return false;
}

/**
 * 字符串模板（简单）
 * @param {*} template
 * @param {*} data
 * @returns
 */
function simpleTemplateRender(template, data) {
  for (const key in data) {
    template = template.replace(
      new RegExp('\\$\\{' + key + '\\}', 'g'),
      data[key]
    );
  }
  return template;
}

/**
 * 字符串模板（通用）
 * @param {*} template
 * @param {*} data
 * @returns
 */
function commonTemplateRender(template, data) {
  function getValueByCondition(obj, condition) {
    return new Function(
      'data',
      'try {return data?.' + condition + '} cache(e){}'
    )(obj);
  }

  return template.replace(/\${\s*([\w\[\]]+)\s*}/g, (all, $1) => {
    return getValueByCondition(data, $1);
  });
}

/**
 * 对象设置属性
 * @param {*} obj
 * @param {*} key
 * @param {*} val
 */
function deepSet(obj, key, val) {
  try {
    if (['number', 'boolean'].includes(typeof val)) {
      eval(`obj.${key} = ${val}`);
    } else if (['object'].includes(typeof val)) {
      eval(`obj.${key} = ${JSON.stringify(val)}`);
    } else {
      eval(`obj.${key} = '${val}'`);
    }
  } catch (e) {
    console.warn(`${key} value ${val} set fail`, e);
  }
}

/**
 * 通过文件流下载文件
 * @param {*} stream 文件流
 * @param {*} name 文件名（不带后缀）
 * @param {*} extension 文件后缀
 * @param {*} type 文件类型
 */
function downloadFile(
  stream,
  name,
  extension = 'xls',
  type = 'application/vnd.ms-excel'
) {
  const blob = new Blob([stream], { type });
  const fileName = `${name}.${extension}`;
  const link = document.createElement('a');
  if ('download' in link) {
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
