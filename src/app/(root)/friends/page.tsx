import { auth } from "@/auth";
import FriendsTabList from "@/Components/Friends/FriendsTabList";

export default async function Page() {
  const session = await auth();
	const userId = session?.user?.id as string;

  return (
    <div className="px-[10px] lg:px-[60px] py-[2dvh] lg:py-[5dvh]">
      <FriendsTabList showFull={true} userId={userId} />
    </div>
  )
}
