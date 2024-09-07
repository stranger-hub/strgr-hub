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

export default function VideoSection({ getRoom, myVideo, themVideo }: any) {
  return (
    <div className="relative">
      <div className="h-[200px] w-[300px] absolute bottom-0 right-0 bg-base-200 border outer border-primary rounded-lg z-1000">
        <VideoPlayer videoTrack={themVideo} />
      </div>
      <div className="bg-base-200 rounded-lg h-[65vh] z-999">
        <VideoPlayer videoTrack={myVideo} />
      </div>
      <div className="flex gap-3 mt-5">
        {/* <ActionButton
          icon={
            cameraOn ? (
              <BsCameraVideoFill size={25} />
            ) : (
              <BsCameraVideoOffFill size={25} />
            )
          }
          func={() => setCameraOn((prev: boolean) => !prev)}
          tooltipData="open/close camera"
        />
        <ActionButton
          icon={micOn ? <BsMicFill size={25} /> : <BsMicMuteFill size={25} />}
          func={() => setMicOn((prev: boolean) => !prev)}
          tooltipData="open/close mic"
        /> */}
        <ActionButton
          icon={<BsFastForwardCircleFill size={25} />}
          func={() => getRoom()}
          tooltipData="skip to next stranger"
        />
        <ActionButton
          icon={<BsPersonFillAdd size={25} />}
          func={() => {}}
          tooltipData="add friend"
        />
      </div>
    </div>
  );
}

function VideoPlayer({
  videoTrack,
}: {
  videoTrack: IRemoteVideoTrack | ICameraVideoTrack;
}) {
  const ref = useRef(null);

  useEffect(() => {
    const playerRef = ref.current;
    if(!videoTrack) return;
    if(!playerRef) return;

    videoTrack.play(playerRef);

    return () => {
      videoTrack.stop();
    };
  }, [videoTrack]);

  return <div ref={ref} style={{ height: "100%", width: "100%", zIndex: "inherit" }}></div>;
}

function ActionButton({ icon, func, tooltipData }: any) {
  return (
    <div
      className="tooltip tooltip-bottom tooltip-secondary"
      data-tip={tooltipData}
    >
      <button
        className="h-[50px] w-[50px] flex justify-center items-center rounded-full border border-base-200 hover:border-primary btn btn-secondary p-0"
        onClick={func}
      >
        {icon}
      </button>
    </div>
  );
}
