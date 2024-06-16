import React from 'react'
import { BsCameraFill, BsFastForwardCircleFill } from 'react-icons/bs'

export default function VideoSection() {
  return (
    <div className="px-5">
        <div className="bg-base-200 rounded-lg h-[65vh]">
            video goes here
        </div>
        <div className="flex gap-3 mt-5">
            <button className="btn btn-ghost rounded-full bg-base-200">
                <BsCameraFill />
            </button>
            <button className="btn btn-ghost rounded-full bg-base-200">
                <BsFastForwardCircleFill />
            </button>
        </div>
    </div>
  )
}
