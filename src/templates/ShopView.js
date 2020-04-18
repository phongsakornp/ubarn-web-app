import React from 'react';
import { navigate } from '@reach/router';

import { shopServiceToText } from 'data/convert';
import Layout from 'components/Layout';
import Seo from 'components/Seo';

const ComponentText = {
  MENU_SECTION: 'เมนู',
  BAHT: 'บาท',
};
const ShopView = ({ pageContext: { shop, siteConfig } }) => {
  // console.log(`Shop`, shop);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Shop" />
            <div className={'flex flex-col w-full max-w-screen-lg'}>
              <div className="relative">
                <img
                  src={`${siteConfig.path.shop}/${shop.shopId}/cover.jpg`}
                  alt="Shop cover"
                  className="object-cover w-full h-auto"
                />
                <div className="absolute top-0">
                  <button className="bg-blue-700 opacity-75" onClick={goBack}>
                    <i
                      className={
                        'fas fa-arrow-left text-xl text-white px-5 py-2'
                      }
                    ></i>
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full px-5">
                <div className="mt-3 text-2xl font-bold">{shop.name}</div>
                <div className="flex">
                  <p className="text-sm leading-tight text-gray-700">
                    {shop.address}
                  </p>
                </div>
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    <i
                      className={
                        'text-indigo-600 text-xl fas fa-phone-square-alt'
                      }
                    ></i>
                    <div className={'text-indigo-600 font-semibold ml-2'}>
                      {shop.phone}
                    </div>
                  </div>
                  {shop.lineId ? (
                    <div className="flex items-center ml-6">
                      <i className={'text-green-600 text-xl fab fa-line'}></i>
                      <div className={'text-green-700 font-semibold ml-2'}>
                        {shop.lineId}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={'text-base font-semibold p-5 mt-4 bg-orange-200'}>
                {shop.services.reduce((result, service, idx) => {
                  if (shop.services.length === 1) {
                    return `${shopServiceToText(service)}`;
                  }
                  if (idx === 0) {
                    return `${shopServiceToText(service)} `;
                  }
                  if (idx === shop.services.length - 1) {
                    return `${result} / ${shopServiceToText(service)}`;
                  }
                  return `${result} / ${shopServiceToText(service)} / `;
                }, ``)}
              </div>

              {shop.info ? (
                <div className="flex items-center bg-orange-300 px-5 py-2">
                  <i className="text-orange-600 fas fa-info-circle"></i>
                  <div className="ml-2">{shop.info}</div>
                </div>
              ) : null}

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
                          src={`${siteConfig.path.shop}/${shop.shopId}/menu-${menu.id}.jpg`}
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
