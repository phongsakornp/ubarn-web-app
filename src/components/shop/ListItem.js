import React from 'react';
import { Link } from 'gatsby';

const ListItem = ({ shop, siteConfig }) => {
  return (
    <Link to={`/shops/${shop.shopId}`}>
      <div
        className={
          'flex flex-col overflow-hidden text-gray-900 bg-white border rounded-lg shadow'
        }
      >
        <img
          src={`${siteConfig.path.shop}/${shop.shopId}/cover.jpg`}
          alt="Shop cover"
          className="object-cover w-full h-48"
        />
        <div className={'flex flex-col p-5 overflow-hidden'}>
          <h4 className="text-lg font-semibold truncate">{shop.name}</h4>
          <div className="text-teal-600 text-sm mt-2">{`เปิด: ${shop.openTime}`}</div>
        </div>
      </div>
    </Link>
  );
};
export default ListItem;
