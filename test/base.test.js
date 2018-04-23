const Starry = require('../js/base.js')

// 测试query()函数
describe('test query', () => {
  test('multiple condition input', () => {
    expect(Starry.query('hello', '?hello=test')).toBe('test')
    expect(Starry.query('hello', '?hello=')).toBe('')
    expect(Starry.query('hello', '?hello1=test')).toBe(undefined)
    expect(Starry.query('hello', '?hello=test&hello1=test1')).toBe('test')
    expect(Starry.query('hello', '?hello1=test1&hello=test')).toBe('test')
    expect(Starry.query('hello', '?hello=&hello1=test1')).toBe('')
    expect(Starry.query('hello', '?')).toBe(undefined)
    expect(Starry.query('hello-a', '?hello-a=test')).toBe('test')
    expect(Starry.query('hello/a', '?hello/a=test')).toBe('test')
    expect(Starry.query(123, '?123=test')).toBe('test')
  })

  test('illegal input', () => {
    expect(Starry.query()).toBe(undefined)
    expect(Starry.query('?hello=test')).toBe(undefined)
    expect(Starry.query('hello', 123)).toBe(123)
  })
})

// 测试serialize()函数
describe('test serialize', () => {
  test('multiple condition input', () => {
    expect(Starry.serialize({a: 'test'})).toBe('a=test')
    expect(Starry.serialize({a: 'test', b: 'test1'})).toBe('a=test&b=test1')
    expect(Starry.serialize({1: 'test'})).toBe('1=test')
    expect(Starry.serialize({'a1': 'test'})).toBe('a1=test')
    expect(Starry.serialize({'a-b': 'test'})).toBe('a-b=test')
    expect(Starry.serialize({'a_b': 'test'})).toBe('a_b=test')
  })
  test('illegal input', () => {
    expect(Starry.serialize()).toBe(undefined)
    expect(Starry.serialize(123)).toBe(123)
    expect(Starry.serialize('hello')).toBe('hello')
  })
})

// 测试$()函数
describe('test $()', () => {
  test('multiple condition input', () => {
    document.body.innerHTML = '<div id="test"><p><span class="test-class"></span><a class="test-class"></a></p></div>'
    expect(Starry.$('#test').nodeName.toLowerCase()).toBe('div')
    expect(Starry.$('.test-class')[0].nodeName.toLowerCase()).toBe('span')
    expect(Starry.$('.test-class')[1].nodeName.toLowerCase()).toBe('a')
    expect(Starry.$('a')[0].nodeName.toLowerCase()).toBe('a')
  })
  test('illegal input', () => {
    expect(Starry.$()).toBe(undefined)
    expect(Starry.$(123)).toBe(123)
  })
})

// 测试removeNode()函数
describe('test removeNode()', () => {
  test('remove node which contains childNodes', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    const p = document.getElementById('test')
    expect(Starry.removeNode(p).nodeName.toLowerCase()).toBe('p')
  })
  test('remove second childNode', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    const children = document.getElementsByClassName('test-class')
    expect(Starry.removeNode(children[1]).nodeName.toLowerCase()).toBe('a')
  })
  test('remove first childNode', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    const children = document.getElementsByClassName('test-class')
    expect(Starry.removeNode(children[0]).nodeName.toLowerCase()).toBe('span')
  })
  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="test"><span class="test-class"></span><a class="test-class"></a></p></div>'
    expect(Starry.removeNode()).toBe(undefined)
    expect(Starry.removeNode(123)).toBe(123)
    expect(Starry.removeNode({a: 1})).toEqual({a: 1})
  })
})

// 测试insertAfter()函数
describe('test insertAfter()', () => {
  const span = document.createElement('span')
  span.setAttribute('id', 'insert')

  test('insert node after the node which contains childNodes', () => {
    document.body.innerHTML = '<div><p id="test"></p></div>'
    const p = document.getElementById('test')
    Starry.insertAfter(span, p)
    expect(document.body.innerHTML).toBe('<div><p id="test"></p><span id="insert"></span></div>')
  })
  test('insert node after the last node', () => {
    document.body.innerHTML = '<div><p></p><p id="test"></p></div>'
    const p = document.getElementById('test')
    Starry.insertAfter(span, p)
    expect(document.body.innerHTML).toBe('<div><p></p><p id="test"></p><span id="insert"></span></div>')
  })
  test('insert node after the not last node', () => {
    document.body.innerHTML = '<div><p id="test"></p><p></p></div>'
    const p = document.getElementById('test')
    Starry.insertAfter(span, p)
    expect(document.body.innerHTML).toBe('<div><p id="test"></p><span id="insert"></span><p></p></div>')
  })
  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="test"></p><p></p></div>'
    const p = document.getElementById('test')
    expect(Starry.insertAfter()).toBe(undefined)
    expect(Starry.insertAfter(span)).toBe(undefined)
    expect(Starry.insertAfter(123, 'a')).toBe(123)
    expect(Starry.insertAfter({a: 1}, p)).toEqual({a: 1})
    expect(Starry.insertAfter(span, {b: 2})).toEqual({b: 2})
  })
})

// 测试addClass()函数
describe('test addClass()', () => {
  test('add class by string', () => {
    document.body.innerHTML = '<div><p id="p"></p><p id="p1" class="test"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Starry.addClass(p, 'test-class')
    Starry.addClass(p1, 'test-class')
    expect(p.className).toBe('test-class')
    expect(p1.className).toBe('test test-class')
  })

  test('add class by array', () => {
    document.body.innerHTML = '<div><p id="p"></p><p id="p1" class="test"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Starry.addClass(p, ['test-class1', 'test-class2'])
    Starry.addClass(p1, ['test-class1', 'test-class2'])
    expect(p.className).toBe('test-class1 test-class2')
    expect(p1.className).toBe('test test-class1 test-class2')
  })

  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="p"></p><p class="test"></p></div>'
    const p = document.getElementById('p')
    expect(Starry.addClass()).toBe(undefined)
    expect(Starry.addClass(undefined, 'test-class')).toBe(undefined)
    expect(Starry.addClass({a:1}, 'test-class')).toEqual({a:1})
    expect(Starry.addClass(p)).toBe(undefined)
    expect(Starry.addClass(p, 123)).toBe(123)
  })
})

// 测试removeClass()函数
describe('test removeClass()', () => {
  test('remove class by string', () => {
    document.body.innerHTML = '<div><p id="p" class="test-class"></p><p id="p1" class="test test-class"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Starry.removeClass(p, 'test-class')
    Starry.removeClass(p1, 'test-class')
    expect(p.className).toBe('')
    expect(p1.className).toBe('test')
  })

  test('remove class by array', () => {
    document.body.innerHTML = '<div><p id="p" class="test-class1 test-class2"></p><p id="p1" class="test test-class1 test-class2"></p></div>'
    const p = document.getElementById('p')
    const p1 = document.getElementById('p1')
    Starry.removeClass(p, ['test-class1', 'test-class2'])
    Starry.removeClass(p1, ['test-class1', 'test-class2'])
    expect(p.className).toBe('')
    expect(p1.className).toBe('test')
  })

  test('illegal input', () => {
    document.body.innerHTML = '<div><p id="p"></p><p class="test"></p></div>'
    const p = document.getElementById('p')
    expect(Starry.removeClass()).toBe(undefined)
    expect(Starry.removeClass(undefined, 'test-class')).toBe(undefined)
    expect(Starry.removeClass({a:1}, 'test-class')).toEqual({a:1})
    expect(Starry.removeClass(p)).toBe(undefined)
    expect(Starry.removeClass(p, 123)).toBe(123)
  })
})

// 测试getAbsoluteUrl()函数
describe('test getAbsoluteUrl', () => {
  test('multiple condition input', () => {
    expect(Starry.getAbsoluteUrl('/hello')).toBe('http://imweb.io/hello')
    expect(Starry.getAbsoluteUrl('/hello/hihi')).toBe('http://imweb.io/hello/hihi')
    expect(Starry.getAbsoluteUrl('/hello/hi=a&say=b')).toBe('http://imweb.io/hello/hi=a&say=b')
  })

  test('illegal input', () => {
    expect(Starry.getAbsoluteUrl()).toBe(undefined)
    expect(Starry.getAbsoluteUrl('hello')).toBe('hello')
  })
})

// 测试debounce()
describe('test debounce', () => {
  test('test result accumulation', (done) => {
    let total = 0
    const debounce = Starry.debounce(() => {
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
	    const debounce = Starry.debounce(() => {
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
    expect(Starry.debounce()).toBe(undefined)
    expect(Starry.debounce(1)).toBe(1)
    expect(Starry.debounce('str')).toBe('str')
    expect(Starry.debounce(() => {let total=0}, 'str')).toBe('str')
  })
})

// 测试removeItemByIndex()
describe('test removeItemByIndex', () => {
  test('multiple condition input', () => {
    expect(Starry.removeItemByIndex(1, [1, 2, 3, 4])).toEqual([1, 3, 4])
    expect(Starry.removeItemByIndex(-1, [1, 2, 3, 4])).toEqual([1, 2, 3])
  })

  test('illegal input', () => {
    expect(Starry.removeItemByIndex()).toBe(undefined)
    expect(Starry.removeItemByIndex(1)).toBe(undefined)
    expect(Starry.removeItemByIndex('str', [1, 2])).toBe('str')
    expect(Starry.removeItemByIndex(1, 'str')).toBe('str')
  })
})

// 测试judgeType()
describe('test judgeType', () => {
  test('multiple condition input', () => {
  	let a = function () {console('hello')}
    expect(Starry.judgeType(1)).toBe('number')
    expect(Starry.judgeType('1')).toBe('string')
    expect(Starry.judgeType(true)).toBe('boolean')
    expect(Starry.judgeType([1,2])).toBe('array')
    expect(Starry.judgeType({a:1, b:1})).toBe('object')
    expect(Starry.judgeType(null)).toBe('null')
    expect(Starry.judgeType(undefined)).toBe('undefined')
    expect(Starry.judgeType(a)).toBe('function')
  })

  test('illegal input', () => {
  	expect(Starry.judgeType()).toBe('input the variable')
  })
})

// 测试clone()
describe('test clone', () => {
  test('multiple condition input', () => {
    expect(Starry.clone({a:1,b:2})).toEqual({a:1,b:2})
    expect(Starry.clone({a:1,b:null})).toEqual({a:1,b:null})
    expect(Starry.clone({a:[1,2], b:{c:1,d:2}})).toEqual({a:[1,2], b:{c:1,d:2}})
    expect(Starry.clone([1,2])).toEqual([1,2])
    expect(Starry.clone([{a:1},{b:2}])).toEqual([{a:1},{b:2}])
    expect(Starry.clone(1)).toBe(1)
    expect(Starry.clone('str')).toBe('str')
  })

  test('illegal input', () => {
    expect(Starry.clone()).toBe(undefined)
  })
})

// 测试uniqueArray()
describe('test uniqueArray', () => {
  test('multiple condition input', () => {
    expect(Starry.uniqueArray([1,2,2,3])).toEqual([1,2,3])
    expect(Starry.uniqueArray(['a','b','a'])).toEqual(['a','b'])
  })

  test('illegal input', () => {
    expect(Starry.uniqueArray()).toBe(undefined)
    expect(Starry.uniqueArray(1)).toBe(1)
    expect(Starry.uniqueArray('str')).toBe('str')
    expect(Starry.uniqueArray({a:1})).toEqual({a:1})
    expect(Starry.uniqueArray([{a:1},{a:1}])).toEqual([{a:1},{a:1}])
    expect(Starry.uniqueArray([[1],[2],[1]])).toEqual([[1],[2],[1]])
  })
})

// 测试transformNumToThousandth()
describe('test transformNumToThousandth', () => {
  test('multiple condition input', () => {
    expect(Starry.transformNumToThousandth(123)).toBe('123')
    expect(Starry.transformNumToThousandth(123456)).toBe('123,456')
    expect(Starry.transformNumToThousandth(123456789)).toBe('123,456,789')
  })

  test('illegal input', () => {
    expect(Starry.transformNumToThousandth()).toBe(undefined)
    expect(Starry.transformNumToThousandth('str')).toBe('str')
    expect(Starry.transformNumToThousandth({a:1})).toEqual({a:1})
  })
})

// 测试areaRandom()
describe('test areaRandom', () => {
  test('multiple condition input', () => {
    expect(Starry.areaRandom(10,20)).toBeGreaterThanOrEqual(10)
    expect(Starry.areaRandom(10,20)).toBeLessThanOrEqual(20)
    expect(Starry.areaRandom(0,10)).toBeGreaterThanOrEqual(0)
    expect(Starry.areaRandom(0,10)).toBeLessThanOrEqual(10)
  })

  test('illegal input', () => {
    expect(Starry.areaRandom()).toBe(undefined)
    expect(Starry.areaRandom(1)).toBe(undefined)
    expect(Starry.areaRandom(1,'str')).toBe('str')
    expect(Starry.areaRandom({a:1}, 5)).toEqual({a:1})
  })
})