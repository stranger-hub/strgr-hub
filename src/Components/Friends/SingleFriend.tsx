import useWindowSize from "@/hooks/useWindowSize";
import { User } from "@prisma/client";
import Image from "next/image";
import toast from "react-hot-toast";
import { BsCameraVideoFill, BsPersonFillX } from "react-icons/bs";

export default function SingleFriend({ user, showFull, tab = 1 }: { showFull: boolean; user: User; tab: number }) {
  const { width } = useWindowSize();
  const connect = () => {
    toast.error("Feature in progress, sorry for the wait 🥺", {
      style: {
        background: '#333',
        color: '#fff',
      },
      id: "feature-in-progress",
    });
  }

  const removeFriend = () => {

  }

  const truncateName = (name: string | null) => {
    if (!name) return "";
    if (width < 760) {
      return name.slice(0, 16) === name ? name : name.slice(0, 16) + "...";
    } else  if (width < 1000  || !showFull) {
      return name.slice(0, 25) === name ? name : name.slice(0, 25) + "...";
    }
    return name.slice(0, 40) === name ? name : name.slice(0, 40) + "...";
  }

  return (
    <>
      <div className="bg-base-200 rounded-lg p-3 flex items-center justify-between my-1">
          <div className="flex align-center items-center gap-5">
            {user?.image ?
                <Image height={70} width={70} alt="profile pic" className="mask mask-circle" src={user?.image} />
                :
                <div className="avatar placeholder">
                  <div className="bg-base-100 text-neutral-content w-10 rounded-full capitalize">
                    <span className="text-base">{user?.name?.toUpperCase()?.split(" ").map((name: string) => name[0]).join("")}</span>
                  </div>
                </div>
              }
            <p className="truncate">{truncateName(user.name)}</p>
          </div>  
          <div className="flex align-center gap-3">
            {!showFull && <button className="btn btn-ghost rounded-full" onClick={connect}><BsCameraVideoFill size={15} /></button>}
            <button className={`btn ${showFull ? "btn-primary rounded-lg" : "btn-ghost rounded-full"} text-primary" onClick={removeFriend} title="remove friend`}>
              {showFull ? "Remove" : <BsPersonFillX size={15} />}
            </button>
          </div>
      </div>
      <hr className="border-base-100" />
    </>
  );
}
