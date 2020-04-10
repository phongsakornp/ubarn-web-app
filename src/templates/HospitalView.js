import React from 'react';
import { navigate } from '@reach/router';
import * as R from 'ramda';

// import { shopServiceToText } from 'data/convert';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import * as bankSVG from 'images/bank';

const ComponentText = {
  DONATE_NEED_SECTION_TITLE: 'ขอรับบริจาคอุปกรณ์ทางการแพทย์',
  DONATE_CONTACT_SECTION_TITLE: 'ช่องทางบริจาค',
  BANK_TITLE: 'ธนาคาร',
  BANK_BRANCH_TITLE: 'สาขา',
  BANK_ACCOUNT_TITLE: 'เลขที่บัญชี',
};

const allBank = {
  ktb: { name: 'กรุงไทย', icon: bankSVG.ktb, color: '#1ba5e1' },
  scb: { name: 'ไทยพาณิชย์', icon: bankSVG.scb, color: '#4e2e7f' },
  bbl: { name: 'กรุงเทพ', icon: bankSVG.bbl, color: '#1e4598' },
  bay: { name: 'กรุงศรีอยุธยา', icon: bankSVG.bay, color: '#fec43b' },
  kbank: { name: 'กสิกรไทย', icon: bankSVG.kbank, color: '#138f2d' },
  tmb: { name: 'ทหารไทย', icon: bankSVG.tmb, color: '#1279be' },
  tbank: { name: 'ธนชาติ', icon: bankSVG.tbank, color: '#fc4f1f' },
  gsb: { name: 'ออมสิน', icon: bankSVG.gsb, color: '#eb198d' },
};

const HospitalView = ({ pageContext: { hospital, siteConfig } }) => {
  // console.log(`Hospital`, hospital);

  const goBack = () => {
    navigate(-1);
  };

  const getEquipment = id => {
    return siteConfig.hospital.equipments.find(eqm => eqm.id === id);
  };

  const donateNeeds = R.path(['donate', 'needs'])(hospital) || [];
  const donateBy = R.path(['donate', 'by'])(hospital) || [];

  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Hospital" />
            <div className={'flex flex-col w-full max-w-screen-lg'}>
              <div className="relative">
                <img
                  src={`${siteConfig.path.hospital}/${hospital.hospitalId}/cover.jpg`}
                  alt="Shop cover"
                  className="object-cover w-full h-48"
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
                <div className="mt-3 text-2xl font-bold">{hospital.name}</div>
                <div className="flex">
                  <p className="text-sm leading-tight text-gray-700">
                    {R.path(['contact', 'address'])(hospital)}
                  </p>
                </div>
                <div className="flex items-center mt-3">
                  <i className={'text-indigo-600 fas fa-phone'}></i>
                  <div
                    className={
                      'tracking-wider text-indigo-600 font-semibold ml-3'
                    }
                  >
                    {R.path(['contact', 'phone'])(hospital)}
                  </div>
                </div>
              </div>

              <hr className="mt-4 border-pink-200" />

              <div className="flex flex-col w-full h-full px-5 py-8 bg-pink-100">
                <div className="text-lg font-bold text-center text-pink-900 ">
                  {ComponentText.DONATE_NEED_SECTION_TITLE}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {donateNeeds.map(need => {
                    return (
                      <div
                        key={need.id}
                        className="flex items-center justify-center h-20 p-3 bg-white rounded-lg"
                      >
                        <div className="text-center text-pink-900">
                          {R.path(['name'])(getEquipment(need.id))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 text-lg font-bold text-center text-pink-900 ">
                  {ComponentText.DONATE_CONTACT_SECTION_TITLE}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  {donateBy.map((by, idx) => {
                    switch (by.type) {
                      case 'direct': {
                        const infos = by.infos || [];
                        return (
                          <div
                            key={`${by.type}-${idx}`}
                            className="overflow-hidden bg-pink-600 rounded-lg"
                          >
                            <div className="py-4 font-bold text-center text-pink-100 bg-pink-500">
                              {`${R.path(['title'])(by)}`}
                            </div>
                            <div className="py-5">
                              {infos.map(info => {
                                return (
                                  <div
                                    key={info}
                                    className="text-center text-pink-100 leading-7"
                                  >
                                    {info}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      case 'bank-transfer': {
                        const bankId = R.path(['bank', 'id'])(by);
                        const bankInfo = R.has(bankId, allBank)
                          ? allBank[bankId]
                          : null;
                        const bank = {
                          name: bankInfo && bankInfo.name,
                          branch: R.path(['bank', 'branch'])(by),
                          account: R.path(['bank', 'account'])(by),
                          icon: bankInfo.icon,
                          color: bankInfo.color,
                        };
                        const infos = by.infos || [];
                        return (
                          <div
                            key={`${by.type}-${idx}`}
                            className="overflow-hidden bg-pink-600 rounded-lg"
                          >
                            <div className="py-4 font-bold text-center text-pink-100 bg-pink-500">
                              {`${R.path(['title'])(by)}`}
                            </div>
                            <div className="flex items-center justify-center mt-5">
                              <div
                                style={{ background: bankInfo.color }}
                                className="w-12 h-12 p-2 rounded-lg lg:w-16 lg:h-16"
                              >
                                <img
                                  src={bankInfo.icon}
                                  alt="bank"
                                  className="object-contain w-full h-full"
                                />
                              </div>
                              <div className="flex flex-col justify-center ml-4">
                                <div className="font-semibold text-pink-100">
                                  {`
                                ${ComponentText.BANK_TITLE}${bank.name}
                                ${ComponentText.BANK_BRANCH_TITLE}${bank.branch}
                              `}
                                </div>
                                <div className="font-semibold text-pink-100">
                                  {`${ComponentText.BANK_ACCOUNT_TITLE} ${bank.account}`}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 pb-5">
                              {infos.map(info => {
                                return (
                                  <div
                                    key={info}
                                    className="text-center text-pink-100"
                                  >
                                    {info}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      case 'note': {
                        const infos = by.infos || [];
                        return (
                          <div
                            key={`${by.type}-${idx}`}
                            className="overflow-hidden bg-teal-600 rounded-lg"
                          >
                            <div className="py-4 font-bold text-center text-pink-100 bg-teal-500">
                              {`${R.path(['title'])(by)}`}
                            </div>
                            <div className="py-5">
                              {infos.map(info => {
                                return (
                                  <div
                                    key={info}
                                    className="text-center text-pink-100 leading-7"
                                  >
                                    {info}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      default: {
                        return null;
                      }
                    }
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
export default HospitalView;
