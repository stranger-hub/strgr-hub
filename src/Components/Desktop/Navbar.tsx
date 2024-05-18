import Image from "next/image";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";

export default function Navbar() {
  const user = { name: "stranger" };

  return (
    <div className="navbar bg-base-200 h-[10vh] px-[60px] py-[20px]">
      <Link href={"/"} className="flex-1">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </Link>
      <div className="dropdown dropdown-end">
        <div className="flex items-center gap-3">
          <p>Hello {user?.name}</p>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <BsPersonCircle size={30} color="#E84644" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-primary"
        >
          <li>
            <Link href={"/profile"} className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
