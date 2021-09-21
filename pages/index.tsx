import type { GetServerSideProps, NextPage } from 'next';
import { sanityClient } from '../sanity';

const Home: NextPage<{ properties: any[] }> = ({ properties }) => {
  return <>Hello</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //const query = '*[ _type == "property"]';
  const properties = await sanityClient.getAll('property');

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
};

export default Home;
