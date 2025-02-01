"use client";
import { BsFillCaretLeftFill, BsFillCaretRightFill, BsPersonCheckFill, BsChatDotsFill } from "react-icons/bs";
import CollapseChat from "./CollapseChat";
import { RtmChannel } from "agora-rtm-sdk";
import React, { MutableRefObject } from "react";
import { User } from "@prisma/client";
import Friends from "@/Components/Friends/Friends";

export default function CollapseComponent({
  isLoading,
  open,
  setIsOpen,
  messages,
  channel,
  setMessages,
  themUser,
}: {
  isLoading: boolean;
  open: any;
  setIsOpen: any;
  messages: { userId: string, message: string }[];
  channel: MutableRefObject<RtmChannel | undefined>;
  setMessages: any;
  themUser: User | null
}) {
  const buttonCustomStyle = "p-2 hover:bg-base-100 rounded hover:text-primary transition duration-200 ease-in-out transform hover:scale-110";

  const [tab, setTab] = React.useState<number>(1);

  return (
    <div className={`transition-all duration-200 flex max-w-[40%] ${open ? 'w-[750px]' : 'w-[50px]'}`}>
      <div className="bg-base-200 px-2 py-4 rounded-s-lg flex flex-col justify-between gap-10 w-[50px]">
        <button onClick={() => setIsOpen((prev: boolean) => !prev)} className={buttonCustomStyle}>
          {!open ? (
            <BsFillCaretLeftFill />
          ) : (
            <BsFillCaretRightFill />
          )}
        </button>
        <button className={`${buttonCustomStyle} ${tab === 1 ? 'text-primary bg-base-100' : ''}`} onClick={() => { setTab(1); setIsOpen(true); }}>
          <BsChatDotsFill />
        </button>
        <button className={`${buttonCustomStyle} ${tab === 2 ? 'text-primary bg-base-100' : ''}`} onClick={() => { setTab(2); setIsOpen(true); }}>
          <BsPersonCheckFill />
        </button>
      </div>
      <div className={`${open ? 'w-[100%] opacity-100' : 'w-[0%] opacity-0'} overflow-x-hidden transition-all duration-200`}>
        {tab === 1 && <CollapseChat messages={messages} channel={channel} setMessages={setMessages} themUser={themUser} />}
        {tab === 2 && <Friends />}
      </div>
    </div>
  );
}
