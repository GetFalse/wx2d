---
sidebar_position: 3
title: 小程序登录获取openid
description: 微信小程序获取openid
keywords: [微信,微信小程序,教程,openid,微信小程序获取openid,uniapp]
---


## 官方文档

[小程序登录](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html)

## Laf代码

创建函数，函数名为 `wx-utils`

```js
import cloud from '@lafjs/cloud'
const APP_ID = process.env.APP_ID
const APP_SECRET = process.env.APP_SECRET

export async function getWxOpenid(code: string) {
  const res = await cloud.fetch({
    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`,
    method: 'GET'
  })
  //{ session_key: 'B5dvPr9g80Q1zAXZgtZquw==', expires_in: 7200, openid: 'oD3Lz0LqTzTUO5Q-UQfVk_DfC4Qk' }
  return res.data.openid
}

```

## uniapp代码

```js
wx.login({
    success: async res => {
        console.log("code", res)
        const result = await login({
            code: res.code					
        })
        console.log("login", result)
    },
    fail: res => {
        console.log("login fail", res)
    }
});
```

## 代码解释

1. `const APP_ID = process.env.APP_ID`

    process.env是取的Laf的环境变量，具体说明点击查看：[环境变量设置](/docs/laf/env-set)

    APP_ID和APP_SECRET取的是小程序里面的值，具体说明点击查看：[获取AppId和AppSecret](/docs/wechat-mini-program/appid)

2. uniapp的代码，只贴出来核心代码，完整代码查看我开源的uniapp模板小程序项目。[wx2d-uniapp-demo](https://github.com/GetFalse/wx2d-uniapp-demo)
 
