import MainWrapper from "@/Components/Desktop/MainWrapper/MainWrapper";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  return (
    <main>
      <div className="px-[15px] lg:px-[60px] py-[5dvh]">
        {/* <Countries /> */}
        <SessionProvider>
          <MainWrapper />
        </SessionProvider>
      </div>
    </main>
  );
}
