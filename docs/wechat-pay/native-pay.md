---
sidebar_position: 4
title: 微信Native支付（扫码支付）
description: 微信原生支付（Native Pay）
keywords: [wx2d,微信,微信小程序,教程,微信支付,原生支付，Native支付,uniapp]
---


## 官方文档

[Native支付](https://pay.weixin.qq.com/static/product/product_intro.shtml?name=native)

## Laf代码

创建函数，函数名为 `native-pay`

```js
import cloud from '@lafjs/cloud'
import crypto from 'crypto'
import axios from 'axios'

const WechatPaySpec = {
  mchid: process.env.WX_PAY_MCHID,
  appid: process.env.WX_PAY_APPID,
  apiV3Key: process.env.WX_PAY_API_V3_KEY,
  certificateSerialNumber: process.env.WX_PAY_CERT_SERIAL_NUMBER,
  privateKey: process.env.WX_PAY_PRIVATE_KEY,
}

export async function main(ctx: FunctionContext) {
  const db = cloud.database()

  // 订单号，可以随机生成
  const trade_order_number = generateOrderNo()

  //  订单金额，单位是分，100 就是 1 元
  const amount = 100

  // build order params
  const order = {
    mchid: WechatPaySpec.mchid,
    appid: WechatPaySpec.appid,
    description: 'payment for ' + trade_order_number,
    out_trade_no: trade_order_number,
    notify_url: `https://xxxxx.com/pay-callback`,//这里写对应的微信支付成功回调地址
    amount: {
      total: amount,
      currency: 'CNY'
    }
  }

  // request payment
  const res = await pay(order)
  console.log(res)

  // save order
  await db.collection('pay_orders').add({
    trade_order_number,
    amount: order.amount,
    state: 'PENDING',
    created_at: new Date()
  })

  return res
}


/**
 * payment request
 */
async function pay(order: any) {
  const timestamp = Math.floor(Date.now() / 1000)
  const nonceStr = crypto.randomUUID()
  const apiUrl = '/v3/pay/transactions/native'
  const signature = createSign(apiUrl, timestamp, nonceStr, order)
  const serialNo = WechatPaySpec.certificateSerialNumber

  const token = `WECHATPAY2-SHA256-RSA2048 mchid="${WechatPaySpec.mchid}",nonce_str="${nonceStr}",timestamp="${timestamp}",signature="${signature}",serial_no="${serialNo}"`
  const headers = { Authorization: token }

  const fullUrl = `https://api.mch.weixin.qq.com${apiUrl}`
  const res = await axios.post(fullUrl, order, {
    headers,
  })

  return res.data
}

/**
 * Sign a wechat payment request
 */
function createSign(apiUrl: string, timestamp: number, nonceStr: string, order: any) {
  const method = 'POST'
  const orderStr = JSON.stringify(order)
  const signStr = `${method}\n${apiUrl}\n${timestamp}\n${nonceStr}\n${orderStr}\n`
  const cert = WechatPaySpec.privateKey
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(signStr)
  return sign.sign(cert, 'base64')
}


function generateOrderNo() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const random = Math.floor(Math.random() * 10000);

  return '' + year + month + day + hour + minute + second + random;
}

```


## 代码解释

### 1. 环境变量取值
首先登录微信商户后台[登录地址](https://pay.weixin.qq.com/)
```js
const WechatPaySpec = {
  mchid: process.env.WX_PAY_MCHID,
  appid: process.env.WX_PAY_APPID,
  apiV3Key: process.env.WX_PAY_API_V3_KEY,
  certificateSerialNumber: process.env.WX_PAY_CERT_SERIAL_NUMBER,
  privateKey: process.env.WX_PAY_PRIVATE_KEY,
}
```
环境变量：`WX_PAY_MCHID`

![native1](img/native-pay/native1.png)

环境变量：`WX_PAY_APPID`，这里没有的话点击`关联AppID`进行关联，这里可以[小程序开通微信支付](/docs/wechat-pay/mini-program-pay))和[公众号开通微信支付](/docs/wechat-pay/offical-accounts-pay)

![native2](img/native-pay/native2.png)

环境变量`WX_PAY_API_V3_KEY`

![native3](img/native-pay/native3.png)


环境变量`WX_PAY_PRIVATE_KEY`，没有的话就新申请，会有一个证书，安全验证后就在刚才目录下有个证书

![native4](img/native-pay/native4.png)

![native6](img/native-pay/native6.png)

![native7](img/native-pay/native7.png)

![native8](img/native-pay/native8.png)

完成认证后会有在上面的证书目录下会生成证书。

![native9](img/native-pay/native9.png)

右键用记事本打开这个文件，然后会有一串`-----BEGIN PRIVATE KEY----- xxxx-----END PRIVATE KEY-----`,这个就是环境变量`WX_PAY_PRIVATE_KEY`

![native10](img/native-pay/native10.png)



环境变量`WX_PAY_CERT_SERIAL_NUMBER`，没有的话就新申请

![native4](img/native-pay/native4.png)

![native5](img/native-pay/native5.png)

最终结果

![native11](img/native-pay/native11.png)

### 2. 运行测试

生成二维码，微信扫描二维码

![native12](img/native-pay/native12.png)

![native13](img/native-pay/native13.png)


## 3. 回调处理

对应代码中的，`notify_url: 'https://xxxxx.com/pay-callback'`

参见[支付回调](/docs/wechat-pay/pay-calllbak)



  
 
 
