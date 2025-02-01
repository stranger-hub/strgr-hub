import { useSearchParams } from "next/navigation";
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";

export default function FormToast({ error, msg }: { error?: boolean, msg?: string }) {
    const searchParam = useSearchParams();
    const urlError = searchParam.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";

    if (msg || urlError) {
        return (
            <div className={`rounded-md p-3 flex items-center gap-x-2 text-sm border ${error || urlError ? "text-primary bg-primary/15 border-primary" : "border-emerald-500 text-emerald-500 bg-emerald-500/15"}`}>
                {error || urlError ? <BsExclamationTriangle className="h-4 w-4" /> : <BsCheckCircle className="h-4 w-4" />}
                <p>{msg || urlError}</p>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}
