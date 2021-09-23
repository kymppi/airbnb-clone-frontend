import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import fetch from 'isomorphic-unfetch';
import { createImageUrlBuilder } from 'next-sanity';
import { createClient } from 'sanity-codegen';
import { Documents } from './sanity-types';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient<Documents>({
  ...config,
  fetch: fetch,
});

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source);
