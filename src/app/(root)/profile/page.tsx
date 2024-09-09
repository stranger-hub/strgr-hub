import ProfileDetails from "@/Components/Common/ProfileDetails";
import ImageInput from "@/Components/Common/ProfileImageInput";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";

type Repo = {
  name: string;
  stargazers_count: number;
};

async function getProjects() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js", {
    cache: "no-store",
  });
  const repo: Repo = await res.json();
  return repo;
}

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
