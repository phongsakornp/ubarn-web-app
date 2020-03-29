import React from 'react';

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
                src={shop.coverImg}
                alt="Shop cover"
                className="object-cover w-full h-48"
              />
              <div className="flex flex-col w-full px-5">
                <div className="mt-3 text-2xl font-bold">{shop.name}</div>
                <hr className="w-full mt-3" />
                <div className="mt-3 text-lg font-bold">
                  {ComponentText.MENU_SECTION}
                </div>

                <div className="flex items-center w-full">
                  <div className="flex flex-col w-full">
                    <div className="mt-3 text-lg font-bold">
                      ข้าวไข่ข้นต้มยำกุ้ง
                    </div>
                    <div className="text-lg text-gray-700">
                      {`99 ${ComponentText.BAHT}`}
                    </div>
                  </div>
                  <img
                    src={shop.coverImg}
                    alt="Shop cover"
                    className="object-cover w-20 h-20 rounded-lg"
                  />
                </div>

                <hr className="w-full mt-4" />

                <div className="flex items-center w-full mt-4">
                  <div className="flex flex-col w-full">
                    <div className="text-lg font-bold mt-3">
                      ข้าวไก่ตุ๋นเต้าเจี้ยว
                    </div>
                    <div className="text-lg text-gray-700">
                      {`89 ${ComponentText.BAHT}`}
                    </div>
                  </div>
                  <img
                    src={shop.coverImg}
                    alt="Shop cover"
                    className="object-cover w-20 h-20 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};
export default ShopView;
