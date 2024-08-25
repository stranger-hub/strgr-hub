import AgoraRTM from "agora-rtm-sdk";

class Agora {
    async connectToAgora({ user, room, setMessages }: any) {
        const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_APP_ID as string);

        await client.login({
            uid: user._id
        });

        const channel = await client.createChannel(room._id);
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

    // public static signalingEngine: any;

    // public async joinChannel({ channelName }: { channelName: string }) {
    //     try {
    //         const subscribeOptions = {
    //           withMessage: true,
    //           withPresence: true, 
    //           withMetadata: true,
    //           withLock: true,
    //         };
    //         await Agora.signalingEngine.subscribe(channelName, subscribeOptions);
    //     } catch (error) {
    //         console.log(error, "error joining channel");
    //         console.log("95f415097d6d4be5bc70ec5ae14f8d24");
            
    //     }
    // }

    // public static async connectToAgora({ user }: any) {
    //     this.signalingEngine = new AgoraRTM.RTM(process.env.NEXT_PUBLIC_AGORA_APP_ID as string, user.id, { token: "" });
    //     try { 
    //         await Agora.signalingEngine.login();
    //     } catch (err) {
    //         console.log({ err }, "error on login");
    //     }
    // }
    
    // public static async logout() {
    //     if(this.signalingEngine) {
    //         try {
    //             this.signalingEngine.logout();
    //         } catch (err) {
    //             console.log({ err }, "error on logout");
    //         }
    //     }
    // }
}

export default Agora;