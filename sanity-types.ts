import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from 'sanity-codegen';

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Property
 *
 *
 */
export interface Property extends SanityDocument {
  _type: 'property';

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Location — `geopoint`
   *
   *
   */
  location?: SanityGeoPoint;

  /**
   * Property Type — `string`
   *
   *
   */
  propertyType?: 'house' | 'flat' | 'bed-and-breakfast' | 'boutique';

  /**
   * Main Image — `image`
   *
   *
   */
  mainImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Images — `array`
   *
   *
   */
  images?: Array<SanityKeyed<PropertyImage>>;

  /**
   * Price Per Night — `number`
   *
   *
   */
  pricePerNight?: number;

  /**
   * Beds — `number`
   *
   *
   */
  beds?: number;

  /**
   * Bedrooms — `number`
   *
   *
   */
  bedrooms?: number;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * ID — `number`
   *
   *
   */
  id?: number;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Host — `host`
   *
   *
   */
  host?: Host;

  /**
   * Reviews — `array`
   *
   *
   */
  reviews?: Array<SanityKeyed<Review>>;
}

/**
 * Person
 *
 *
 */
export interface Person extends SanityDocument {
  _type: 'person';

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * ID — `number`
   *
   *
   */
  id?: number;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

export type PropertyImage = {
  _type: 'propertyImage';
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;
};

export type Review = {
  _type: 'review';
  /**
   * Review Description — `string`
   *
   * A short description of the review.
   */
  reviewDescription?: string;

  /**
   * Traveller — `traveller`
   *
   * The traveller who is the subject of the review.
   */
  traveller?: Traveller;

  /**
   * Rating — `string`
   *
   * A rating of the review.
   */
  rating?: '5-stars' | '4-stars' | '3-stars' | '2-stars' | '1-stars';
};

export type Traveller = SanityReference<Person>;

export type Host = SanityReference<Person>;

export type Documents = Property | Person;
