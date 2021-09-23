import React from 'react';
import NextImage from 'next/image';
import { urlFor } from '../sanity';
import { PropertyImage } from '../sanity-types';

interface ImageProps {
  identifier?: 'main-image' | string;
  alt?: string;
  image: any;
}

function Image({ identifier, alt, image }: ImageProps) {
  const img = urlFor(image).auto('format').url();
  return (
    <>
      {img && (
        <div className={identifier === 'main-image' ? 'main-image' : 'image'}>
          <NextImage layout="fill" alt={alt} src={img} />
        </div>
      )}
    </>
  );
}

export default Image;
