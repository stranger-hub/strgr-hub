import Countries from "@/Components/Desktop/Countries";
import Main from "@/Components/Desktop/Main";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <div className="px-[60px]">
        {JSON.stringify(session)}
        <Countries />
        <Main />
      </div>
    </main>
  );
}
