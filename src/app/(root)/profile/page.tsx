import ProfileDetails from "@/Components/Common/ProfileDetails";
import ImageInput from "@/Components/Common/ProfileImageInput";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const user: any = await getUserById(userId);

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="relative w-[900px] bg-base-200 mt-[100px] rounded-lg border border-primary ">
        <ImageInput image={user?.image} />
        <div className="mt-[85px] mb-[40px]">
          <ProfileDetails user={user} />
        </div>
      </div>
    </main>
  );
}
