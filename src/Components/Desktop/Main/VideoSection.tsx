import ReportPopup from "@/Components/Common/ReportPopup";
import agoraInstance from "@/lib/agora";
import { post } from "@/lib/api";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsExclamationTriangleFill,
  BsFastForwardCircleFill,
  BsMicFill,
  BsMicMuteFill,
  BsPersonFillAdd,
} from "react-icons/bs";

export default function VideoSection({
  isLoading,
  getRoom,
  myVideo,
  themVideo,
  open,
  themUser,
}: {
  isLoading: boolean;
  getRoom: any;
  myVideo?: ICameraVideoTrack;
  themVideo?: IRemoteVideoTrack;
  open: boolean;
  themUser: any;
}) {
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [requestLoading, setRequestLoading] = useState(false);
  const [reporting, setReporting] = useState(false);
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
      <div
        className={`${
          open
            ? "h-[150px] w-[225px] absolute bottom-0 right-0 border border-primary"
            : "h-[70vh] w-[49%]"
        } transition-all duration-200 bg-base-200 rounded-lg z-[1000] order-2`}
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

      <div className={`relative order-1 bg-base-200 rounded-lg h-[70vh] ${!open && 'w-[49%]'} z-[999]`}>
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
          <div className={`absolute top-0 h-[70vh] w-full left-0 flex justify-center items-center z-[10]`}>
            <span className="loading loading-ring loading-md me-2"></span>
            <p>Waiting...</p>
          </div>
        )}

      </div>
      <div className="flex gap-3 mt-5 order-3">
        <ActionButton
          icon={<BsFastForwardCircleFill size={25} />}
          disabled={isLoading}
          func={() => getRoom()}
          tooltipData="skip to next stranger"
        />
        <ActionButton
          icon={
            trackState.video ? (
              <BsCameraVideoFill size={25} />
            ) : (
              <BsCameraVideoOffFill size={25} />
            )
          }
          disabled={isLoading}
          func={() => mute("video")}
          tooltipData="open/close camera"
        />
        <ActionButton
          icon={
            trackState.audio ? (
              <BsMicFill size={25} />
            ) : (
              <BsMicMuteFill size={25} />
            )
          }
          disabled={isLoading}
          func={() => mute("audio")}
          tooltipData="open/close mic"
        />
        <ActionButton
          icon={<BsPersonFillAdd size={25} />}
          func={addFriend}
          tooltipData="add friend"
          disabled={!themUser || isLoading || requestLoading}
        />
        <ActionButton
          icon={<BsExclamationTriangleFill size={25} />}
          func={() => (document.getElementById('my_modal_2') as any)?.showModal()}
          tooltipData="report"
          disabled={!themUser || isLoading || reporting}
        />
      </div>
    </div>
  );
}

function ActionButton({ icon, func, tooltipData, disabled }: any) {
  return (
    <div
      className="tooltip tooltip-bottom tooltip-secondary"
      data-tip={tooltipData}
    >
      <button
        className={`h-[50px] w-[50px] flex justify-center items-center rounded-full border border-base-200 hover:border-primary btn ${
          disabled ? "btn-disabled" : "btn-secondary"
        } p-0`}
        onClick={func}
        disabled={disabled}
      >
        {icon}
      </button>
    </div>
  );
}
