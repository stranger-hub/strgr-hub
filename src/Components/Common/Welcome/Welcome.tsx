import Link from "next/link";
import React from "react";

export default function Welcome({ loading, onRequestPermissions }: { loading: boolean, onRequestPermissions: any }) {
  return (
    <center>
        <div className="flex flex-col justify-evenly items-center bg-base-200 rounded-lg w-[100%] lg:w-[50%] px-5 py-10">
            <h1 className="text-3xl">Welcome to <span className="text-primary">StrangerHub!</span> 😄</h1>
            <Link className="text-sm hover:underline hover:text-blue-400 mt-2" href='/about'>stranger.... what?? 🤔</Link>
            <ul className="text-justify list-decimal mx-10 mt-14 mb-12">
                <li>Please click on the below button to check or grant camera and microphone permissions to continue.</li>
                <li>You will get a popup asking for the permissions. If the popup is not generated then you might have blocked these permissions for our website, please unblock and proceed again</li>
                <li>Click on allow, your browser will try turning your camera on/off for a second only to verify permissions then you will be redirected to our main application.</li>
            </ul>
            <button
                onClick={onRequestPermissions}
                disabled={loading}
                className="btn btn-ghost bg-base-100"
            >
                {loading ? "Please wait" : "Grant/Check Permissions"}
            </button>
            <Link className="text-sm hover:underline hover:text-blue-400 mt-3" href='/policies'>Privacy policy</Link>
        </div>
    </center>
  );
}
