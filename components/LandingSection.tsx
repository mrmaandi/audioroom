import Link from "next/link";

const LandingSection = () => {
  return (
    <div className="m-auto">
      <div className="flex flex-col items-center gap-5">
        {/* <img src="/logo.svg" alt="Logo" width={100}/> */}
        {/* <img src="/logo2.svg" alt="Logo" /> */}
        <h1 className="text-5xl font-extrabold">Audioroom</h1>
        <p className="text-xl">The space for creativity</p>
        <Link href="/library">
          <a className="uppercase border-white border-2 hover:text-slate-800 hover:bg-white font-semibold py-2 px-4 rounded-full shadow">
            Start exploring
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LandingSection;
