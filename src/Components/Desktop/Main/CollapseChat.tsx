"use client";
import { User } from "@prisma/client";
import { RtmChannel } from "agora-rtm-sdk";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { MutableRefObject, useState } from "react";
import { toast } from "react-hot-toast";
import { BsEmojiSmileFill, BsSendArrowUpFill } from "react-icons/bs";

function ChatHeader({
  themUser
}: {
  themUser: User
}) {
  return (
    <div className="bg-base-200 p-3 flex items-center gap-4 h-[8vh]">
      <div className="avatar online placeholder">
        {/* use class placeholder when DP not available */}
        <div className="bg-base-100 text-neutral-content w-10 rounded-full capitalize">
          {themUser?.image ?
            <Image height={70} width={70} alt="profile pic" className="mask mask-circle" src={themUser?.image} />
            :
            <div className="avatar placeholder">
              <div className="bg-base-100 text-neutral-content w-10 rounded-full capitalize">
                <span className="text-base">{themUser?.name?.toUpperCase()?.split(" ").map((name: string) => name[0]).join("")}</span>
              </div>
            </div>
          }
        </div>
      </div>
      <p className="text-sm">{themUser?.name}</p>
      {themUser.countryCode && <Image
        alt="United States"
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${themUser.countryCode}.svg`}
        width={18}
        height={12}
      />}
    </div>
  );
}

function Chat({
  userId,
  messages,
}: {
  userId: string;
  messages: { userId: string; message: string }[];
}) {
  return (
    <div className="text-xs h-[64vh] overflow-auto">
      {/* incoming chats */}
      {messages.map((message, index) =>
        userId !== message.userId ? (
          <div key={index + message.message}>
            <div className="chat chat-start text-black text-wrap">
              <div className="chat-bubble bg-white text-black p-3 mb-1">
                {message.message}
              </div>
            </div>
          </div>
        ) : (
          <div key={index + message.message}>
            <div className="chat chat-end text-wrap">
              <div className="chat-bubble chat-bubble-primary text-white p-3 mb-1">
                {message.message}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function ChatInput({
  handleMessageSend
}: {
  handleMessageSend: (text: string) => Promise<void>;
}) {
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  async function handleMessageSubmit(event: any) {
    event.preventDefault();
    if (input) {
      await handleMessageSend(input);
      setInput("");
    }
  }

  return (
    <form className="h-[8vh] bg-base-200 flex items-center gap-5" onSubmit={handleMessageSubmit}>
      <input
        type="text"
        className="input input-sm w-[80%] rounded text-sm"
        placeholder="Type something here...."
        value={input}
        onClick={() => setEmojiOpen(false)}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="absolute right-20 bottom-16">
        <EmojiPicker
          open={emojiOpen}
          theme={Theme.DARK}
          width="300px"
          lazyLoadEmojis
          onEmojiClick={(event) =>
            setInput((prev: string) => prev + event.emoji)
          }
          previewConfig={{
            showPreview: false,
          }}
        />
      </div>
      <BsEmojiSmileFill
        className="text-white hover:text-primary cursor-pointer"
        size={20}
        onClick={() => setEmojiOpen((prev: boolean) => !prev)}
      />
      <button type="submit">
        <BsSendArrowUpFill className="text-white hover:text-primary" size={20} />
      </button>
    </form>
  );
}

export default function CollapseChat({
  messages,
  channel,
  setMessages,
  themUser
}: {
  messages: { userId: string; message: string }[];
  channel: MutableRefObject<RtmChannel | undefined>,
  setMessages: any,
  themUser: User | null
}) {
  const session = useSession();
  const userId = session.data?.user?.id as string;

  async function handleMessageSend(text: string) {
    try {
      if (!channel.current) {
        throw new Error("no channel found");
      }
      await channel.current.sendMessage({ text });
      setMessages((prev: any[]) => [
        ...prev,
        {
          userId,
          message: text,
        }
      ]);
    } catch (e: any) {
      console.log(e.message);
      toast.error("error sending message!", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: 'message'
      });
    }
  }

  return (
    <div className="w-[100%]">
      {themUser ?
        <>
          <ChatHeader themUser={themUser} />
          {messages.length === 0 ? 
            <div className="h-[64vh] flex justify-center items-center">
              <p>Echo... echo... 📡</p>
            </div> :
            <Chat userId={userId} messages={messages} />
          }
          <ChatInput
            handleMessageSend={handleMessageSend}
          />
        </> :
        <div className="bg-base-200 h-[80vh] flex justify-center items-center gap-2">
          <span className="loading loading-ring loading-md"></span>
          <p>Waiting for someone to join...</p>
        </div>
      }
    </div>
  );
}
