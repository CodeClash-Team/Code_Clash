import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-block m-3">
      <Image src="/logo_minimalist.png" alt="CodeClash Logo" width={150} height={50} className="rounded-lg" />
    </Link>
  );
}
