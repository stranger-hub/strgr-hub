'use client';
import CollapseChat from '@/Components/Desktop/Main/CollapseChat';
import FriendsTabList from '@/Components/Friends/FriendsTabList';
import { User } from '@prisma/client';
import { RtmChannel } from 'agora-rtm-sdk';
import { useSession } from 'next-auth/react';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { BsChatDotsFill, BsPersonHeart } from 'react-icons/bs';

export default function Drawer({ 
  open, 
  setOpen,
  messages,
  channel,
  setMessages,
  themUser,
}: { 
  open: boolean; 
  setOpen: any;
  messages: { userId: string, message: string }[];
  channel: MutableRefObject<RtmChannel | undefined>;
  setMessages: any;
  themUser: User | null;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = React.useState<number>(1);
  const session = useSession();
  const userId = session.data?.user?.id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div ref={drawerRef} className={`w-full bg-secondary h-[71dvh] transition-all duration-200 absolute ${open ? "bottom-0" : "bottom-[-71dvh]"} left-0 z-[999999] border border-primary border-b-0 rounded-t-lg`}>
      <div className="join flex justify-center h-[6dvh] rounded-b-none rounded-t-lg">
        <button className={`btn ${tab === 1 ? "btn-primary" : "btn-ghost"} w-[50%] join-item`} onClick={() => setTab(1)}>
          CHAT
          <BsChatDotsFill />
        </button>
        <button className={`btn ${tab === 2 ? "btn-primary" : "btn-ghost"} w-[50%] join-item`} onClick={() => setTab(2)}>
          FRIENDS
          <BsPersonHeart />
        </button>
      </div>
      {tab === 1 && <CollapseChat messages={messages} channel={channel} setMessages={setMessages} themUser={themUser} />}
      {tab === 2 && <FriendsTabList userId={userId!} showFull={false} isMobile={true} />}
    </div>
  );
}