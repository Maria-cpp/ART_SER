"use client";

import Image from "next/image";

const FULL_LOGO = "/logo/ARTSER_logo.png";
const LOGO_HEIGHT = 40;

export default function AnimatedLogo() {
  return (
    <div className="flex items-center" style={{ height: LOGO_HEIGHT }}>
      <Image
        src={FULL_LOGO}
        alt="ARTSER"
        width={LOGO_HEIGHT * 3.5}
        height={LOGO_HEIGHT}
        className="object-contain"
        style={{ height: LOGO_HEIGHT }}
        priority
      />
    </div>
  );
}
