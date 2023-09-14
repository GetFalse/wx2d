---
sidebar_position: 4
title: 微信小程序文本内容安全识别
description: 微信小程序文本内容安全识别
keywords: [wx2d,微信,微信小程序,教程,文本识别,安全识别,uniapp]
---


## 官方文档

[文本内容安全识别](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/msgSecCheck.html)

## Laf代码

创建函数，函数名为 `wx-utils`

```js
export async function wxCheckText(openId: string, content: string) {
  let token = await getCachedAccessToken()
  const audit = await cloud.fetch.post(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`, {
    openid: openId,
    scene: 2,
    version: 2,
    content: content
  });
  if (audit.data.errcode === 40001) {
    await delCacheAccessToken()
    return await wxCheckText(openId, content)
  }
  if (audit.data.errcode !== 0 || audit.data.result.suggest !== "pass") {
    console.log("wxCheckText", content, audit.data)
  }
  return audit.data.errcode === 0 && audit.data.result.suggest === "pass"
}

```


## 代码解释

1. `getCachedAccessToken` 

    参考[获取AccessToken](/docs/wechat-mini-program/access-token)
 
