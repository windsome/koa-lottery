koa-lottery [![NPM version](https://badge.fury.io/js/koa-lottery.png)](http://badge.fury.io/js/koa-lottery) [![Build Status](https://travis-ci.org/windsome/koa-lottery.png?branch=master)](https://travis-ci.org/windsome/koa-lottery) [![Dependencies Status](https://david-dm.org/windsome/koa-lottery.png)](https://david-dm.org/windsome/koa-lottery) [![Coverage Status](https://coveralls.io/repos/windsome/koa-lottery/badge.png)](https://coveralls.io/r/windsome/koa-lottery)
======

获取实时彩票结果的开源API

## 功能列表
+ 重庆时时彩
+ 其他彩票接口

## Installation

```sh
$ npm install koa-lottery
```

## Use with koa

```js
import Lottery from 'koa-lottery';
// init:
var lottery = new Lottery ();
lottery.init ();

// get result:
var result = await lottery.getResultAfterTime (new Date(), 'cqssc');
debug ('cqssc result:', result);

```
备注：token在微信平台的开发者中心申请

## 数据来源
+ 重庆时时彩
   see <http://www.zhcw.com/kj/xndg/cq/ssc/>

## Show cases
### 艺术品挖宝 <http://mp.zdili.com>
### 公众号演示，搜索 "帝利文化"

## 交流群
nodejs开发QQ群： 573207886

## 捐赠
<img src="./219668615.jpg" width="300" height="200" alt="捐赠" align=center />

## License
The MIT license.

## Contributors

