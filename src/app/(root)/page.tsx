import Countries from "@/Components/Desktop/Main/Countries";
import Main from "@/Components/Desktop/Main/Main";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  return (
    <main>
      <div className="px-[60px]">
        <Countries />
        <SessionProvider>
          <Main />
        </SessionProvider>
      </div>
    </main>
  );
}
