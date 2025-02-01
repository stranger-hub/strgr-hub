"use client";

import React, { useState } from "react";
import Welcome from "@/Components/Common/Welcome/Welcome";
import Main from "@/Components/Desktop/Main/Main";
import {
    MediaPermissionsError,
    MediaPermissionsErrorType,
    requestMediaPermissions
} from 'mic-check';
import { SocketProvider } from "@/app/context/socketContextStore";

export default function MainWrapper() {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openMain, setOpenMain] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const checkPermissions = async () => {
        if(permissionsGranted) {
            setOpenMain(true);
        } else {
            setLoading(true);
            setErrorMsg("");
            requestMediaPermissions()
                .then(() => {
                    setPermissionsGranted(true);
                    setLoading(false);
                })
                .catch((err: MediaPermissionsError) => {
                    const { type, name, message } = err;
                    if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
                        setErrorMsg("Browser does not have permission to access camera or microphone");
                    } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
                        setErrorMsg("User didn't allow app to access camera or microphone");
                    } else if (type === MediaPermissionsErrorType.CouldNotStartVideoSource) {
                        setErrorMsg("Camera is in use by another application or browser tab");
                    } else {
                        setErrorMsg("Something went wrong, please refresh the tab and check browser permissions");
                    }
                    setLoading(false);
                });
        }
    };

    return openMain ? (
        <SocketProvider><Main /></SocketProvider>
    ) : (
        <Welcome errorMsg={errorMsg} loading={loading} onRequestPermissions={checkPermissions} permissionsGranted={permissionsGranted} />
    );
}
