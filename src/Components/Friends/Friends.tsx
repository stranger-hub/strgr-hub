import { useSession } from "next-auth/react";
import FriendsTabList from "./FriendsTabList";

export default function Friends() {
  const session = useSession();
  const userId = session.data?.user?.id as string;

  return (
    <div className="bg-base-200 h-[80dvh]">
      <FriendsTabList showFull={false} userId={userId} />
    </div>
  )
}
