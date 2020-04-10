import React from 'react';
import moment from 'moment';
import { graphql, navigate } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { ShopListItem } from 'components/shop';

const ComponentText = {
  HERO_TITLE: 'สถานการณ์ COVID-19 จังหวัดตรัง',
  HERO_SUBTITLE: '',
  DONATE_TITLE_1: 'ขอเชิญร่วมบริจาคเงินให้โรงพยาบาล',
  DONATE_TITLE_2: '‘ฝ่าวิกฤต สู้ภัยโควิด’',
  DONATE_TITLE_3: 'เราจะผ่านวิกฤตนี้ไปด้วยกัน',
  DONATE_BUTTON_TITLE: 'ดูข้อมูลเพิ่ม',
  DAILYREPORT_INFECTED_TITLE: 'ติดเชื้อ',
  DAILYREPORT_THREATING_TITLE: 'กำลังรักษา',
  DAILYREPORT_CURED_TITLE: 'หายแล้ว',
  DAILYREPORT_DEATH_TITLE: 'เสียชีวิต',
  DAILYREPORT_UPDATEDAT_TITLE: 'ข้อมูล ณ วันที่',
  CASE_NUMBER: '#',
  CASE_SEX: 'เพศ',
  CASE_AGE: 'อายุ',
  CASE_AGE_UNIT: 'ปี',
  SHOP_SECTION_TITLE: 'ร้านค้า',
  SHOP_SECTION_MORE_BUTTON: 'ดูร้านค้าเพิ่ม',
};

const Stat = ({
  title,
  value,
  cardClassName,
  titleClassName,
  valueClassName,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center 
      w-full h-32 rounded-md shadow shadow-sm overflow-hidden ${cardClassName}`}
    >
      <div className={'flex flex-col items-center justify-center'}>
        <div
          className={`font-semibold text-base text-gray-200 ${titleClassName}`}
        >
          {title}
        </div>
        <div
          className={`text-4xl font-semibold text-gray-200 ${valueClassName}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

const IndexPage = ({ data }) => {
  const [dailyReport] = React.useState(() => {
    const { infected = 0, cured = 0, death = 0 } = data.dailyReport;
    return {
      infected,
      cured,
      death,
    };
  });

  const shopData = data.allShop.edges.slice(0, 6).map(edge => edge.node);

  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Home" />
            <div className="flex flex-col items-center justify-center w-full h-full px-5 py-16 bg-gray-800">
              <div className="flex flex-col items-center">
                <div className="mt-0 mb-2 text-xl font-normal font-bold leading-normal text-gray-200 lg:text-4xl">
                  {ComponentText.HERO_TITLE}
                </div>
              </div>
              <div
                className={
                  'grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-4' +
                  ' w-full mt-16 md:px-0 max-w-screen-lg'
                }
              >
                <Stat
                  title={ComponentText.DAILYREPORT_INFECTED_TITLE}
                  value={dailyReport.infected}
                  cardClassName="bg-red-600"
                />

                <Stat
                  title={ComponentText.DAILYREPORT_THREATING_TITLE}
                  value={dailyReport.infected - dailyReport.cured}
                  cardClassName="flex bg-orange-500"
                  titleClassName="text-orange-200"
                  valueClassName="text-orange-200"
                />

                <Stat
                  title={ComponentText.DAILYREPORT_CURED_TITLE}
                  value={dailyReport.cured}
                  cardClassName="flex bg-green-600"
                  titleClassName="text-green-200"
                  valueClassName="text-green-200"
                />

                <Stat
                  title={ComponentText.DAILYREPORT_DEATH_TITLE}
                  value={dailyReport.death}
                  cardClassName="bg-black"
                  titleClassName="text-gray-200"
                  valueClassName="text-gray-200"
                />
              </div>
              <div className="flex items-center justify-end w-full mt-8 md:px-0 max-w-screen-lg">
                <div className="text-gray-500">
                  {ComponentText.DAILYREPORT_UPDATEDAT_TITLE}
                </div>
                <div className="ml-2 text-gray-500">
                  {moment(data.dailyReport.updatedAt, 'YYYY-MM-DD').format(
                    'LL'
                  )}
                </div>
                <a
                  className="ml-2 bg-blue-700 rounded-lg opacity-75"
                  href={data.dailyReport.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className={
                      'fas fa-external-link-alt text-lg text-white px-3 py-2'
                    }
                  ></i>
                </a>
              </div>
            </div>

            <div
              className="flex flex-col items-center justify-center w-full py-10"
              style={{
                backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${data.siteConfig.path.etc}/together.jpg)
                `,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div className="flex flex-col items-center opacity-100">
                <div className="mt-12 text-lg font-bold leading-normal text-pink-900 opacity-100 lg:text-2xl">
                  {ComponentText.DONATE_TITLE_1}
                </div>
                <div className="mt-2 text-lg font-bold leading-normal text-pink-900 lg:text-2xl">
                  {ComponentText.DONATE_TITLE_2}
                </div>
                <div className="mt-2 text-lg font-bold leading-normal text-pink-900 lg:text-2xl">
                  {ComponentText.DONATE_TITLE_3}
                </div>
                <div className="mt-8 mb-12">
                  <button
                    className="px-8 py-2 font-bold text-white bg-pink-500 rounded hover:bg-pink-700"
                    onClick={() => navigate('/hospitals')}
                  >
                    {ComponentText.DONATE_BUTTON_TITLE}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full px-5 max-w-screen-lg">
              <div className="flex flex-col items-center">
                <div className="py-4 mt-16 text-lg font-bold leading-normal text-black lg:text-2xl">
                  {ComponentText.SHOP_SECTION_TITLE}
                </div>
              </div>
              <div
                className={
                  'grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3 py-5'
                }
                style={{
                  justifyItems: 'center',
                }}
              >
                {shopData.map((shop, idx) => {
                  return (
                    <div className="max-w-full" key={`${shop.name}-${idx}`}>
                      <ShopListItem shop={shop} siteConfig={data.siteConfig} />
                    </div>
                  );
                })}
              </div>
              <div className="pt-4 pb-12">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
                  onClick={() => navigate('/shops')}
                >
                  {ComponentText.SHOP_SECTION_MORE_BUTTON}
                </button>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

export default IndexPage;

export const query = graphql`
  query {
    siteConfig {
      path {
        shop
        hospital
        etc
      }
    }
    allShop {
      edges {
        node {
          shopId
          name
          cities
          categories
          openTime
        }
      }
    }
    dailyReport {
      infected
      cured
      death
      updatedAt
      source {
        name
        url
      }
    }
  }
`;
