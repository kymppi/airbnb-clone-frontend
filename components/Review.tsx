import React from 'react';
import { urlFor } from '../sanity';
import { Person, Review } from '../sanity-types';
import Image from './Image';

interface ReviewProps {
  review: Omit<Review, 'traveller'>;
  traveller: Person;
}

function Review({ review, traveller }: ReviewProps) {
  return (
    <div className="review-box">
      <h1>{review.rating}</h1>
      <h2>{traveller}</h2>
      <Image src={urlFor(traveller.image)} alt="Traveller's profile picture" />
    </div>
  );
}

export default Review;
