import Countries from "@/Components/Desktop/Countries";
import Navbar from "@/Components/Desktop/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="px-[60px]">
        <Countries />
      </div>
    </main>
  );
}
