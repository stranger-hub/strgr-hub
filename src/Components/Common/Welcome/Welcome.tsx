import Link from "next/link";
import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

export default function Welcome({ errorMsg, loading, onRequestPermissions, permissionsGranted }: { errorMsg: string, loading: boolean, onRequestPermissions: any, permissionsGranted: boolean }) {
  return (
    <center>
        <div className="flex flex-col justify-evenly items-center bg-base-200 rounded-lg max-w-3xl px-5 py-10">
            <h1 className="text-3xl">Welcome to <span className="text-primary">StrangerHub!</span> 😄</h1>
            <Link className="text-sm hover:underline hover:text-blue-400 mt-2" href='/about'>stranger.... what?? 🤔</Link>
            {<div className="text-center list-decimal w-[95%] my-12">
                {permissionsGranted
                    ? <p>Allow app to use your camera and microphone so that other participants can see and hear you</p>
                    : <div>
                        <span>Please accept our </span>
                        <Link className="text-sm hover:underline text-blue-400 mt-3" href='/policies'>privacy policy</Link>
                    </div>
                }
            </div>}
            {errorMsg && <div className="rounded-md w-[95%] p-3 flex items-center gap-x-2 text-sm border text-primary bg-primary/15 border-primary mb-12">
                <BsExclamationTriangle className="h-4 w-4" /> {errorMsg}
            </div>}
            <button
                onClick={onRequestPermissions}
                disabled={loading}
                className="btn btn-ghost bg-base-100"
            >
                {loading ? "Please wait" : (permissionsGranted ? "Let's goooo" : "Grant/Check Permissions")}
            </button>
        </div>
    </center>
  );
}
