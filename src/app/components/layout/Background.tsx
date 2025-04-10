import Image from "next/image";
import React from "react";

function Background({ imgSrc }: { imgSrc: string }) {
  return (
    <section className="overflow-hidden">
      <div className="relative aspect-[16/10] w-full">
        {imgSrc && (
          <Image
            src={imgSrc}
            fill
            className="object-cover"
            alt="background-image"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            quality={50}
          />
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-slate-200 opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-200 opacity-100" />
      </div>
    </section>
  );
}

export default Background;
