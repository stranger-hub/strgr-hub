import EmojiPicker, { Theme } from "emoji-picker-react";
import React, { useState } from "react";
import { BsEmojiSmile, BsSendArrowUp } from "react-icons/bs";

function ChatHeader({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  return (
    <div className="bg-base-200 p-3 flex items-center gap-4 h-[8vh]">
      <div className="avatar online placeholder">
        {/* use class placeholder when DP not available */}
        <div className="bg-base-100 text-neutral-content w-10 rounded-full capitalize">
          <span className="text-base">{firstName[0] + lastName[0]}</span>
          {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
        </div>
      </div>
      <p className="text-sm">{firstName + " " + lastName}</p>
    </div>
  );
}

function Chat() {
  return (
    <div className="text-xs h-[64vh] overflow-auto">
      {/* incoming chats */}
      <div className="mt-5">
        <div className="chat chat-start text-black">
          <div className="chat-bubble bg-white text-black p-3 mb-1">
            What kind of nonsense 🤓🤓🤓🤓🤓👀 is this What kind of nonsense is
            this What kind of nonsense is this What kind of nonsense is this
            What kind of nonsense is thisWhat kind of nonsense is this
          </div>
          <div className="chat-bubble bg-white p-3 mb-1">
            What kind of nonsense is this
          </div>
        </div>
      </div>
      {/* outgoing chats */}
      <div className="mt-5">
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-primary text-white p-3 mb-1">
            What kind of nonsense 🤓🤓🤓🤓🤓👀 is this What kind of nonsense is
            this What kind of nonsense is this What kind of nonsense is this
            What kind of nonsense is thisWhat kind of nonsense is this
          </div>
          <div className="chat-bubble chat-bubble-primary text-white p-3 mb-1">
            What kind of nonsense is this
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="chat chat-start text-black">
          <div className="chat-bubble bg-white text-black p-3 mb-1">
            What kind of nonsense 🤓🤓🤓🤓🤓👀 is this What kind of nonsense is
            this What kind of nonsense is this What kind of nonsense is this
            What kind of nonsense is thisWhat kind of nonsense is this
          </div>
          <div className="chat-bubble bg-white p-3 mb-1">
            What kind of nonsense is this
          </div>
        </div>
      </div>
      {/* outgoing chats */}
      <div className="mt-5">
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-primary text-white p-3 mb-1">
            What kind of nonsense 🤓🤓🤓🤓🤓👀 is this What kind of nonsense is
            this What kind of nonsense is this What kind of nonsense is this
            What kind of nonsense is thisWhat kind of nonsense is this
          </div>
          <div className="chat-bubble chat-bubble-primary text-white p-3 mb-1">
            What kind of nonsense is this
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatInput({
  emojiOpen,
  setEmojiOpen,
  input,
  setInput,
}: {
  emojiOpen: any;
  setEmojiOpen: any;
  input: any;
  setInput: any;
}) {
  return (
    <div className="h-[8vh] bg-base-200 flex items-center gap-5">
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
      <BsEmojiSmile
        className="text-primary cursor-pointer"
        size={20}
        onClick={() => setEmojiOpen((prev: boolean) => !prev)}
      />
      <BsSendArrowUp className="text-primary cursor-pointer" size={20} />
    </div>
  );
}

export default function CollapseChat() {
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  return (
    <div className="w-[100%]">
      <ChatHeader firstName={"Jayendra"} lastName={"Awasthi"} />
      <Chat />
      <ChatInput
        emojiOpen={emojiOpen}
        setEmojiOpen={setEmojiOpen}
        input={input}
        setInput={setInput}
      />
    </div>
  );
}
