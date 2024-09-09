"use client";
import React, { useEffect, useRef, useState } from "react";
import CollapseComponent from "./CollapseComponent";
import VideoSection from "./VideoSection";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import agoraInstance from "@/lib/agora";
import { RtmChannel } from "agora-rtm-sdk";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";

export default function Main() {
  const [open, setIsOpen] = useState(true);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [themVideo, setThemVideo] = useState<IRemoteVideoTrack>();
  const [myVideo, setMyVideo] = useState<ICameraVideoTrack>();
  const [themUser, setThemUser] = useState<any>();

  useEffect(() => {
    console.log("themUser", themUser);
  }, [themUser]);

  const channelRef = useRef<RtmChannel>();

  const session = useSession();

  const joinRoom = async () => {
    try {
      const userId = session.data?.user?.id;
      if(userId) {
        const rtcToken = await agoraInstance.getRtcToken("123", userId);
        const rtmToken = await agoraInstance.getRtmToken(userId);
        channelRef.current = await agoraInstance.connectToAgoraRtm(userId, "123", rtmToken, setMessages, setThemUser);
        await agoraInstance.connectToAgoraRtc(
          userId, 
          "123",
          rtcToken,
          (themVideo: IRemoteVideoTrack) => setThemVideo(themVideo), 
          (myVideo: ICameraVideoTrack) => setMyVideo(myVideo)
        );
      } else {
        toast.error("user not logged in properly, please re-login");
      }
    } catch(e: any) {
      console.log(e.message);
      toast.error("error joining room, please try again later");
    }
  }

  const getRoom = async () => {
    const res = await fetch("/api/rooms?userId=" + session.data?.user?.id);
    const result = await res.json();
    if(result.success) {
        if(result?.data?.roomId) {
        }
         else {
            const createRes = await fetch("/api/rooms", {
                method: "POST",
            });
            const createResult = await createRes.json();
            console.log("createResult", createResult);
        }
    } else {
        toast.error("something went wrong, please reload and try again");
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex gap-10 h-[80vh]">
        <div className={open ? "w-[60%]" : "w-[100%]"}>
          <VideoSection getRoom={joinRoom} myVideo={myVideo} themVideo={themVideo} />
        </div>
        <CollapseComponent open={open} setIsOpen={setIsOpen} messages={messages} channel={channelRef} setMessages={setMessages} themUser={themUser} />
      </div>
    </>
  );
}
