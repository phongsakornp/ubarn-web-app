import React from 'react';

import { ImageService } from 'data/config';
import { shopServiceToText } from 'data/convert';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const ComponentText = {
  MENU_SECTION: 'เมนู',
  BAHT: 'บาท',
};
const ShopView = ({ pageContext: { shop } }) => {
  //  console.log(`Shop`, shop);
  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Shop" />
            <div className={'flex flex-col w-full'}>
              <img
                src={`${ImageService.SHOPS_URL}/${shop.id}/cover.jpg`}
                alt="Shop cover"
                className="object-cover w-full h-48"
              />
              <div className="flex flex-col w-full px-5">
                <div className="mt-3 text-2xl font-bold">{shop.name}</div>
                <div className="flex">
                  <p className="text-sm text-gray-700 leading-tight">
                    {shop.address}
                  </p>
                </div>
                <div className="flex items-center mt-3">
                  <i className={'text-gray-800 fas fa-phone'}></i>
                  <div className={'ml-3'}>{shop.phone}</div>
                </div>
              </div>

              <div className={'text-sm font-semibold p-5 mt-4 bg-orange-200'}>
                {shopServiceToText(shop.service)}
              </div>

              <div className="flex flex-col w-full px-5">
                <div className="mt-3 text-lg font-bold">
                  {ComponentText.MENU_SECTION}
                </div>
                {shop.menu.map((menu, idx) => {
                  return (
                    <div
                      key={`${menu.name}-${idx}`}
                      className="flex flex-col w-full mt-3"
                    >
                      <div className="flex items-center w-full">
                        <div className="flex flex-col w-full">
                          <div className="mt-3 text-lg font-semibold text-gray-800">
                            {menu.name}
                          </div>
                          <div className="text-base text-gray-700">
                            {`${menu.price} ${ComponentText.BAHT}`}
                          </div>
                        </div>
                        <img
                          src={`${ImageService.SHOPS_URL}/${shop.id}/menu-${menu.id}.jpg`}
                          alt="Shop cover"
                          className="object-cover w-20 h-20 rounded-lg"
                        />
                      </div>
                      <hr className="w-full mt-4" />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      }}
    />
  );
};
export default ShopView;
