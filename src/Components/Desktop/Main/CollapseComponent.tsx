import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import CollapseChat from "./CollapseChat";

export default function CollapseComponent({
  open,
  setIsOpen,
  messages,
}: {
  open: any;
  setIsOpen: any;
  messages: { userId: string, message: string }[];
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
          <CollapseChat messages={messages} />
        </div>
      )}
    </div>
  );
}
