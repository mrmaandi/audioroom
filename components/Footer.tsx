import Link from "next/link";

function Footer() {
  return (
    <div className="w-full bg-white">
      <div className="md:container md:mx-auto">
        <Link href="/contacts">
          <a>Contacts</a>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
