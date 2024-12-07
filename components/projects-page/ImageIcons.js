import React from 'react';
import IconRenderer from '../IconRenderer';
import Image from 'next/image';

export default function ImageIcons({ pageData }) {
  const data = pageData.data.find((item) => item.section === 'project-image');

  return (
    <div className="relative w-full h-max md:h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={`/${data.image}`}
        alt="Projelerimiz"
        fill
        className="z-0 object-center object-cover"
      />
      {/* Content */}
      <div
        className="relative z-10 flex flex-wrap items-center justify-center gap-6 p-8 md:p-16"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }} // Semi-transparent background for visibility
      >
        {data.cards.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center gap-2 text-[--light] max-w-[200px]"
          >
            <IconRenderer
              iconName={item.Icon}
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <h2 className="text-base font-semibold md:text-lg">{item.title}</h2>
            <p className="text-sm md:text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
