import Link from "next/link";

function Footer() {
  return (
    <div className="w-full bg-slate-200 py-10">
      <div className="md:container md:mx-auto">
        <Link href="/contacts">
          <a>Contacts</a>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
