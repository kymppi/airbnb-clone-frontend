import { GetServerSideProps } from 'next';
import React from 'react';
import { sanityClient } from '../../sanity';
import { Property as PropertyType } from '../../sanity-types';

interface Props extends PropertyType {}

function Property({ title }: Props) {
  return <div>{title || 'Title not found'}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;
  const [property] = await sanityClient.getAll(
    'property',
    `slug.current == "${slug}"`
  );

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title || undefined,
        location: property.location || undefined,
        propertyType: property.propertyType || undefined,
        mainImage: property.mainImage || undefined,
        images: property.images || [],
        pricePerNight: property.pricePerNight || undefined,
        beds: property.beds || undefined,
        bedrooms: property.bedrooms || undefined,
        description: property.description || undefined,
        host: property.host || undefined,
        reviews: property.reviews || [],
      },
    };
  }
};

export default Property;
