import Countries from "@/Components/Desktop/Countries";
import Main from "@/Components/Desktop/Main";
import Navbar from "@/Components/Desktop/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="px-[60px]">
        <Countries />
        <Main />
      </div>
    </main>
  );
}
