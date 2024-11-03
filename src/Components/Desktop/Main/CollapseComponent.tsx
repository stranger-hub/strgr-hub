"use client";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import CollapseChat from "./CollapseChat";
import { RtmChannel } from "agora-rtm-sdk";
import { MutableRefObject } from "react";

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
  themUser: { name: string, image: string }
}) {
  return (
    <div className={`flex ${open && "w-[40%]"}`}>
      <div
        className="bg-base-200 px-2 pt-4 rounded-s-lg cursor-pointer"
        onClick={() => setIsOpen((prev: boolean) => !prev)}
      >
        {!open ? (
          <BsFillCaretLeftFill className="text-primary" />
        ) : (
          <BsFillCaretRightFill className="text-primary" />
        )}
      </div>
      {open && (
        <div className={`w-[100%]`}>
          <CollapseChat messages={messages} channel={channel} setMessages={setMessages} themUser={themUser} />
        </div>
      )}
    </div>
  );
}
