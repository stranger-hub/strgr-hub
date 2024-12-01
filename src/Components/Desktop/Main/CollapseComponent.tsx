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
    <div className={`flex ${open && "w-[40%]"}`}>
      <div className="bg-base-200 px-2 py-4 rounded-s-lg flex flex-col justify-between gap-10">
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
      {open && (
        <div className={`w-[100%]`}>
          {tab === 1 && <CollapseChat messages={messages} channel={channel} setMessages={setMessages} themUser={themUser} />}
          {tab === 2 && <Friends />}
        </div>
      )}
    </div>
  );
}
