let Starry = {}
/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 *
 * query('hello', '?hello=js') 结果是 js
 *
 */
function query (name, querystring) {
  if (!name || !querystring) {
  	return undefined
  }
  if (typeof querystring !== 'string') {
  	return querystring
  }
  let reg = new RegExp('(?:\\?|&)' + name + '=(.*?)(?:&|$)', 'g')
  let ret = reg.exec(querystring) || []
  return ret[1]
}

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
function serialize (data) {
  let ret = []
  if (!data) {
  	return undefined
  }
  if (Object.prototype.toString.call(data) !== '[object Object]') {
  	return data
  }
  Object.keys(data).forEach(k => {
  	ret.push(
  	  encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  	)
  })
  return ret.join('&')
}

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
function $ (selector) {
  if (typeof selector !== 'string') {
  	console.log('selector is not a string')
  	return selector
  }
  let idExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/
  let classExpr = /^(?:\s*(<[\w\W]+>)[^>]*|\.([\w-]*))$/
  if (idExpr.test(selector)) {
    let idMatch = idExpr.exec(selector)
    return document.getElementById(idMatch[2])
  } else if (classExpr.test(selector)) {
    let classMatch = classExpr.exec(selector)
    let allElement = document.getElementsByTagName('*')
    let ClassMatch = []
    for (let i = 0, l = allElement.length; i < l; i++) {
      if (allElement[i].className.match(new RegExp('(\\s|^)' + classMatch[2] + '(\\s|$)'))) {
        ClassMatch.push(allElement[i])
      }
    }
    return ClassMatch
  } else {
    return document.getElementsByTagName(selector)
  }
}

/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

function removeNode (node) {
  if (!node) {
  	return undefined
  } else if (node.nodeType !== 1) {
    return node
  }
  let removeChild = node.parentNode.removeChild(node)
  return removeChild
}

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
function insertAfter (node, target) {
  if (!node || !target) {
  	return undefined
  } else if (node.nodeType !== 1) {
    return node
  } else if (target.nodeType !== 1) {
    return target
  }
  if (target.nextElementSibling) {
  	target.parentNode.insertBefore(node, target.nextElementSibling)
    return target
  } else {
  	target.parentNode.appendChild(node)
    return target
  }
}

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
function addClass (node, className) {
  if (!node || !className) {
  	return undefined
  } else if (node.nodeType !== 1) {
    return node
  }
  if (Object.prototype.toString.call(className) === '[object String]') {
  	node.classList.add(className)
    return node
  } else if (Object.prototype.toString.call(className) === '[object Array]') {
  	className.forEach((item) => {
  		node.classList.add(item)
      return node
  	})
  } else {
  	return className
  }
}

/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
function removeClass (node, className) {
  if (!node || !className) {
  	return undefined
  } else if (node.nodeType !== 1) {
    return node
  }
  if (Object.prototype.toString.call(className) === '[object String]') {
  	node.classList.remove(className)
    return node
  } else if (Object.prototype.toString.call(className) === '[object Array]') {
  	className.forEach((item) => {
  		node.classList.remove(item)
      return node
  	})
  } else {
  	return className
  }
}

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
function getAbsoluteUrl (url) {
  if (typeof url !== 'string') {
    console.log('url is not a string')
    return url
  }
  if (!/^\//g.test(url)) {
  	console.log('url is wrong')
  	return url
  }
  let div = document.createElement('div')
  div.innerHTML = '<a href="./"></a>'
  let href = div.firstChild.href.slice(0, -1)
  console.log(href)

  return href + url
}

/**
 * 创建 debounce 函数
 * @param  {Function} callback
 * @param  {[type]}   time
 */
function debounce (callback, time) {
  if (!callback) {
  	return undefined
  } else if (typeof callback !== 'function') {
  	return callback
  } else if (typeof time !== 'number') {
  	return time
  }
  let timer
  time = time || 300
  return function () {
  	if (!timer) {
  	  timer = setTimeout(() => {
  		callback()
  		clearTimeout(timer)
  		timer = null
  	  }, time)
  	}
  }
}

/**
 * 根据索引移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
function removeItemByIndex (index, arr) {
  if (!index || !arr) {
  	return undefined
  } else if (typeof index !== 'number') {
    console.log('index is not a number')
    return index
  } else if (Object.prototype.toString.call(arr) !== '[object Array]') {
  	console.log('arr is not a array')
  	return arr
  }
  index = index >= 0 ? index : arr.length + index
  arr.splice(index, 1)
  return arr
}


/// addition function
/**
 * 判断变量的类型
 * @param  {[type]} variable 
 * @return {string}          
 */
function judgeType (variable) {
  if (arguments.length === 0) {
      return 'input the variable'
  }
  switch (Object.prototype.toString.call(variable)) 
  {
    case '[object Number]':
      return 'number'
    case '[object Boolean]':
      return 'boolean'
    case '[object String]':
      return 'string'
    case '[object Array]':
      return 'array'
    case '[object Object]':
      return 'object'
    case '[object Function]':
      return 'function'
    case '[object Null]':
      return 'null'
    case '[object Undefined]':
      return 'undefined'
  }
}

/**
 * clone variable
 * @param  {object} obj 
 * @return {object} clone object
 */
function clone (obj) {
  if (arguments.length === 0) {
    return undefined
  }
  let o;
  if (typeof obj === 'object') {
    if (obj === null) {
      o = null;
    } else {
      if (obj instanceof Array) {
        o = [];
        obj.forEach((item) => {
          o.push(clone(item));
        })
      } else {
        o = {};
        for (let key in obj) {
          o[key] = clone(obj[key]);
        }
      }
    }
  } else {
    o = obj;
  }
  return o;
}

/**
 * 数组去重
 * @param  {array} arr 
 * @return {array} res   
 */
function uniqueArray (arr) {
  if (!arr) {
    return undefined
  } else if (Object.prototype.toString.call(arr) !== '[object Array]') {
    return arr
  } else if (arr.some((item) => typeof item === 'object')) {
    return arr
  }
  let obj = {}
  let res = []
  arr.forEach((item) => {
    if (!obj[item]) {
      res.push(item)
      obj[item] = 1
    }
  })
  return res
}

/**
 * 将给定的数字转化为千分位的格式
 * @param  {number} num 
 * @return {string}     
 */
function transformNumToThousandth (num) {
  if (!num) {
    return undefined
  } else if (Object.prototype.toString.call(num) !== '[object Number]') {
    return num
  }
  num = num + ''
  return num.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
}

/**
 * 获取指定范围内的随机数
 * @param  {number} min 
 * @param  {number} max 
 * @return {number}     
 */
function areaRandom (min, max) {
  if (arguments.length <= 1) {
    return undefined
  } else if (Object.prototype.toString.call(min) !== '[object Number]') {
    return min
  } else if (Object.prototype.toString.call(max) !== '[object Number]') {
    return max
  }
  return Math.floor(Math.random()*(max-min+1)) + min
}

// interface
Starry = {
  query: query,
  serialize: serialize,
  $: $,
  removeNode: removeNode,
  insertAfter: insertAfter,
  addClass: addClass,
  removeClass: removeClass,
  getAbsoluteUrl: getAbsoluteUrl,
  debounce: debounce,
  removeItemByIndex: removeItemByIndex,
  judgeType: judgeType,
  clone: clone,
  uniqueArray: uniqueArray,
  transformNumToThousandth: transformNumToThousandth,
  areaRandom: areaRandom
}

module.exports = Starry
