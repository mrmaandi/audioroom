import { Center, Container } from "@chakra-ui/react";
import Link from "next/link";

function Footer() {
  return (
    <div className="w-full bg-slate-100 py-10">
      <Container maxW="container.xl"><Center>Audioroom © 2022</Center></Container>
    </div>
  );
}

export default Footer;
