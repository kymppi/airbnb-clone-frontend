/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps } from 'next';
import React from 'react';
import Review from '../../components/Review';
import { sanityClient } from '../../sanity';
import {
  Documents,
  Person,
  Property as PropertyType,
} from '../../sanity-types';
import { isMultiple } from '../../utils';
import Image from './../../components/Image';

interface Props extends Omit<PropertyType, 'host'> {
  host?: Person;
}

function Property({
  title,
  propertyType,
  host,
  bedrooms,
  beds,
  pricePerNight,
  reviews,
  mainImage,
  images,
  description,
}: Props) {
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <p>
        {reviews?.length || 0} review{isMultiple(reviews?.length)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} alt="main-image" />
        <div className="sub-images-section">
          {images &&
            images.map((img) => (
              <Image
                key={img._key}
                identifier="image"
                image={img}
                alt="image"
              />
            ))}
        </div>
      </div>

      <div className="section">
        <div className="information"></div>

        <h2>
          <b>
            {propertyType} hosted by {host?.name}
          </b>
        </h2>
        <h4>
          {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed
          {isMultiple(beds)}
        </h4>
        <hr />
        <h4>
          <b>Enhanced Clean</b>
        </h4>
        <p>
          This host is committed to AirBnB's 5-step enhanced cleaning process.
        </p>
        <h4>
          <b>Amenities for everyday living</b>
        </h4>
        <p>
          This host has equipped this place for long stays - kitchen, shampoo,
          conditioner, hairdryer included.
        </p>
        <h4>
          <b>House Rules</b>
        </h4>
        <p>
          This place isn't suitable for pets and the host does not allow parties
          or smoking.
        </p>
      </div>
      <div className="price-box">
        <h2>{pricePerNight}€</h2>
        <h4>
          {reviews?.length || 0} review{isMultiple(reviews?.length)}
        </h4>
        <div className="button" onClick={() => {}}>
          Change Dates
        </div>
      </div>
      <hr />

      <h4>{description}</h4>

      <hr />

      <h2>
        {reviews?.length || 0} review{isMultiple(reviews?.length)}
      </h2>
      {reviews?.length ||
        (0 > 0 &&
          reviews
            ?.filter((rev) => rev.traveller != undefined)
            .map((review) => (
              <Review
                key={review._key}
                review={review}
                traveller={review.traveller! as any}
              />
            )))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;

  // const query = `*[ _type == "property" && slug.current == "${slug}"] [0] {
  //   title,
  //   location,
  //   propertyType,
  //   mainImage,
  //   images,
  //   pricePerNight,
  //   beds,
  //   bedrooms,
  //   description,
  //   host->{
  //     _id,
  //     name,
  //     slug,
  //     image
  //   },
  //   reviews->{
  //     ...,
  //     traveller->{
  //       _id,
  //       name,
  //       slug,
  //       image
  //     }
  //   }
  // }`;

  const [property] = await sanityClient.getAll(
    'property',
    `slug.current == "${slug}"`
  );

  const host = (await sanityClient.expand<Documents>({
    _ref: property.host?._ref || '',
    _type: property.host?._type || 'reference',
  })) as Person;

  let reviews;

  if (property.reviews) {
    property.reviews.forEach(async (review) => {
      const reviewTraveller = (await sanityClient.expand<Documents>({
        _ref: review.traveller?._ref || '',
        _type: review.traveller?._type || 'reference',
      })) as Person;

      if (reviewTraveller)
        reviews.push({ ...review, traveller: reviewTraveller });
    });
  }

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
        host: host || undefined,
        reviews: property.reviews || [],
      },
    };
  }
};

export default Property;
