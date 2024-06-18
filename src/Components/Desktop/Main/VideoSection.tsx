import React, { useState } from 'react'
import { BsCameraVideoFill, BsCameraVideoOffFill, BsFastForwardCircleFill } from 'react-icons/bs'

export default function VideoSection() {
    const [cameraOn, setCameraOn] = useState(false);
  return (
    <div className="relative">
        <div className="h-[200px] w-[300px] absolute bottom-0 right-0 bg-base-200 border border-primary rounded-lg">Your video goes here</div>
        <div className="bg-base-200 rounded-lg h-[65vh]">
            othervideo goes here
        </div>
        <div className="flex gap-3 mt-5">
            <ActionButton icon={cameraOn ? <BsCameraVideoFill size={25} /> : <BsCameraVideoOffFill size={25} />} func={() => setCameraOn(prev => !prev)} tooltipData="open/close camera" />
            <ActionButton icon={<BsFastForwardCircleFill size={25} />} func={() => {}} tooltipData="skip to next stranger" />
        </div>
    </div>
  )
}

function ActionButton({ icon, func, tooltipData }: any) {
    return (
        <div className="tooltip tooltip-bottom tooltip-secondary" data-tip={tooltipData}>
            <button className="h-[50px] w-[50px] flex justify-center items-center rounded-full border border-base-200 hover:border-primary btn btn-secondary p-0" onClick={func}>
                {icon}
            </button>
        </div>
    )
}