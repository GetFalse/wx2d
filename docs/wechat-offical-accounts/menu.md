---
sidebar_position: 99
title: 微信公众号自定义菜单
description: 微信公众号设置自定义菜单
keywords: [wx2d,微信公众号,自定义菜单,教程]
---

## 微信官方文档地址

[自定义菜单](https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html)


## LAF对应代码

```js
import cloud from '@lafjs/cloud'
import { getCachedAccessToken } from '@/wx-utils'


export default async function (ctx: FunctionContext) {
  // 设置菜单
  await setMenu(menu)
  // 打印当前菜单
  console.log(await getMenu())

}

const menu = {
  button: [
    {
      name: "🤖AI工具",
      sub_button: [
        {
          type: "miniprogram",
          name: "xx",
          url: "http://mp.weixin.qq.com",
          appid: "xx",
          pagepath: "pages/index/index"
        },
        {
          type: "miniprogram",
          name: "xx",
          url: "http://mp.weixin.qq.com",
          appid: "xx",
          pagepath: "pages/index/index"
        }]
    },
    {
      type: "miniprogram",
      name: "xx",
      url: "http://mp.weixin.qq.com",
      appid: "xx",
      pagepath: "pages/index/index"
    }
  ]
}


// 获取公众号菜单
async function getMenu() {
  const access_token = await getCachedAccessToken()
  const res = await cloud.fetch.get(`https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=${access_token}`)
  return res.data
}

// 设置公众号菜单
export async function setMenu(menu) {
  const access_token = await getCachedAccessToken()
  const res = await cloud.fetch.post(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`, menu)
  console.log("setting success", res.data)
  return res.data
}



```

## 代码解释

  1、`menu`对象具体还有哪些属性，参考官方文档

  2、`import { getCachedAccessToken } from '@/wx-utils'` 此方法是引入了云函数，wx-utils封装了获取AccessToken的方法，具体代码查看 [获取AccessToken](/docs/wechat-offical-accounts/access-token)




## 常见错误

1、这个错误是公众号菜单里面设置了跳转小程序，但公众号没关联相关小程序，查看 [公众号关联小程序](/docs/wechat-offical-accounts/related)

```json
{
  errcode: 45064,
  errmsg: 'no permission to use weapp in menu rid: 64f1ff19-4d899623-10ff4842'
}
```

2、这个错误是name值太长了
```json
{
  errcode: 40018,
  errmsg: 'invalid button name size rid: 64f2cd30-7ac253cd-5ea1091d'
}
```