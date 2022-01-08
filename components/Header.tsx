import Link from "next/link";

function Header() {
  return (
    <div className="w-full py-5">
      <div className="md:container md:mx-auto">
        <div className="flex justify-between">
          <div>
            <Link href="/">
              <a className="text-lg font-extrabold">Audioroom</a>
            </Link>
          </div>
          <div className="grid grid-flow-col gap-x-4 uppercase">
            <Link href="/library">
              <a>Library</a>
            </Link>
            <Link href="/pricing">
              <a>Pricing</a>
            </Link>
            <Link href="/signin">
              <a>Sign in</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
