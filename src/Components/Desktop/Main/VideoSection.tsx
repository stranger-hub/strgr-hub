import ReportPopup from "@/Components/Common/ReportPopup";
import useWindowSize from "@/hooks/useWindowSize";
import agoraInstance from "@/lib/agora";
import { post } from "@/lib/api";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ActionButtons from "./ActionButtons";

export default function VideoSection({
  isLoading,
  setOpenMobileChat,
  getRoom,
  myVideo,
  themVideo,
  open,
  themUser,
}: {
  isLoading: boolean;
  setOpenMobileChat: any;
  getRoom: any;
  myVideo?: ICameraVideoTrack;
  themVideo?: IRemoteVideoTrack;
  open: boolean;
  themUser: any;
}) {
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [requestLoading, setRequestLoading] = useState(false);
  const [reporting, setReporting] = useState(false);
  const { width } = useWindowSize();
  const myRef = useRef(null);
  const themRef = useRef(null);
  const session = useSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
    const playerRef = myRef.current;
    if (!myVideo) return;
    if (!playerRef) return;

    myVideo.play(playerRef);
  }, [myRef, myVideo]);

  useEffect(() => {
    const playerRef = themRef.current;
    if (!themVideo) return;
    if (!playerRef) return;

    themVideo.play(playerRef);
  }, [themRef, themVideo]);

  const mute = async (type: "video" | "audio") => {
    if (type === "audio" && agoraInstance.tracks) {
      await agoraInstance.tracks[0].setEnabled(!trackState.audio);
      setTrackState((prev) => {
        return { ...prev, audio: !prev.audio };
      });
    } else if (type === "video" && agoraInstance.tracks) {
      await agoraInstance.tracks[1].setEnabled(!trackState.video);
      setTrackState((prev) => {
        return { ...prev, video: !prev.video };
      });
    }
  };

  const addFriend = async () => {
    setRequestLoading(true);
    const response = await post(`/api/user/friends?senderId=${themUser?.id}&receiverId=${userId}`, {});
    if (response?.success) {
      toast.success("Request sent! 🥳", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: 'friend-req'
      });
    } else {
      toast.error(response?.message ? response?.message : "Something went wrong, please try again later 🤔", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: 'friend-req'
      });
    }
    setRequestLoading(false);
  }

  const report = async (message: string) => {
    setReporting(true);
    const response = await post(`/api/report?reportedId=${themUser?.id}&reporteeId=${userId}`, { message });
    if (response?.success) {
      toast.success("Reported! we will take appropriate actions soon.", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: 'report'
      });
    } else {
      toast.error(response?.message ? response?.message : "Something went wrong, please try again later 🤔", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: 'report'
      });
    }
    setReporting(false);
  }

  return (
    <div className={`relative ${!open && 'flex justify-center items-center flex-wrap gap-[2%]'}`}>
      <ReportPopup report={report} />
      {width > 1000 && <MyVideoComponent width={width} open={open} myRef={myRef} />}

      <div className={`relative order-1 bg-base-200 rounded-lg h-[75dvh] lg:h-[70dvh] ${(!open && width > 1000) ? 'w-[49%]' : 'w-full'} z-[999]`}>
        <div
          ref={themRef}
          className="rounded-lg"
          style={{
            height: "100%",
            width: "100%",
            zIndex: "inherit",
            overflow: "hidden",
          }}
        ></div>
        {!themUser && (
          <div className={`absolute top-0 h-[70dvh] w-full left-0 flex justify-center items-center z-[10]`}>
            <span className="loading loading-ring loading-md me-2"></span>
            <p>Waiting...</p>
          </div>
        )}
        {width <= 1000 && <MyVideoComponent width={width} open={open} myRef={myRef} />}
      </div>
      <ActionButtons 
        isLoading={isLoading}
        setOpenMobileChat={width < 1000 && setOpenMobileChat} 
        getRoom={getRoom} 
        trackState={trackState} 
        mute={mute} 
        addFriend={addFriend} 
        themUser={themUser} 
        requestLoading={requestLoading} 
        reporting={reporting} 
      />
    </div>
  );
}


const MyVideoComponent = ({ width, open, myRef }: any) => {
  const getClassForVideoComponent = () => {
    if (width < 1000) return "h-[22dvh] w-[25vw] absolute bottom-0 right-0 border border-primary"
    if (open) return "h-[25dvh] w-[20vw] absolute bottom-0 right-0 border border-primary"
    return "h-[70dvh] w-[49%]"
  }

  return (
    <div
      className={`${getClassForVideoComponent()} transition-all duration-200 bg-base-200 rounded-lg z-[1000] order-2`}
    >
      <div
        ref={myRef}
        className="rounded-lg z-[1000]"
        style={{
          height: "100%",
          width: "100%",
          zIndex: "inherit",
          overflow: "hidden",
        }}
      ></div>
    </div>
  )
}