import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const ComponentText = {
  HERO_TITLE: 'สถานการณ์ COVID-19 จังหวัดตรัง',
  HERO_SUBTITLE: '',
  INFECT_TOTAL_STAT_TITLE: 'ติดเชื้อ',
  TREAT_STAT_TILE: 'กำลังรักษา',
  CURE_STAT_TITLE: 'หายแล้ว',
  DEATH_STAT_TITLE: 'เสียชีวิต',
  CASE_NUMBER: '#',
  CASE_SEX: 'เพศ',
  CASE_AGE: 'อายุ',
  CASE_AGE_UNIT: 'ปี',
};

const Api = {
  CASES_URL: 'https://covid19.th-stat.com/api/open/cases',
  PROVINCE_ID: 15,
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

const IndexPage = () => {
  const [infectData, setInfectData] = React.useState({
    cases: [],
    cures: [],
    deaths: [],
  });

  React.useEffect(() => {
    const fetchCaseData = async () => {
      const allCase = await axios.get(Api.CASES_URL);
      const caseByProvince = allCase.data.Data.filter(
        data => data.ProvinceId === Api.PROVINCE_ID
      );
      setInfectData(ifData => ({ ...ifData, cases: [...caseByProvince] }));
    };
    fetchCaseData();
  }, []);

  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Home" />
            <div className="flex flex-col items-center justify-center w-full h-full py-12 bg-gray-800">
              <div className="flex flex-col items-center">
                <div className="mt-0 mb-2 text-xl font-normal font-bold leading-normal text-gray-200 lg:text-4xl">
                  {ComponentText.HERO_TITLE}
                </div>
              </div>
              <div
                className={
                  'grid grid-cols-2 lg:grid-cols-4 gap-4' +
                  ' w-full px-5 mt-16 md:px-0 max-w-screen-md'
                }
              >
                <Stat
                  title={ComponentText.INFECT_TOTAL_STAT_TITLE}
                  value={infectData.cases.length}
                  cardClassName="bg-red-600"
                />

                <Stat
                  title={ComponentText.TREAT_STAT_TILE}
                  value={infectData.cases.length}
                  cardClassName="bg-orange-500 hidden md:flex"
                  titleClassName="text-orange-200"
                  valueClassName="text-orange-200"
                />

                <Stat
                  title={ComponentText.CURE_STAT_TITLE}
                  value={infectData.cures.length}
                  cardClassName="bg-green-600 hidden lg:flex"
                  titleClassName="text-green-200"
                  valueClassName="text-green-200"
                />

                <Stat
                  title={ComponentText.DEATH_STAT_TITLE}
                  value={infectData.deaths.length}
                  cardClassName="bg-black"
                  titleClassName="text-gray-200"
                  valueClassName="text-gray-200"
                />
              </div>

              <div className="flex items-center justify-center w-full mt-8 max-w-screen-md">
                <div className="flex flex-col w-full mx-5 bg-gray-400 rounded md:mx-0">
                  {infectData.cases.map((data, idx) => {
                    const confirmDate = moment(data.ConfirmDate, 'YYYY-MM-DD');
                    return (
                      <div
                        className="flex flex-col"
                        key={`${data.ConfirmDate}-${idx}`}
                      >
                        <div className="flex items-center p-3 text-gray-700 ">
                          <div className="w-12 text-sm font-semibold">{`${ComponentText.CASE_NUMBER}${data.No}`}</div>
                          <div className="w-20 ml-4 text-sm">{`${confirmDate.format(
                            'D MMM YY'
                          )}`}</div>
                          <div className="ml-4 text-sm">{`${data.Gender}`}</div>
                          <div className="text-sm ml-2">{`${data.Age} ${ComponentText.CASE_AGE_UNIT}`}</div>
                        </div>
                        {idx === infectData.cases.length - 1 ? null : <hr />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

export default IndexPage;
