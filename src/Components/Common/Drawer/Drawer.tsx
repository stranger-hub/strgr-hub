'use client';
import CollapseChat from '@/Components/Desktop/Main/CollapseChat';
import { User } from '@prisma/client';
import { RtmChannel } from 'agora-rtm-sdk';
import React, { MutableRefObject } from 'react'

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
  themUser: User | null
}) {
  return (
    <div className={`w-full bg-secondary h-[65dvh] transition-all duration-200 absolute ${open ? "bottom-0" : "bottom-[-65dvh]"} left-0 z-[999999] border border-primary border-b-0 rounded-t-lg`}>
      <CollapseChat messages={messages} channel={channel} setMessages={setMessages} themUser={themUser} />
    </div>
  )
}
