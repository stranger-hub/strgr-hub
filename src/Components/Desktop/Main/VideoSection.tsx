import agoraInstance from "@/lib/agora";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import React, { useEffect, useRef, useState } from "react";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
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
  const myRef = useRef(null);
  const themRef = useRef(null);

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

  return (
    <div className={`relative ${!open && 'flex justify-center items-center flex-wrap gap-[2%]'}`}>
      <div
        className={`${
          open
            ? "h-[150px] w-[225px] absolute bottom-0 right-0 border border-primary"
            : "h-[65vh] w-[49%]"
        } bg-base-200 rounded-lg z-[1000]`}
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

      <div className={`bg-base-200 rounded-lg h-[65vh] ${!open && 'w-[49%]'} z-[999]`}>
        {
          themUser ? 
          <div
            ref={themRef}
            className="rounded-lg"
            style={{
              height: "100%",
              width: "100%",
              zIndex: "inherit",
              overflow: "hidden",
            }}
          >
            {/* {!themVideo?.isPlaying && <BsCameraVideoOffFill color="gray" size={50} className="absolute left-52 top-52" />} */}
          </div>
          : 
          <div className="flex h-[100%] justify-center items-center gap-2">
            <span className="loading loading-ring loading-md"></span>
            <p>Waiting for someone to join...</p>
          </div>
        }
      </div>
      <div className="flex gap-3 mt-5">
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
          func={() => {}}
          tooltipData="add friend"
          disabled={!themVideo || isLoading}
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
