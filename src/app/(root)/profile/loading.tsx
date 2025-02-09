export default function loading() {
  return (
    <main className="flex flex-col justify-center items-center px-[10px] lg:px-[60px] py-[2dvh] lg:py-[5dvh]">
      <div className="relative h-[60dvh] w-[99dvw] md:w-[700px] bg-base-200 mt-[100px] rounded-lg">
        <div className="absolute w-full flex justify-center items-center gap-10 left-0 top-[-75px]">
          <div className="skeleton h-[150px] w-[150px] rounded-full shrink-0"></div>
        </div>
        <div className="skeleton h-full w-full"></div>
      </div>
    </main>
  );
}
