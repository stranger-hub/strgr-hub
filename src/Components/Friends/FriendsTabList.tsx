"use client";
import { get } from '@/lib/api';
import { User } from "@prisma/client";
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SingleFriend from './SingleFriend';

type unifiedType = User & { reqId: string };

export default function FriendsTabList({ userId, showFull, isMobile }: { userId: string, showFull: boolean, isMobile?: boolean }) {
	const [tab, setTab] = React.useState(1);
  const [friends, setFriends] = React.useState<unifiedType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [reloadList, setReloadList] = React.useState(false);
  const loaderHeight = isMobile? 'h-[50dvh]' : showFull ? 'h-[60dvh]' : 'h-[63dvh]';
  const height = isMobile ? 'h-[57dvh]' : showFull ? '' : 'h-[72dvh]';

  const getFriends = async () => {
    setLoading(true);
    let response;
    
    if(tab === 3) response = await get(`/api/user/friends?receiverId=${userId}`);
    else response = await get(`/api/user/friends?userId=${userId}&type=${tab}`);

    if(response.success) {
      switch (tab) {
        case 1:
          setFriends(response.data.map((list: any) => {
            return list.sender.id === userId ? 
              { ...list.receiver, reqId: list.id } : 
              { ...list.sender, reqId: list.id }
          }));
          break;
        case 2:
          setFriends(response.data.map((list: any) => ({ ...list.receiver, reqId: list.id })));
          break;
        case 3:
          setFriends(response.data.map((list: any) => ({ ...list.sender, reqId: list.id })));
          break;
      
        default:
          break;
      }
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
  }, [userId, tab, reloadList]);

  return (
    <>
      <Toaster />
      {showFull && <h1 className='text-center text-2xl font-semibold mb-5'>Manage <del className='text-primary font-normal text-lg'>Strangers</del> Friends</h1>}
      {showFull ? <div role="tablist" className="tabs tabs-bordered pt-3 h-[6dvh] mb-5">
          <a role="tab" className={`tab ${tab === 1 && 'tab-active'} pb-2`} onClick={() => setTab(1)}>Friends</a>
          <a role="tab" className={`tab ${tab === 2 && 'tab-active'} pb-2`} onClick={() => setTab(2)}>Sent</a>
          <a role="tab" className={`tab ${tab === 3 && 'tab-active'} pb-2`} onClick={() => setTab(3)}>Recieved</a>
      </div> : <p className='flex items-center h-[8dvh] text-lg font-semibold p-4 pt-7 md:pt-5 bg-base-300 rounded-t-lg'>Connect with friends</p>}
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
              { friends.map(friend => <SingleFriend showFull={showFull} key={friend.id} user={friend} tab={tab} setReloadList={setReloadList} />) }
            </div>
      }
    </>
  )
}
