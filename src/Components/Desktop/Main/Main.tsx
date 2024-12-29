"use client";
import React, { useEffect, useRef, useState } from "react";
import CollapseComponent from "./CollapseComponent";
import VideoSection from "./VideoSection";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import agoraInstance from "@/lib/agora";
import { getRoom, leaveRoom } from "@/lib/room";
import { RtmChannel } from "agora-rtm-sdk";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { Room, User } from "@prisma/client";
// import { useRouter, usePathname } from "next/navigation";
// import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function Main() {
  const [open, setIsOpen] = useState(true);
  const [room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState([]);
  const [themVideo, setThemVideo] = useState<IRemoteVideoTrack>();
  const [myVideo, setMyVideo] = useState<ICameraVideoTrack>();
  const [themUser, setThemUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const initialized = useRef(false);
  // const router = useRouter();
  // const pathname = usePathname();

  const rtmChannelRef = useRef<RtmChannel>();

  const session = useSession();
  const userId = session.data?.user?.id;
  // const userId = (Math.random() * 1000).toString();

  // useEffect(() => {
  //   if (!initialized.current) {
  //     initialized.current = true;
  //     joinRoom();
  //   }
  // }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => { // delete/update room on leaving
      delete event['returnValue'];
      if (room?.id) {
        leaveRoom(room?.id);
        return false;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [room]);

  const joinRoom = async () => {
    setIsLoading(true);
    setThemUser(null);
    setThemVideo(undefined);
    try {
      if (userId) {
        if(room?.id)  {
          await leaveRoom(room.id); // leave room if already joined one
        }
        const roomResult = await getRoom(); // get room
        if (!roomResult) return;
        setRoom(roomResult);

        const rtcToken = await agoraInstance.getRtcToken(roomResult.id, userId); // token
        const rtmToken = await agoraInstance.getRtmToken(userId);

        rtmChannelRef.current = await agoraInstance.connectToAgoraRtm(userId, roomResult.id, rtmToken, setMessages); // RTM

        await agoraInstance.connectToAgoraRtc( //RTC
          userId,
          roomResult.id,
          rtcToken,
          (themVideo: IRemoteVideoTrack) => setThemVideo(themVideo),
          (myVideo: ICameraVideoTrack) => setMyVideo(myVideo),
          (themUser: any) => setThemUser(themUser),
        );
      } else {
        toast.error("user not logged in properly, please re-login", {
          style: {
            background: '#333',
            color: '#fff',
          },
          id: 'room-join'
        });
      }
    } catch (e: any) {
      console.log("failure reason", e);
      toast.error("error joining room, please try again later", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: 'room-join'
      });
    }
    setIsLoading(false);
  }


  return (
    <>
      <Toaster />
      <div className="flex gap-10 mx-auto max-w-[1400px] h-[80vh]">
        <div className={`transition-all duration-200 w-[100%]`}>
          <VideoSection isLoading={isLoading} getRoom={joinRoom} myVideo={myVideo} themVideo={themVideo} open={open} themUser={themUser} />
        </div>
        <CollapseComponent isLoading={isLoading} open={open} setIsOpen={setIsOpen} messages={messages} channel={rtmChannelRef} setMessages={setMessages} themUser={themUser} />
      </div>
    </>
  );
}
