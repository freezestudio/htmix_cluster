/**
 * 协调服务器
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import Server, { createProxyServer } from "http-proxy";
import {
    Server as HttpServer,
    createServer,
    ClientRequest,
    IncomingMessage
} from "http";
import { http_header } from "./core/htmix";
import { parse_pack_get } from "./parser";
import { ClusterConfig, WebConfig, WsConfig } from "../config";

type ProxyServer = Server;

export function create_scheduling_server(config: ClusterConfig) {
    return new SchedulingServer(config);
}

export class SchedulingServer {
    private _proxy: ProxyServer;
    private _http: HttpServer | undefined;

    constructor(private config: ClusterConfig) {
        this._proxy = createProxyServer(
            {
                //selfHandleResponse:true, //允许自定义处理响应数据。
                // changeOrigin: true,
            });
        this._proxy.on('proxyReq', this.request_handler);
        this._proxy.on('proxyRes', this.response_handler);
        // this._proxy.on('proxyReqWs', this.request_ws_handler);
    }

    proxy(web: WebConfig, ws?: WsConfig) {
        this._http = createServer((req, res) => {
            this._proxy.web(req, res, {
                target: {
                    port: web.port,
                    host: web.host,
                    // path: web.path,
                },
            });
        });
        if (ws) {
            this._http.on('upgrade', (req, socket, head) => {
                this._proxy.ws(req, socket, head, {
                    target: {
                        host: ws.host,
                        port: ws.port,
                    },
                });
            });
        }
    }

    start() {
        if (this._http) {
            this._http.listen(this.config.port, this.config.host,
                (err: Error) => {
                    // listen start ...
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(
                            `scheduling server http://${this.config.host}:${this.config.port} running ...`
                        );
                    }
                });
        }
    }

    request_handler(proxyReq: ClientRequest,
        req: IncomingMessage) {
        const htmix = <string>req.headers[http_header];
        if (htmix) {
            switch (req.method) {
                case 'GET':
                    //预期GET时的字段值样式为'xxx;yyyy'
                    const head_body = htmix.split(';');
                    parse_pack_get(proxyReq, head_body[0], head_body[1]);
                    break;
                case 'POST':
                    //预期POST时的字段值样式为：
                    //header  'htmix-protocol:<base64 string>'
                    //body    'htmix-data=<base64 string>'
                    // req.setEncoding('utf8');
                    // let data = req.read();
                    // const parsed_string = querystring.parse(data);

                    // parse_pack_post(proxyReq, htmix, parsed_string[send_data]);

                    // let data = '';
                    // req.on('data', chunk => {
                    //     data += chunk;
                    // });
                    // req.on('end', () => {
                    //     const parse = querystring.parse(data);
                    //     parse_pack_post(proxyReq, htmix, parse[send_data]);
                    // });
                    break;
                default:
                    break;
            }
        }
    }

    //向客户端送出数据
    response_handler() {
        // 不建议拦截数据
    }

    request_ws_handler() {
        // 不建议拦截数据
    }
}
