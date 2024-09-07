const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
const appCertificate = process.env.NEXT_PUBLIC_AGORA_APP_CERT!;

class Agora {
    private static agoraInstance: Agora;
    
    static getInstance(): Agora {
        if(!this.agoraInstance) {
            Agora.agoraInstance = new Agora();
        }

        return Agora.agoraInstance;
    }

    async getRtcToken(roomId: string, userId: string) {
        const { RtcRole, RtcTokenBuilder } = await import("agora-access-token");
        const channelName = roomId;
        const account = userId;
        const role = RtcRole.PUBLISHER;
        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        const token = RtcTokenBuilder.buildTokenWithAccount(
            appId,
            appCertificate,
            channelName,
            account,
            role,
            privilegeExpiredTs
        );

        return token;
    }

    async getRtmToken(userId: string) {
        const { RtmTokenBuilder, RtmRole } = await import("agora-access-token");
        const account = userId;
        const role = RtmRole.Rtm_User;
        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const token = RtmTokenBuilder.buildToken(
            appId,
            appCertificate,
            account,
            role,
            privilegeExpiredTs
        )
        return token;
    }
    
    async connectToAgoraRtm(userId: string, roomId: string, token: string, setMessages: any) {
        const { default: AgoraRTM } = await import("agora-rtm-sdk");
        const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_APP_ID as string);
        await client.login({
            uid: userId,
            token,
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
            ]);
        });
        return channel;
    }

    async connectToAgoraRtc(userId: string, roomId: string, token: string, onVideoConnect: any, onWebCamStart: any) {
        const { default: AgoraRTC } = await import("agora-rtc-sdk-ng");
        const client = AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8",
        });
        await client.join(process.env.NEXT_PUBLIC_AGORA_APP_ID as string, roomId, token, userId);
        client.on("user-published", (themUser, mediaType) => {
            client.subscribe(themUser, mediaType).then(() => {
                if(mediaType === "video") {
                    onVideoConnect(themUser.videoTrack);
                }

                // if(mediaType === "audio") {
                //     themUser.audioTrack?.play();
                // }
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