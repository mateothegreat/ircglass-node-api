import * as IRCCommandReplies from '@mateothegreat/irc-command-replies/dist/IRCComandReplies';
import * as net               from 'net';
import { Socket }             from 'net';

export const CR: string = '\r\n';

/**
 *
 * @see https://nodejs.org/api/net.html
 *
 */
class Server {

    public socket: Socket;

    public constructor() {

        this.socket = new net.Socket();

        //
        // Set encoding to get a string instead of buffers on data.
        //
        this.socket.setEncoding('utf8');

        const that = this;

        // this.socket.on('data', this.onData);
        this.socket.on('data', (data: string) => {

            console.log('DATA:', data);

            const split = data.split('\r\n');
            // console.log(split);

            if (split.length > 0) {

                for (let i = 0; i < split.length; i++) {

                    const matches = split[ i ].match(/^:(.*?)\s(.*?)\s(.*?)\s(.*?)$/);

                    if (matches) {

                        const match = matches[ 0 ];
                        const host = matches[ 1 ];
                        const code = parseInt(matches[ 2 ]);
                        const target = matches[ 3 ];
                        const other = matches[ 4 ];


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

            } else if (data.match(/^PING/)) {

                const matches: string[] = data.match(/PING :(.*)/);

                if (matches && matches.length === 2) {

                    this.write('PONG ' + matches[ 1 ]);

                }

            }

        });
        this.socket.on('close', this.onClose);
        this.socket.on('error', this.onError);

        // this.socket.connect(6667, 'localhost', this.onConnected);
        this.socket.connect(6665, 'chat.freenode.net', this.onConnected);

    }

    private onConnected(): void {

        console.log('connection->connected');

    }

    private onClose(): void {

        console.log('connection->closed');

    }

    private onError(data: string): void {

        console.log('error', data);

    }

    private write(data: string): void {

        console.log('write', data);

        this.socket.write(data + CR);

    }

}

const server: Server = new Server();
