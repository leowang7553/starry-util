# starry-util

* a wrapper common utility function package

## link

* npm-url: [npm](https://www.npmjs.com/package/starry-util)
* git-url: [github](https://github.com/leowang7553/starry-util)

## Installation

You can install with npm:

```
$ npm install starry-util
```

## Usage
```
const Starry = require('Starry-util')
```
or
```
import Starry from 'Starry-util'
```

## Function

### query(name, querystring)
- Function for gets the value of the specified name in the specified querystring
```
Starry.query('hello', '?hello=hi') //return 'hi'
```
<br>

### serialize(data)
- Function for turn the object into a url string
```
Starry.serialize({hello: 'js'}) //return 'hello=js'
```
<br>

### $(selector)
- Function for according to css selector to find DOM (similar to jquery)
```
Starry.$(selector) //return {Dom}
```
<br>

### removeNode(node)
- Function for Deleting DOM node
```
Starry.removeNode(node) //return removed node
```
<br>

### insertAfter(node, target)
- Function for inserting the node after the target node
```
Starry.insertAfter(node, target) //return modified target 
```
<br>

### addClass(node, className)
- Function for add class name to the node 
```
Starry.addClass(node, className) //return modified node
```
<br>

### removeClass(node, className)
- Function for remove class name from the node
- return undefined
```
Starry.removeClass(node, className) //return modified node
```
<br>

### getAbsoluteUrl(url)
- Function for get absolute url
- Return url
```
Starry.getAbsoluteUrl('/hhh') //return 'https://github.com/hhh'
```
<br>

### debounce(callback, time)
- Function for avoiding shake
- Click [here](http://coding.imweb.io/demo/p8/debounce.html) if you want to see the debounce effect
- Example
```
window.addEventListener('scroll', () => { // 普通事件
    console.log('default')
})

var debounce = Starry.debounce(() => { // 创建一个 debounce
    console.log('debounce')
}, 400)
window.addEventListener('scroll', debounce) // debounce 事件
```

### removeItemByIndex(index, arr)
- Function for remove a item from the array
- Index can also be negative (it will remove the item from tail)
```
Starry.removeItemByIndex(-2, [1,2,3]) //return [1,3]
```

### judgeType(variable)
 - Function for judge the type of a variable or a function
 ```
 Starry.judgeType([1]) //return 'array'
 ```
 
 ### clone(obj)
 - Function for clone a variable
 - It will deep copy a object or a array
 ```
 Starry.clone({a:{b:1}}) //return {a:{b:1}}
 ```
 
 ### uniqueArray(arr)
 - Function for unque a array
 ```
 Starry.uniqueArray([1,2,2,3]) // return [1,2,3]
 ```
 
 ### transformNumToThousandth(num)
 - Function for tranform a number to be a number in thousandth
 ```
 Starry.transformNumToThousandth(123456) //return 123,456
 ```
 
 ### areaRandom(min, max)
 - Function for generate a random number (min <= number <= max)
 ```
 Starry.areaRandom(0, 10) //return a random number
 ```

## Other
* jest (you can use jest to test the code)
* main file in js folder
* jest file in test filder
* es5 code in es5 folder
* auto run test case with git hook
