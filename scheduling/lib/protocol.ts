/**
 * 协议体
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

/**
 * 包封装指南：
 *  1. 定义主协议编号
 *  2. 定义子协议编号
 *  3. 定义预期的包结构接口
 *  4. 定义实现包结构接口的类并实现自初始化和外部数据初始化逻辑
 * 
 * 类实现注意事项：
 *  1. init()和from()为回调函数，用户不应该调用这2个函数。
 *  2. length()必须是该包的字节长度，需要仔细设计每个字段的长度。   
 */

// 主协议号分段

// web包 0x01~0x20
export const HTMIX_WEB_PACKAGE_MAX = 0x20;
// database包 0x21~0x40
export const HTMIX_DB_PACKAGE_MAX = 0x40;
// 消息包 0x41~0xff
export const HTMIX_MSG_PACKAGE_MAX = 0xff;

//////////////////////////////////////////////////////////////////////
// 用户管理

// 主协议号
export const HTMIX_MAIN_USER_MANAGER = 0x01;

// 子协议号
export const HTMIX_SUB_USER_REGISTER = 0x01;
export const HTMIX_SUB_USER_LOGIN = 0x02;
export const HTMIX_SUB_CHANGE_PASSWORD = 0x03;
export const HTMIX_SUB_USER_CHANGE_NICK_AVATAR = 0x04;
export const HTMIX_SUB_USER_CHANGE_NICK_NAME = 0x05;
export const HTMIX_SUB_USER_CHANGE_MOBILE = 0x06;
export const HTMIX_SUB_USER_CHANGE_UNIT = 0x07;
export const HTMIX_SUB_USER_CHANGE_PART = 0x08;
export const HTMIX_SUB_USER_USERINFO = 0X09;

//////////////////////////////////////////////////////////////////////
// 信息管理

// 主协议号
export const HTMIX_MAIN_INFO_MANAGER = 0x02;

// 子协议号
export const HTMIX_SUB_INFO_NEWS = 0x01;
export const HTMIX_SUB_INFO_TIPS = 0x02;
export const HTMIX_SUB_INFO_STORY_CARTOON = 0x03;
export const HTMIX_SUB_INFO_ALARM = 0x04;

//////////////////////////////////////////////////////////////////////
// 

// 主协议号
export const HTMIX_MAIN_DAILY = 0x04;

// 子协议号
export const HTMIX_SUB_DAILY_LIB = 0x01;
export const HTMIX_SUB_DAILY_KNOWLEDGE = 0x02;

//////////////////////////////////////////////////////////////////////
// 数据库包

// 主协议号
export const HTMIX_MAIN_DATABASE_READ = 0x21;

// 子协议号
export const HTMIX_SUB_DB_READ = 0x01;
export const HTMIX_SUB_DB_WRITE = 0x02;

//////////////////////////////////////////////////////////////////////
// 用户在线状态

// 主协议号
export const HTMIX_MAIN_MSG_USER_STATUS = 0x41;

// 子协议号
// 用户在线
export const HTMIX_SUB_MSG_USER_ONLINE = 0x01;
// 用户离线
export const HTMIX_SUB_MSG_USER_OFFLINE = 0x02;


//////////////////////////////////////////////////////////////////////
// 消息推送包

// 主协议号

// 心跳包
export const HTMIX_MAIN_MSG_HEART = 0x42;
// 通知
export const HTMIX_MAIN_NOTICE = 0x43;
// 
export const HTMIX_MAIN_HANDY = 0x44;

// 子协议号

// 发送心跳包
export const HTMIX_SUB_HEART_SEND = 0x03;
// 接收心跳包
export const HTMIX_SUB_HEART_RECV = 0x04;

// 通知
export const HTMIX_SUB_NOTICE_EXAMINATION = 0x05;
// 通知回执
export const HTMIX_SUB_NOTICE_RECEIPT = 0x06;

// 图片
export const HTMIX_SUB_HANDY_IMAGE = 0x07;
// 处理新进展
export const HTMIX_SUB_HANDY_NEW_MESSAGE = 0x08;
// 某事件已处理
export const HTMIX_SUB_HANDY_FINISH = 0x09;
// 图片片断
export const HTMIX_SUB_HANDY_IMAGE_BODY = 0x0a;
// 接收图片片断信息,本次传输索引号、大小
export const HTMIX_SUB_HANDY_IMAGE_BODY_INFO = 0x0b;
// 服务端回送做好了接收图片的准备工作
export const HTMIX_SUB_HANDY_IMAGE_READY = 0x0c;
// 客户端发送图片片断发送结束
export const  HTMIX_SUB_HANDY_IMAGE_BODY_FINISH = 0x0d;

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//

export const HTMINX_MAIN_USER_EXAMINTION = 0x05;

export const HTMINX_SUB_EXAMINTION_SCORE = 0x01;

