import React, { useState } from "react";

export default function ReportPopup({ report }: { report: (message: string) => void }) {
    const [message, setMessage] = useState("")
    return (
        <dialog id="report_modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-semibold text-lg">Please describe your issue here</h3>
                <textarea 
                    className="textarea textarea-bordered w-full max-h-[150px] my-3" 
                    placeholder="Type here"
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                ></textarea>
                <div className="modal-backdrop">
                    <form method="dialog">
                        <button className="btn btn-primary mr-5" onClick={() => report(message)}>Report</button>
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
