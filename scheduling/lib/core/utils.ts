/**
 * 工具文件
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */


// 接收数据包时的头部检验和
// 若检验和为二进制全0，则检验正确。
export function checksum(data: Uint8Array) {
    let sum = 0;
    const length = data.byteLength > 8 ? 8 : data.byteLength;
    for (let i = 0; i < length; ++i) {
        sum += data[i];
    }
    // if (sum > 0xff) {
    //     sum = ~sum;
    //     sum += 0x1;
    // }
    sum &= 0xff;
    sum = ~sum;

    return sum;
}

export function to_string(view: ArrayBuffer, byteOffset: number, length: number) {
    const buf = new Uint8Array(view);
    let char: string[] = [];
    for (let i = byteOffset; i < byteOffset + length;) {
        //1111 0xxx
        //10xx xxxx
        //10xx xxxx
        //10xx xxxx
        if ((buf[i] & 0xf0) === 0xf0) {
            let s = ((buf[i] & 0x07) << 18) |
                ((buf[i + 1] & 0x3f) << 12) |
                ((buf[i + 2] & 0x3f) << 6) |
                ((buf[i + 3]) & 0x3f);
            char.push(String.fromCharCode(s));
            i += 4;
            //1110 xxxx
            //10xx xxxx
            //10xx xxxx
        } else if ((buf[i] & 0xe0) === 0xe0) {
            let s = ((buf[i] & 0x0f) << 12) |
                ((buf[i + 1] & 0x3f) << 6) |
                ((buf[i + 2]) & 0x3f);
            char.push(String.fromCharCode(s));
            i += 3;
            //110x xxxx
            //10xx xxxx
        } else if ((buf[i] & 0xc0) === 0xc0) {
            let s = ((buf[i] & 0x1f) << 6) | ((buf[i + 1]) & 0x3f);
            char.push(String.fromCharCode(s));
            i += 2;
            //0xxx xxxx
        } else {
            //TODO:因未知原因，暂时禁用charCode:0。
            if (buf[i] !== 0) {
                char.push(String.fromCharCode(buf[i]));
            }
            i += 1;
        }
    }
    return char.length === 0 ? '' : char.reduce((p, v) => p + v);
}

export function from_string(str: string) {
    let buf: number[] = [];
    let temp_buf = [];
    const length = str.length;
    for (let i = 0; i < length; ++i) {
        const code = str.charCodeAt(i);
        //1111 0xxx
        //10xx xxxx
        //10xx xxxx
        //10xx xxxx
        if (code > 0x10000) {
            temp_buf = [];
            temp_buf.push((code & 0x3f) | 0x80);
            temp_buf.push(((code >> 6) & 0x3f) | 0x80);
            temp_buf.push(((code >> 12) & 0x3f) | 0x80);
            temp_buf.push(((code >> 18) & 0x07) | 0xf0);
            buf.push(temp_buf.pop()!);
            buf.push(temp_buf.pop()!);
            buf.push(temp_buf.pop()!);
            buf.push(temp_buf.pop()!);
            //1110 xxxx
            //10xx xxxx
            //10xx xxxx
        } else if (code > 0x0800) {
            temp_buf = [];
            temp_buf.push((code & 0x3f) | 0x80);
            temp_buf.push(((code >> 6) & 0x3f) | 0x80);
            temp_buf.push(((code >> 12) & 0x0f) | 0xe0);
            buf.push(temp_buf.pop()!);
            buf.push(temp_buf.pop()!);
            buf.push(temp_buf.pop()!);
            //110x xxxx
            //10xx xxxx
        } else if (code > 0x0080) {
            temp_buf = [];
            temp_buf.push((code & 0x3f) | 0x80);
            temp_buf.push(((code >> 6) & 0x1f) | 0xc0);
            buf.push(temp_buf.pop()!);
            buf.push(temp_buf.pop()!);
            //0xxx xxxx
        } else {
            buf.push(code & 0x7f);
        }
    }
    let view = new Uint8Array(buf);
    return view;
}

// max = 2147483647
export function to_number(view: ArrayBuffer, byteOffset: number, length: number) {
    // 0000 0000  0000 0000  0000 0000  0000 0000
    const pointer = new Uint8Array(view);
    const v0 = pointer[byteOffset + 0] << 24 & 0xff000000;
    const v1 = pointer[byteOffset + 1] << 16 & 0x00ff0000;
    const v2 = pointer[byteOffset + 2] << 8 & 0x0000ff00;
    const v3 = pointer[byteOffset + 3] & 0x000000ff;
    const result = v0 | v1 | v2 | v3;
    return result;

}

// max = 2147483647
export function from_number(num: number) {
    // 0000 0000  0000 0000  0000 0000  0000 0000
    let result = new Uint8Array(4);
    result[0] = (num >> 24) & 0xff;
    result[1] = (num >> 16) & 0xff;
    result[2] = (num >> 8) & 0xff;
    result[3] = (num) & 0xff;
    return result;
}
