export default function About() {
  return (
    <div className="flex min-h-screen ">
      <div className=" w-60 flex-shrink-0 bg-red-200">Sidebar</div>
      <div className="flex w-full  flex-col overflow-y-auto">
        <div className="flex h-[45px]  max-w-full overflow-hidden bg-yellow-200 ">
          Headers
        </div>
        <div className="flex grow flex-col bg-slate-700">
          <div className="m-4 h-[200px] grow bg-blue-200">Top</div>
          <div className="m-4 h-[200px] grow bg-green-200">Top</div>
        </div>
      </div>
    </div>
  );
}
