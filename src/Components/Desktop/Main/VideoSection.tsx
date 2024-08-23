import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFastForwardCircleFill,
  BsMicFill,
  BsMicMuteFill,
  BsPersonFillAdd,
} from "react-icons/bs";

export default function VideoSection({ room, setRoom }: any) {
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const session = useSession();

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
    <div className="relative">
      <div className="h-[200px] w-[300px] absolute bottom-0 right-0 bg-base-200 border border-primary rounded-lg">
        Your video goes here
      </div>
      <div className="bg-base-200 rounded-lg h-[65vh]">
        othervideo goes here
      </div>
      <div className="flex gap-3 mt-5">
        <ActionButton
          icon={
            cameraOn ? (
              <BsCameraVideoFill size={25} />
            ) : (
              <BsCameraVideoOffFill size={25} />
            )
          }
          func={() => setCameraOn((prev) => !prev)}
          tooltipData="open/close camera"
        />
        <ActionButton
          icon={micOn ? <BsMicFill size={25} /> : <BsMicMuteFill size={25} />}
          func={() => setMicOn((prev) => !prev)}
          tooltipData="open/close mic"
        />
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
