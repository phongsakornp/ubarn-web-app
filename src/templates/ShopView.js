import React from 'react';

import Layout from 'components/Layout';
import Seo from 'components/Seo';

const ShopView = ({ pageContext: { shop } }) => {
  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Shop" />
            <div className="text-2xl">{shop.name}</div>;
          </>
        );
      }}
    />
  );
};
export default ShopView;
