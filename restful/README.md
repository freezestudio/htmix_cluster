# web服务器


用户接口设计：

restful方案（后期扩展为graphQL）


请求示例：

请求：GET: http://host/request/v1/user_register?id_card=xxx&pwd=xxx
    POST: http://host/request/v1/user_register
          <br/>id_card=
          <br/>pwd=

执行封装：

http://host/request/v1/user_register

GET 请求头： Htmix-Protocol:Base64(protocol include data)
POST 请求头： Htmix-Protocol:Base64(protocol)
body: htmix-data=data

## 用户注册：

请求： http://host/request/v1/user_register

响应：json

```json
{
    // "id_card":"12345619900315341x",
    "status":1,
    "error_code":0,
    "message":"新用户注册成功"
}
```

* `id_card` 身份证号
* `status` 注册状态，0-未登记 1-新用户 2-重复
* `error_code` 0-成功 x-失败 10xxx-web相关 20xxx-数据库相关 30xxx-消息相关
* `message` 详情说明

## 用户登录
