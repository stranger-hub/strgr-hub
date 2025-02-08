"use client";
import { get } from '@/lib/api';
import { User } from "@prisma/client";
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SingleFriend from './SingleFriend';

export default function FriendsTabList({ userId, showFull, isMobile }: { userId: string, showFull: boolean, isMobile?: boolean }) {
	const [tab, setTab] = React.useState(1);
  const [friends, setFriends] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const loaderHeight = isMobile? 'h-[50dvh]' : showFull ? 'h-[60dvh]' : 'h-[63dvh]';
  const height = isMobile ? 'h-[57dvh]' : showFull ? '' : 'h-[72dvh]';

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
  
  React.useEffect(() => {
    if(userId) getFriends();    
  }, [userId, tab]);

  return (
    <>
      <Toaster />
      {showFull ? <div role="tablist" className="tabs tabs-bordered pt-3 h-[6dvh] mb-5">
          <a role="tab" className={`tab ${tab === 1 && 'tab-active'} pb-2`} onClick={() => setTab(1)}>Friends</a>
          <a role="tab" className={`tab ${tab === 2 && 'tab-active'} pb-2`} onClick={() => setTab(2)}>Requests sent</a>
          <a role="tab" className={`tab ${tab === 3 && 'tab-active'} pb-2`} onClick={() => setTab(3)}>Requests recieved</a>
      </div> : <p className='flex items-center h-[8dvh] text-lg font-semibold p-4 pt-7 md:pt-5 '>Connect with friends</p>}
      {loading 
        ? <div className={`${loaderHeight} flex justify-center items-center`}>
            <span className="loading loading-ring loading-md me-3"></span>
            <p>Loading...</p>
          </div>
        : friends.length === 0 
          ? <div className={`${loaderHeight} flex justify-center items-center`}>
              <p>
                {tab === 1 ? "No friends found 😓" : "No requests found"}
              </p>
            </div>
          : <div className={`${height} overflow-auto`}>
              { friends.map(friend => <SingleFriend showFull={showFull} key={friend.id} user={friend} tab={tab} />) }
            </div>
      }
    </>
  )
}
