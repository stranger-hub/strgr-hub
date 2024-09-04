import AgoraRTM from "agora-rtm-sdk";
import AgoraRTC from "agora-rtc-sdk-ng";


class Agora {
    private static agoraInstance: Agora;
    
    static getInstance(): Agora {
        if(!this.agoraInstance) {
            Agora.agoraInstance = new Agora();
        }

        return Agora.agoraInstance;
    }
    
    async connectToAgoraRtm(userId: string, roomId: string, setMessages: any) {
        const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_APP_ID as string);
        await client.login({
            uid: userId
        });

        const channel = await client.createChannel(roomId);
        await channel.join();
        channel.on("ChannelMessage", (message, userId) => {
            console.log(message, userId);
            setMessages((prev: any[]) => [
                ...prev,
                {
                    userId,
                    message: message.text,
                }
            ])
        });
        // push your messages in this state, to differentiate, just compare userId with your userId

        // send message logic
        await channel.sendMessage({
            text: "some message"
        })
        return channel;
    }

    async connectToAgoraRtc({ userId, roomId, onVideoConnect, onWebCamStart }: { userId: string, roomId: string, onVideoConnect: any, onWebCamStart: any }) {
        const client = AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8",
        });
        await client.join(process.env.NEXT_PUBLIC_AGORA_APP_ID as string, roomId, null, userId);
        client.on("user-published", (themUser, mediaType) => {
            client.subscribe(themUser, mediaType).then(() => {
                if(mediaType === "video") {
                    onVideoConnect(themUser);
                }

                if(mediaType === "audio") {
                    themUser.audioTrack?.play();
                }
            })
        });

        const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        onWebCamStart(tracks[1]);
        await client.publish(tracks);

        return { tracks, client };
    }
}

const agoraInstance: Agora = Agora.getInstance();
export default agoraInstance;