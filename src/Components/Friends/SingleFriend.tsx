import useWindowSize from "@/hooks/useWindowSize";
import { del, put } from "@/lib/api";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { BsCameraVideoFill } from "react-icons/bs";
import { set } from "zod";

export default function SingleFriend({ user, showFull, tab, setReloadList }: { showFull: boolean; user: User & { reqId: string }; tab: number ; setReloadList: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { width } = useWindowSize();
  const [loading, setLoading] = React.useState(false);

  const connect = () => {
    toast.error("Feature in progress, sorry for the wait 🥺", {
      style: {
        background: '#333',
        color: '#fff',
      },
      id: "feature-in-progress",
    });
  }

  const removeFriend = async () => {
    setLoading(true);
    const response = await del(`/api/user/friends/delete?id=${user.reqId}`);
    if (response.success) {
      toast.success("Friend removed successfully", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: "friend-removed",
      });
      setReloadList((prev) => !prev);
    } else {
      toast.error("An error occurred while removing friend", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: "friend-removed-error",
      });
    }
    setLoading(false);
  }

  const acceptRequest = async () => {
    setLoading(true);
    const response = await put(`/api/user/friends/accept?id=${user.reqId}`, {});
    if (response.success) {
      toast.success("Friend request accepted", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: "friend-request-accepted",
      });
      setReloadList((prev) => !prev);
    } else {
      toast.error("An error occurred while accepting friend request", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: "friend-request-accepted-error",
      });
    }
    setLoading(false);
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
                <Image height={55} width={55} alt="profile pic" className="mask mask-circle" src={user?.image} />
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
            {tab === 3 && <button disabled={loading} className="btn btn-success rounded-lg" onClick={acceptRequest}>
              Accept
            </button>}
            {showFull ? <button disabled={loading} className='btn btn-primary rounded-lg' onClick={removeFriend}>
              Remove
            </button>
            : <button disabled={loading} className="btn btn-ghost rounded-full" onClick={connect}>
              <BsCameraVideoFill size={15} />
            </button>}
          </div>
      </div>
      <hr className="border-base-100" />
    </>
  );
}
