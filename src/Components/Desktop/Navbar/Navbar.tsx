import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

const Navbar = async () => {
  const session = await auth();
  // const location = await (await fetch('https://ipapi.co/json/')).json();
  
  return (
    <div className="navbar bg-base-200 h-[10dvh] px-[10px] lg:px-[60px] py-[20px]">
      <div className="mx-auto w-[100%] max-w-[1400px] flex items-center justify-between">
      <Link href={"/"}>
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        {/* <p>{location.country_name}</p> */}
      </Link>
      <div className="dropdown dropdown-end">
        <div className="flex items-center gap-3">
          <p className="hidden lg:block">Hello {session?.user?.name ? session?.user?.name?.split(" ")[0] : "stranger"}</p>
          {session?.user && <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {session.user.image ? 
                <Image height={70} width={70} alt="profile pic" className="mask mask-circle" src={session?.user?.image} />
              : 
                <div className="avatar placeholder">
                  <div className="bg-base-100 text-neutral-content w-10 rounded-full capitalize">
                    <span className="text-base">{session?.user?.name?.toUpperCase()?.split(" ").map((name: string) => name[0]).join("")}</span>
                  </div>
                </div>
            }
          </div>}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border border-primary z-[10000]"
        >
          <li>
            <Link href={"/profile"} className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <LogoutBtn />
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Navbar;