const config = require('./service_config.json');

/**
 * 协调服务器配置(部分)属性
 */
export interface ClusterConfig {
    host?: string;
    port?: number;
    path?: string;
}

/**
 * web服务器配置(部分)属性
 */
export interface WebConfig {
    host?: string;
    port?: number;
    path?: string;
}

/**
 * websocket服务器配置(部分)属性
 */
export interface WsConfig {
    host?: string;
    port?: number;
}

/**
 * 数据库服务器配置(部分)属性
 */
export interface MySqlConfig {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
    dateStrings?: boolean;
}

/**
 * 协调服务器地址、端口号配置
 */
export const cluster_config: ClusterConfig = config.cluster;
/**
 * web服务器地址、端口号配置
 */
export const web_config: WebConfig = config.web;
/**
 * websocket服务器地址、端口号配置
 */
export const ws_config: WsConfig = config.ws;
/**
 * 数据库服务器地址、端口号配置
 */
export const mysql_config: MySqlConfig = config.mysql;
