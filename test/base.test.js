const Util = require('../js/base.js')

// 测试query()函数
describe('test query', () => {
  test('multiple condition input', () => {
    expect(Util.query('hello', '?hello=test')).toBe('test')
    expect(Util.query('hello', '?hello=')).toBe('')
    expect(Util.query('hello', '?hello1=test')).toBe(undefined)
    expect(Util.query('hello', '?hello=test&hello1=test1')).toBe('test')
    expect(Util.query('hello', '?hello1=test1&hello=test')).toBe('test')
    expect(Util.query('hello', '?hello=&hello1=test1')).toBe('')
    expect(Util.query('hello', '?')).toBe(undefined)
    expect(Util.query('hello-a', '?hello-a=test')).toBe('test')
    expect(Util.query('hello/a', '?hello/a=test')).toBe('test')
    expect(Util.query(123, '?123=test')).toBe('test')
  })

  test('illegal input', () => {
    expect(Util.query()).toBe(undefined)
    expect(Util.query('?hello=test')).toBe(undefined)
    expect(Util.query('hello', 123)).toBe(123)
  })
})

// 测试serialize()函数
describe('test serialize', () => {
  test('multiple condition input', () => {
    expect(Util.serialize({a: 'test'})).toBe('a=test')
    expect(Util.serialize({a: 'test', b: 'test1'})).toBe('a=test&b=test1')
    expect(Util.serialize({1: 'test'})).toBe('1=test')
    expect(Util.serialize({'a1': 'test'})).toBe('a1=test')
    expect(Util.serialize({'a-b': 'test'})).toBe('a-b=test')
    expect(Util.serialize({'a_b': 'test'})).toBe('a_b=test')
  })
  test('illegal input', () => {
    expect(Util.serialize()).toBe(undefined)
    expect(Util.serialize(123)).toBe(123)
    expect(Util.serialize('hello')).toBe('hello')
  })
})

// 测试$()函数
describe('test $()', () => {
  test('multiple condition input', () => {
    document.body.innerHTML = '<div id="test"><p><span class="test-class"></span><a class="test-class"></a></p></div>'
    expect(Util.$('#test').nodeName.toLowerCase()).toBe('div')
    expect(Util.$('.test-class')[0].nodeName.toLowerCase()).toBe('span')
    expect(Util.$('.test-class')[1].nodeName.toLowerCase()).toBe('a')
  })
  test('illegal input', () => {
    expect(Util.$()).toBe(undefined)
    expect(Util.$(123)).toBe(123)
  })
})

// 测试removeNode()函数
describe('test removeNode()', () => {
  test('remove node which contains childNodes', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    const p = document.getElementById('test')
    expect(Util.removeNode(p).nodeName.toLowerCase()).toBe('p')
  })
  test('remove second childNode', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    const children = document.getElementsByClassName('test-class')
    expect(Util.removeNode(children[1]).nodeName.toLowerCase()).toBe('a')
  })
  test('remove first childNode', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    const children = document.getElementsByClassName('test-class')
    expect(Util.removeNode(children[0]).nodeName.toLowerCase()).toBe('span')
  })
  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    expect(Util.removeNode()).toBe(undefined)
    expect(Util.removeNode(123)).toBe(123)
    expect(Util.removeNode({a: 1})).toEqual({a: 1})
  })
})

// 测试insertAfter()函数
describe('test insertAfter()', () => {
  const span = document.createElement('span')
  span.setAttribute('id', 'insert')

  test('insert node after the node which contains childNodes', () => {
    document.body.innerHTML = '<div><p id="test"></p></div>'
    const p = document.getElementById('test')
    Util.insertAfter(span, p)
    expect(document.body.innerHTML).toBe('<div><p id="test"></p><span id="insert"></span></div>')
  })
  test('insert node after the last node', () => {
    document.body.innerHTML = '<div><p></p><p id="test"></p></div>'
    const p = document.getElementById('test')
    Util.insertAfter(span, p)
    expect(document.body.innerHTML).toBe('<div><p></p><p id="test"></p><span id="insert"></span></div>')
  })
  test('insert node after the not last node', () => {
    document.body.innerHTML = '<div><p id="test"></p><p></p></div>'
    const p = document.getElementById('test')
    Util.insertAfter(span, p)
    expect(document.body.innerHTML).toBe('<div><p id="test"></p><span id="insert"></span><p></p></div>')
  })
  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="test"></p><p></p></div>'
    const p = document.getElementById('test')
    expect(Util.insertAfter()).toBe(undefined)
    expect(Util.insertAfter(span)).toBe(undefined)
    expect(Util.insertAfter(123, 'a')).toBe(123)
    expect(Util.insertAfter({a: 1}, p)).toEqual({a: 1})
    expect(Util.insertAfter(span, {b: 2})).toEqual({b: 2})
  })
})

// 测试addClass()函数
describe('test addClass()', () => {
  test('add class by string', () => {
    document.body.innerHTML = '<div><p id="p"></p><p id="p1" class="test"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Util.addClass(p, 'test-class')
    Util.addClass(p1, 'test-class')
    expect(p.className).toBe('test-class')
    expect(p1.className).toBe('test test-class')
  })

  test('add class by array', () => {
    document.body.innerHTML = '<div><p id="p"></p><p id="p1" class="test"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Util.addClass(p, ['test-class1', 'test-class2'])
    Util.addClass(p1, ['test-class1', 'test-class2'])
    expect(p.className).toBe('test-class1 test-class2')
    expect(p1.className).toBe('test test-class1 test-class2')
  })

  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="p"></p><p class="test"></p></div>'
    const p = document.getElementById('p')
    expect(Util.addClass()).toBe(undefined)
    expect(Util.addClass(undefined, 'test-class')).toBe(undefined)
    expect(Util.addClass({a:1}, 'test-class')).toEqual({a:1})
    expect(Util.addClass(p)).toBe(undefined)
    expect(Util.addClass(p, 123)).toBe(123)
  })
})

// 测试removeClass()函数
describe('test removeClass()', () => {
  test('remove class by string', () => {
    document.body.innerHTML = '<div><p id="p" class="test-class"></p><p id="p1" class="test test-class"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Util.removeClass(p, 'test-class')
    Util.removeClass(p1, 'test-class')
    expect(p.className).toBe('')
    expect(p1.className).toBe('test')
  })

  test('remove class by array', () => {
    document.body.innerHTML = '<div><p id="p" class="test-class1 test-class2"></p><p id="p1" class="test test-class1 test-class2"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Util.removeClass(p, ['test-class1', 'test-class2'])
    Util.removeClass(p1, ['test-class1', 'test-class2'])
    expect(p.className).toBe('')
    expect(p1.className).toBe('test')
  })

  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="p"></p><p class="test"></p></div>'
    const p = document.getElementById('p')
    expect(Util.removeClass()).toBe(undefined)
    expect(Util.removeClass(undefined, 'test-class')).toBe(undefined)
    expect(Util.removeClass({a:1}, 'test-class')).toEqual({a:1})
    expect(Util.removeClass(p)).toBe(undefined)
    expect(Util.removeClass(p, 123)).toBe(123)
  })
})

// 测试getAbsoluteUrl()函数
describe('test getAbsoluteUrl', () => {
  test('multiple condition input', () => {
    expect(Util.getAbsoluteUrl('/hello')).toBe('http://imweb.io/hello')
    expect(Util.getAbsoluteUrl('/hello/hihi')).toBe('http://imweb.io/hello/hihi')
    expect(Util.getAbsoluteUrl('/hello/hi=a&say=b')).toBe('http://imweb.io/hello/hi=a&say=b')
  })

  test('illegal input', () => {
    expect(Util.getAbsoluteUrl()).toBe(undefined)
    expect(Util.getAbsoluteUrl('hello')).toBe('hello')
  })
})

// 测试debounce()
describe('test debounce', () => {
  test('test result accumulation', (done) => {
    let total = 0
    const debounce = Util.debounce(() => {
		    total += 1
		    expect(total).toBe(1)
		    done()
    }, 300)
    for (let i = 0; i < 10; i++) {
		    debounce()
    }
    expect(total).toBe(0)
  })

  test('only one parameter input', (done) => {
	    let total = 0
	    const debounce = Util.debounce(() => {
      total += 1
      expect(total).toBe(1)
      done()
	    }, 300)
	    for (let i = 0; i < 10; i++) {
		    debounce()
    }
	    expect(total).toBe(0)
  })

  test('illegal input', () => {
    expect(Util.debounce()).toBe(undefined)
    expect(Util.debounce(1)).toBe(1)
    expect(Util.debounce('str')).toBe('str')
    expect(Util.debounce(() => {let total=0}, 'str')).toBe('str')
  })
})

// 测试removeItemByIndex()
describe('test removeItemByIndex', () => {
  test('multiple condition input', () => {
    expect(Util.removeItemByIndex(1, [1, 2, 3, 4])).toEqual([1, 3, 4])
    expect(Util.removeItemByIndex(-1, [1, 2, 3, 4])).toEqual([1, 2, 3])
  })

  test('illegal input', () => {
    expect(Util.removeItemByIndex()).toBe(undefined)
    expect(Util.removeItemByIndex(1)).toBe(undefined)
    expect(Util.removeItemByIndex('str', [1, 2])).toBe('str')
    expect(Util.removeItemByIndex(1, 'str')).toBe('str')
  })
})

// 测试judgeType()
describe('test judgeType', () => {
  test('multiple condition input', () => {
  	let a = function () {console('hello')}
    expect(Util.judgeType(1)).toBe('number')
    expect(Util.judgeType('1')).toBe('string')
    expect(Util.judgeType(true)).toBe('boolean')
    expect(Util.judgeType([1,2])).toBe('array')
    expect(Util.judgeType({a:1, b:1})).toBe('object')
    expect(Util.judgeType(null)).toBe('null')
    expect(Util.judgeType(undefined)).toBe('undefined')
    expect(Util.judgeType(a)).toBe('function')
  })

  test('illegal input', () => {
  	expect(Util.judgeType()).toBe('input the variable')
  })
})

// 测试clone()
describe('test clone', () => {
  test('multiple condition input', () => {
    expect(Util.clone({a:1,b:2})).toEqual({a:1,b:2})
    expect(Util.clone({a:1,b:null})).toEqual({a:1,b:null})
    expect(Util.clone({a:[1,2], b:{c:1,d:2}})).toEqual({a:[1,2], b:{c:1,d:2}})
    expect(Util.clone([1,2])).toEqual([1,2])
    expect(Util.clone([{a:1},{b:2}])).toEqual([{a:1},{b:2}])
    expect(Util.clone(1)).toBe(1)
    expect(Util.clone('str')).toBe('str')
  })

  test('illegal input', () => {
    expect(Util.clone()).toBe(undefined)
  })
})

// 测试uniqueArray()
describe('test uniqueArray', () => {
  test('multiple condition input', () => {
    expect(Util.uniqueArray([1,2,2,3])).toEqual([1,2,3])
    expect(Util.uniqueArray(['a','b','a'])).toEqual(['a','b'])
  })

  test('illegal input', () => {
    expect(Util.uniqueArray()).toBe(undefined)
    expect(Util.uniqueArray(1)).toBe(1)
    expect(Util.uniqueArray('str')).toBe('str')
    expect(Util.uniqueArray({a:1})).toEqual({a:1})
    expect(Util.uniqueArray([{a:1},{a:1}])).toEqual([{a:1},{a:1}])
    expect(Util.uniqueArray([[1],[2],[1]])).toEqual([[1],[2],[1]])
  })
})

// 测试transformNumToThousandth()
describe('test transformNumToThousandth', () => {
  test('multiple condition input', () => {
    expect(Util.transformNumToThousandth(123)).toBe('123')
    expect(Util.transformNumToThousandth(123456)).toBe('123,456')
    expect(Util.transformNumToThousandth(123456789)).toBe('123,456,789')
  })

  test('illegal input', () => {
    expect(Util.transformNumToThousandth()).toBe(undefined)
    expect(Util.transformNumToThousandth('str')).toBe('str')
    expect(Util.transformNumToThousandth({a:1})).toEqual({a:1})
  })
})

// 测试areaRandom()
describe('test areaRandom', () => {
  test('multiple condition input', () => {
    expect(Util.areaRandom(10,20)).toBeGreaterThanOrEqual(10)
    expect(Util.areaRandom(10,20)).toBeLessThanOrEqual(20)
    expect(Util.areaRandom(0,10)).toBeGreaterThanOrEqual(0)
    expect(Util.areaRandom(0,10)).toBeLessThanOrEqual(10)
  })

  test('illegal input', () => {
    expect(Util.areaRandom()).toBe(undefined)
    expect(Util.areaRandom(1)).toBe(undefined)
    expect(Util.areaRandom(1,'str')).toBe('str')
    expect(Util.areaRandom({a:1}, 5)).toEqual({a:1})
  })
})