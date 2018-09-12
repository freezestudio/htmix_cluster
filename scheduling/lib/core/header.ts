/**
 * 协议头文件
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { Base64 } from 'js-base64';
import { checksum } from './utils';

export class PackHeader {
    private _buffer = new ArrayBuffer(8);
    private _view!: Uint8Array;

    constructor(base64_or_array?: string | number[]) {
        this.init(base64_or_array);
    }

    private init(base64_or_array?: string | number[]) {
        this._view = new Uint8Array(this._buffer);
        if (typeof base64_or_array === 'undefined') {
            this._view[0] = this._view[1] = 1 << 4;
        } else if (typeof base64_or_array === 'string') {
            this.init_base64(base64_or_array);
        } else if (Array.isArray(base64_or_array)) {
            this.init_number_array(base64_or_array);
        }
    }

    private init_base64(base64: string) {
        const arr = Base64.decode(base64).split(',');
        this.init_number_array(arr.map(v => parseInt(v)));
    }

    private init_number_array(arr: number[]) {
        this._view.set(arr);
    }

    /**
     * 从外部数据初始化
     * @param base64_or_array must 8's uint8 type element (value<256)
     * or base64 string.
     */
    static from(base64_or_array: string | number[]) {
        return new PackHeader(base64_or_array);
    }

    to_base64() {
        return Base64.encode(this._view.toString());
    }

    to_uint8() {
        return this._view;
    }

    data() {
        return this._buffer;
    }

    get version() {
        return this._view[0] >> 4;
    }

    get auth() {
        return (this._view[0] & 0x0f) === 1;
    }

    set auth(use: boolean) {
        if (use) {
            this._view.fill((this.version << 4) + 1, 0, 1);
        } else {
            this._view.fill(this.version << 4, 0, 1);
        }
    }

    get encrypt() {
        return this._view[1] >> 4;
    }

    set encrypt(enc: number) {
        if (enc < 0 || enc > 0xf) return;
        this._view.fill(enc << 4, 1, 2);
    }

    get length() {
        return (this._view[2] << 8) | this._view[3];
    }

    set length(len: number) {
        this._view[2] = (len >> 8) & 0xff;
        this._view[3] = len & 0xff;
    }

    get checksum() {
        return this._view[4];
    }

    calc_checksum() {
        this._view.fill(0, 4, 1);
        let sum = checksum(this._view);
        this._view.fill(sum, 4, 5);
    }

    get main_code() {
        return this._view[5];
    }

    set main_code(code: number) {
        if (code < 0 || code > 0xff) return;
        this._view.fill(code, 5, 6);
    }

    get sub_code() {
        return (this._view[6] << 8) | this._view[7];
    }

    set sub_code(code: number) {
        if (code < 0 || code > 0xffff) return;
        this._view[6] = (code >> 8) & 0xff;
        this._view[7] = code & 0xff;
    }
}
