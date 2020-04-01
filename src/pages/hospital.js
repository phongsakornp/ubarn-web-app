import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const ComponentText = {
  HERO_TITLE: 'โรงพยาบาล',
  HERO_SUBTITLE: '',
  HOSPITAL_MEDICAL_NEED_TITLE: 'ความต้องการ',
};

const medicalText = {
  fMask: 'หน้ากากอนามัยชนิดใช้แล้วทิ้ง',
  n95Mask: 'หน้ากาก N95',
  handGel: 'แอลกอฮอล์เจล 450 กรัม',
  ppe: 'ชุดป้องกันร่างกาย (Cover All)',
  thermoscan: 'เครื่องวัดไข้',
};

const medicalUnitText = {
  fMask: 'ชิ้น',
  n95Mask: 'ชิ้น',
  handGel: 'ขวด',
  ppe: 'ชุด',
  thermoscan: 'ชุด',
};

const medical = {
  fMask: { value: 0 },
  n95Mask: { value: 0 },
  handGel: { value: 0 },
  ppe: { value: 0 },
  thermoscan: { value: 0 },
};

const trang = {
  name: 'โรงพยาบาลศูนย์ตรัง',
  medicalNeed: {
    ...medical,
    fMask: { value: 20000 },
    n95Mask: { value: 1000 },
    handGel: { value: 400 },
    ppe: { value: 1000 },
    thermoscan: { value: 5 },
  },
};

const huayyod = {
  name: 'โรงพยาบาลชุมชนห้วยยอด',
  medicalNeed: {
    ...medical,
    fMask: { value: 10000 },
    n95Mask: { value: 100 },
    handGel: { value: 120 },
    ppe: { value: 500 },
    thermoscan: { value: 5 },
  },
};

const hospitalList = [trang, huayyod];

const Market = () => {
  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Marketplace" />
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center">
                <div className="mt-0 mb-2 text-xl font-normal font-bold leading-normal text-black lg:text-4xl">
                  {ComponentText.HERO_TITLE}
                </div>
              </div>
              <div className="flex flex-col w-full max-w-screen-lg">
                {hospitalList.map(hospital => {
                  return (
                    <div className="flex flex-col p-5 mx-5 mt-5 bg-indigo-100 rounded md:mx-0">
                      <div className="text-lg font-semibold">
                        {hospital.name}
                      </div>
                      <div className="mt-3 text-base font-semibold text-red-700">
                        {ComponentText.HOSPITAL_MEDICAL_NEED_TITLE}
                      </div>
                      <div className="flex flex-col py-3">
                        {Object.keys(hospital.medicalNeed).map((medId, idx) => {
                          return (
                            <>
                              <div
                                className={
                                  (idx === 0 ? 'mt-0' : 'mt-3') + ' flex w-full'
                                }
                              >
                                <div className="text-sm flex-shrink-0">
                                  {medicalText[medId]}
                                </div>
                                <div className="flex justify-end w-full text-sm">
                                  {`${parseInt(
                                    hospital.medicalNeed[medId].value
                                  ).toLocaleString('en', {})} ${
                                    medicalUnitText[medId]
                                  }`}
                                </div>
                              </div>
                              <hr />
                            </>
                          );
                        })}
                      </div>
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
export default Market;
