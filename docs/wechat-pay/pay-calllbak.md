---
sidebar_position: 9
title: 服务器接受微信支付回调
description: 接受微信支付回调
keywords: [wx2d,微信,微信小程序,教程,微信支付,原生支付,支付回调,Native支付,uniapp]
---


## Laf代码

前提是你已经完成了支付的下单[微信原生支付](/docs/wechat-pay/native-pay)

创建函数，函数名为 `pay-callback`

```js
import cloud from '@lafjs/cloud'
const crypto = require('crypto')

const WechatPaySpec = {
  mchid: process.env.WX_PAY_MCHID,
  appid: process.env.WX_PAY_APPID,
  apiV3Key: process.env.WX_PAY_API_V3_KEY,
  certificateSerialNumber: process.env.WX_PAY_CERT_SERIAL_NUMBER,
  privateKey: process.env.WX_PAY_PRIVATE_KEY
}


export default async function (ctx: FunctionContext) {
  console.log('支付回传', ctx.body)

  const { event_type, resource } = ctx.body
  if (event_type !== 'TRANSACTION.SUCCESS') {
    return {
      "code": "SUCCESS"
    }
  }
  const result = await decrypt(resource.nonce, resource.ciphertext, resource.associated_data)
  console.log('解密参数', result)
  const decrResult = JSON.parse(result)
  if (decrResult.appid === WechatPaySpec.appid && decrResult.trade_state === 'SUCCESS') {
    //TODO 支付成功，加入自己逻辑
    console.log('支付成功，加入自己逻辑')
  }
  return {
    "code": "SUCCESS"
  }
}


function decrypt(nonce: string, ciphertext: string, associated_data: string) {

  const AUTH_KEY_LENGTH = 16;
  // ciphertext = 密文，associated_data = 填充内容， nonce = 位移
  // 密钥
  const key_bytes = Buffer.from(WechatPaySpec.apiV3Key, 'utf8');
  // 位移
  const nonce_bytes = Buffer.from(nonce, 'utf8');
  // 填充内容
  const associated_data_bytes = Buffer.from(associated_data, 'utf8');
  // 密文Buffer
  const ciphertext_bytes = Buffer.from(ciphertext, 'base64');
  // 计算减去16位长度
  const cipherdata_length = ciphertext_bytes.length - AUTH_KEY_LENGTH;
  // updata
  const cipherdata_bytes = ciphertext_bytes.subarray(0, cipherdata_length);
  // tag
  const auth_tag_bytes = ciphertext_bytes.subarray(cipherdata_length, ciphertext_bytes.length);
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm', key_bytes, nonce_bytes
  );
  decipher.setAuthTag(auth_tag_bytes);
  decipher.setAAD(Buffer.from(associated_data_bytes));

  const output = Buffer.concat([
    decipher.update(cipherdata_bytes),
    decipher.final(),
  ]);
  return output.toString('utf-8')

}

```