"use client";
import React, { useState } from "react";
import CollapseComponent from "./CollapseComponent";
import VideoSection from "./VideoSection";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import agoraInstance from "@/lib/agora";

export default function Main() {
  const [open, setIsOpen] = useState(true);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const session = useSession();

  const joinRoom = async () => {
    try {
      if(session.data?.user?.id) {
        agoraInstance.connectToAgoraRtm(session.data.user.id, "123", setMessages);
      } else {
        toast.error("user not logged in properly, please re-login");
      }
    } catch {
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
          <VideoSection room={room} getRoom={getRoom} />
        </div>
        <CollapseComponent open={open} setIsOpen={setIsOpen} messages={messages} />
      </div>
    </>
  );
}
