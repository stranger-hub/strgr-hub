"use client";

import React, { useState } from "react";
import Welcome from "@/Components/Common/Welcome/Welcome";
import Main from "@/Components/Desktop/Main/Main";

export default function MainWrapper() {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkPermissions = async () => {
        try {
            setLoading(true);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setPermissionsGranted(true);
            stream.getTracks().forEach((track) => track.stop());
            setLoading(false);
        } catch (error) {
            setPermissionsGranted(false);
        }
    };

    return permissionsGranted ? (
        <Main />
    ) : (
        <Welcome loading={loading} onRequestPermissions={checkPermissions} />
    );
}
