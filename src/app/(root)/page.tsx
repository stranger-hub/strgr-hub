import Countries from "@/Components/Desktop/Countries";
import Main from "@/Components/Desktop/Main";

export default function Home() {
  return (
    <main>
      <div className="px-[60px]">
        <Countries />
        <Main />
      </div>
    </main>
  );
}
