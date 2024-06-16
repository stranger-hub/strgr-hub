import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default function AuthWrapper({
    isPending,
    register,
    children,
}: {
    isPending: boolean;
    register: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-5">
            <Logo rotate={false} />
            <div className="bg-base-200 p-10 rounded-lg text-center">
                <h2 className="font-bold text-2xl">
                    {register ? "REGISTER" : "LOGIN"}
                </h2>
                <p className="mt-5 mb-10 font-semibold">
                    Make a strong introduction to{" "}
                    <span className="text-primary">strangers</span>
                </p>
                {children}
                {/* <hr className="my-10 border-primary" /> */}
                <Providers isPending={isPending} />
                <div className="mt-10 text-sm">
                    {register ? (
                        <p>
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-primary font-semibold">
                                Login
                            </Link>
                        </p>
                    ) : (
                        <p>
                            {"Don't have an account? "}
                            <Link href="/auth/register" className="text-primary font-semibold">
                                Register
                            </Link>
                        </p>
                    )}
                </div>
            </div>
            <Logo rotate={true} />
        </div>
    );
}

function Providers({ isPending }: { isPending: boolean }) {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <div className="grid grid-cols-2 gap-5 mt-10">
            <button className="btn btn-outline col-span-1" disabled={isPending} onClick={() => onClick("google")}>
                <BsGoogle className="h-5 w-5" />
            </button>
            <button className="btn btn-outline col-span-1" disabled={isPending} onClick={() => onClick("github")}>
                <BsGithub className="h-5 w-5" />
            </button>
        </div>
    )
}

function Logo({ rotate }: { rotate: boolean }) {
    return (
        <div className={`h-100 ${rotate && "flex items-end"}`}>
            <Image
                src={rotate ? "/logoVertical2.png" : "/logoVertical.png"}
                alt="logo"
                width={50}
                height={100}
            />
        </div>
    );
}
