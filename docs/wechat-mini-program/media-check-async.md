---
sidebar_position: 5
title: 小程序音视频内容安全识别
description: 小程序音视频内容安全识别
keywords: [wx2d,微信,微信小程序,教程,音视频内容,安全识别,uniapp]
---


## 官方文档

[文本内容安全识别](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/mediaCheckAsync.html)

## Laf代码

创建函数，函数名为 `wx-utils`

```js
export async function wxCheckMedia(openId: string, mediaUrl: string) {
  let token = await getCachedAccessToken()
  const audit = await cloud.fetch.post(`https://api.weixin.qq.com/wxa/media_check_async?access_token=${token}`, {
    openid: openId,
    media_url: mediaUrl,
    media_type: 2,
    version: 2,
    scene: 1
  });
  //{ errcode: 0, errmsg: 'ok', trace_id: '64dda067-15101756-7980c6cc' }
  console.log('audit', audit.data)
  if (audit.data.errcode === 40001) {
    await delCacheAccessToken()
    return await wxCheckMedia(openId, mediaUrl)
  }
  const db = cloud.database()
  await db.collection('img-check').add({ media_url: mediaUrl, trace_id: audit.data.trace_id, create_time: Date.now() })
  return audit.data.trace_id
}

```


## 代码解释

1. `getCachedAccessToken` 

    参考[获取AccessToken](/docs/wechat-mini-program/access-token)
 
2. 此接口是异步的，结果是通过回调通知的，详情查看[小程序接收消息推送](/docs/wechat-mini-program/msg-notice)