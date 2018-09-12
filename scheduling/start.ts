/**
 * 启动
 * author: freezestudio
 * date: 2081-8-1
 * ver: 1.0
 */

import { request } from "http";
import { 
    create_scheduling_server, 
    SchedulingServer 
} from "./lib/scheduling-server";
import { cluster_config, web_config, ws_config } from "./config";

const scheduling_server = create_scheduling_server({
    host: cluster_config.host,
    port: cluster_config.port,
    // path: cluster_config.path,
});

function init_server(server: SchedulingServer) {
    server.proxy({
        port: web_config.port,
        host: web_config.host,
        // path: web_config.path,
    }, {
            host: ws_config.host,
            port: ws_config.port,
        });
}

function start_server(server: SchedulingServer) {
    server.start();
}

function wait_server_start() {
    const req = request({
        hostname: web_config.host,
        port: web_config.port,
    }, res => {
        console.log(`wait web server start: ${res.statusMessage}`);
        if (res.statusCode === 200) {
            init_server(scheduling_server);
            start_server(scheduling_server);
            clearInterval(to);
        }
    });
    req.on('error', err => {
        console.log(err);
    });
    req.end();
}
const to = setInterval(wait_server_start, 2000);
