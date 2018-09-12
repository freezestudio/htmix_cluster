# 协调服务器

协调服务器负责调度web服务、数据库服务、消息推送服务等。当应用于集群时，还要负责各服务器的负载均衡。
协调服务器是系统对外的接口。
协调服务器将外部的请求，按指定的协议处理并分发到相应的服务（或集群）中。

## 简介

TODO

## 安装与配置

TODO

## 设计

### 协议：`htmix`

|名称|大小(bit)|意义
|-|-|-|
|`version`|4|协议版本号，当前值为`1.0`|
|`auth`|4|是否需要认证:是:`true`,否：`false`|
|`encrypt`|4|加密方式:`0`-未加密，`1`-Base64,`2`-MD5,`3`-AES,`4`-SHA,`5`-其它。|
|`reserve`|4|保留|
|`length`|16|包体的长度，如果为`0`则只有包头，包体为空。否则为包体的长度。|
|`checksum`|8|校验码|
|`protocol`|8|主协议编号，值：`0~255`，`1`-web请求，`2`-数据库请求，`3`-消息请求。|
|`sub-protocol`|16|子协议编号|

备注： `protocol`为`0`，`sub-protocol`为`0`，则发送心跳。保活。

**GET**:

`curl -H 'Htmix-Protocol:xxx' http://localhost/api/require/v1/register?card=xxx&pwd=yyy`

**POST**:

`curl -H 'Htmix-Protocol:xxx;xxxxx' -d 'htmix-data=xxxxxx' http://localhost:3000/require/v1/register`

### 表格：

<table border="1">
<tr>
<th>4</th>
<th>4</th>
<th>4</th>
<th>4</th>
<th>4</th>
<th>4</th>
<th>4</th>
<th>4</th>
</tr>
<tr>
<th>ver</th>
<th>auth</th>
<th>enc</th>
<th>reserse</th>
<th colspan="4">len</th>
</tr>
<tr>
<th colspan="2">cs</th>
<th colspan="2">main</th>
<th colspan="4">sub</th>
</tr>
<tr>
<td colspan="8">body(optional)</td>
</tr>
</table>

### 实现方案：

> 当应用于web服务时：
>
> 1. 将协议头加密并编码为`http`字符，存放在自定义扩展首部字段：`Htmix-Protocol`
> 2. 如果有协议体，`POST`方式时协议体用与协议头相同的加密编码方法，存放于:`htmix-data`
> 3. 默认情况下，经由`/api`路径进入协调服务器。

> 当应用于消息推送时：
> 按TCP常规方式收发。

## 功能简介

### 调度器的工作：

当接收外部请求时：
1. 调度器（按以上协议）解析请求，而后将请求重新封装(此时已经没有了协议)并转发到指定的服务集群中去。
1. 高度负责负载均衡的工作。

当接收到内部返回的响应时：
1. 按照返回的响应，封装到相应的协议中转发给请求的用户。
2. 缓存和日志。

### web服务器的工作：

1. 常规任务。

### 数据库服务的工作：

1. 内部应用按常规任务执行。
1. 外部请求时，以协议的方式提供服务。
1. 考虑加入日志和缓存(redis)。

### 消息推送服务的工作：

基于WebSocket实时服务端消息推送服务。

1. 待定

## 如何参与本项目

TODO

## 许可

MIT