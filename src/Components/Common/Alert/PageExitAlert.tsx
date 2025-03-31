type LeavingDialogProps = {
  url: string;
	openUrl: any;
};

export default function PageExitAlert({ url, openUrl }: LeavingDialogProps) {
  const handleRouting = () => {
		console.log("url", url);
		openUrl.current(url);
	}

  return (
    <>
        <dialog id="alert_modal" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Leaving session...</h3>
            <p className="py-4">You have an active chatting session, do want to exit it?</p>
            <div className="modal-action">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <button className="btn btn-primary" onClick={handleRouting}>Confirm</button>
            </form>
            </div>
        </div>
        </dialog>
    </>
  )
}
