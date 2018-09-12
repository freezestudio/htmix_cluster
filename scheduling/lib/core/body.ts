/**
 * 协议体文件
 * author: freezestudio
 * date: 2018-8-13
 * ver: 2.0
 * 支持添加尾随变长数据
 */


export const tail_placeholder = 4;

export interface PackBodyStruct {
    init(view: ArrayBuffer, tail?: number): void;
    from(view: ArrayBuffer): void;
    length(): number;
}

export class PackBody<T extends PackBodyStruct> {

    protected body: ArrayBuffer;
    constructor(private child: T, private tail_length?: number) {
        this.body = new ArrayBuffer(this.length_with_trailing());
        this.child.init(this.body, this.tail_length);
    }

    get payload() {
        return this.child;
    }

    from(base64_or_array: Uint8Array | string, with_tail = false) {
        if (typeof base64_or_array === 'string') {
            const view = Base64.decode(base64_or_array).split(',');
            if (with_tail) {
                this.tail_length = view.length - this.length() - tail_placeholder;
            }
            this.body = new ArrayBuffer(view.length);
            let buf = new Uint8Array(this.body);
            buf.set(view.map(v => parseInt(v)));
        } else {
            if (with_tail) {
                this.tail_length = base64_or_array.length - this.length() - tail_placeholder;
            }
            this.body = new ArrayBuffer(base64_or_array.length);
            let buf = new Uint8Array(this.body);
            buf.set(base64_or_array);
        }
        this.child.from(this.body);
    }

    to_uint8(): Uint8Array {
        return new Uint8Array(this.body);
    }

    to_base64(): string {
        const view = new Uint8Array(this.body);
        return Base64.encode(view.toString());
    }

    length_with_trailing() {
        if(this.tail_length){
            return this.length() + tail_placeholder + this.tail_length;
        }
        return this.length();
    }

    length() {
        return this.child.length();
    }
}
