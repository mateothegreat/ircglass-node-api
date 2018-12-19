"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const IRCCommandReplies = __importStar(require("@mateothegreat/irc-command-replies/dist/IRCComandReplies"));
const net = __importStar(require("net"));
exports.CR = '\r\n';
/**
 *
 * @see https://nodejs.org/api/net.html
 *
 */
class Server {
    constructor() {
        this.socket = new net.Socket();
        //
        // Set encoding to get a string instead of buffers on data.
        //
        this.socket.setEncoding('utf8');
        const that = this;
        // this.socket.on('data', this.onData);
        this.socket.on('data', (data) => {
            console.log('DATA:', data);
            const split = data.split('\r\n');
            // console.log(split);
            if (split.length > 0) {
                for (let i = 0; i < split.length; i++) {
                    const matches = split[i].match(/^:(.*?)\s(.*?)\s(.*?)\s(.*?)$/);
                    if (matches) {
                        const match = matches[0];
                        const host = matches[1];
                        const code = parseInt(matches[2]);
                        const target = matches[3];
                        const other = matches[4];
                        if (!isNaN(code) && code != IRCCommandReplies.SERVER_MESSAGE.RPL_MOTD) {
                            // console.log(match);
                            // console.log(host);
                            // console.log(code);
                            // console.log(target);
                            // console.log(other);
                        }
                    }
                }
            }
            if (data.match(/Looking up your hostname/)) {
                this.write('NICK mdizzle9d9');
                this.write('USER mdizzle9d9 0 * :mdiz ull');
            }
            else if (data.match(/^PING/)) {
                const matches = data.match(/PING :(.*)/);
                if (matches && matches.length === 2) {
                    this.write('PONG ' + matches[1]);
                }
            }
        });
        this.socket.on('close', this.onClose);
        this.socket.on('error', this.onError);
        // this.socket.connect(6667, 'localhost', this.onConnected);
        this.socket.connect(6665, 'chat.freenode.net', this.onConnected);
    }
    onConnected() {
        console.log('connection->connected');
    }
    onClose() {
        console.log('connection->closed');
    }
    onError(data) {
        console.log('error', data);
    }
    write(data) {
        console.log('write', data);
        this.socket.write(data + exports.CR);
    }
}
const server = new Server();
//# sourceMappingURL=Server.js.map