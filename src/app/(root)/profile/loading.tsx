export default function loading() {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="relative h-[60vh] w-[900px] bg-base-200 mt-[100px] rounded-lg">
        <div className="absolute w-full flex justify-center items-center gap-10 left-0 top-[-75px]">
          <div className="skeleton h-[150px] w-[150px] rounded-full shrink-0"></div>
        </div>
        <div className="skeleton h-full w-full"></div>
      </div>
    </main>
  );
}
