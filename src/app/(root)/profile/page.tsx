import ProfileDetails from "@/Components/Common/ProfileDetails";
import ImageInput from "@/Components/Common/ProfileImageInput";

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
  const repo = await getProjects();

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="relative w-[900px] bg-base-200 mt-[100px] rounded-lg border border-primary ">
        <ImageInput />
        <div className="mt-[85px] mb-[40px]">
          <ProfileDetails />
        </div>
      </div>
    </main>
  );
}
