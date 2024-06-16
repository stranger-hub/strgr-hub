import Countries from "@/Components/Desktop/Main/Countries";
import Main from "@/Components/Desktop/Main/Main";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <div className="px-[60px]">
        <Countries />
        <Main />
      </div>
    </main>
  );
}
