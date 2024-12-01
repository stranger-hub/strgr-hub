import { User } from "@prisma/client";
import SingleFriend from "./SingleFriend";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { get } from "@/lib/api";
import toast from "react-hot-toast";

export default function Friends() {
  const [tab, setTab] = React.useState(1);
  const [friends, setFriends] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const session = useSession();
  const userId = session.data?.user?.id as string;

  const getFriends = async () => {
    setLoading(true);
    let response;
    
    if(tab === 3) response = await get(`/api/user/friends?receiverId=${userId}`);
    else response = await get(`/api/user/friends?userId=${userId}&type=${tab}`);

    if(response.success) {
      setFriends(response.data);
    } else {
      toast.error('Error fetching friend list 🤔', {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: "friends" 
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if(userId) getFriends();    
  }, [userId, tab]);

  return (
    <div className="bg-base-200 h-[80vh]">
        <div role="tablist" className="tabs tabs-bordered py-3 bg-base-200 h-[6vh]">
            <a role="tab" className={`tab ${tab === 1 && 'tab-active'} pb-2`} onClick={() => setTab(1)}>Friends</a>
            <a role="tab" className={`tab ${tab === 2 && 'tab-active'} pb-2`} onClick={() => setTab(2)}>Requests sent</a>
            <a role="tab" className={`tab ${tab === 3 && 'tab-active'} pb-2`} onClick={() => setTab(3)}>Requests recieved</a>
        </div>

        {loading 
          ? <div className="h-[74vh] flex justify-center items-center">
              <span className="loading loading-ring loading-md me-3"></span>
              <p>Loading...</p>
            </div>
          : friends.length === 0 
            ? <div className="h-[74vh] flex justify-center items-center">
                <p>
                  {tab === 1 ? "Well, it seems like you are an introvert huh? 👀" : "No requests found"}
                </p>
              </div>
            : <div className="h-[74vh] overflow-auto">
                { friends.map(friend => <SingleFriend key={friend.id} user={friend} />) }
              </div>
        }
    </div>
  )
}
