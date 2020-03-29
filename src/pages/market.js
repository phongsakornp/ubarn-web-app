import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { ReactComponent as FoodSvg } from "images/food.svg"
import { ReactComponent as BeverageSvg } from "images/beverage.svg"

const ComponentText = {
  HERO_TITLE: "ตลาด",
  HERO_SUBTITLE: "",
  SELECT_CITY: "เลือกอำเภอ",
  SELECT_TYPE: "เลือกประเภท",
}

const Market = () => {
  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Marketplace" />
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg">
              <div className="flex flex-col items-center">
                <div className="mt-0 mb-2 text-xl font-normal font-bold leading-normal text-black lg:text-4xl">
                  {ComponentText.HERO_TITLE}
                </div>
              </div>

              <div className={"w-full p-5 flex flex-col justify-start"}>
                <div className={"text-sm lg:text-base"}>
                  {ComponentText.SELECT_CITY}
                </div>
                <div className="relative inline-block w-64 mt-2">
                  <select
                    className={
                      "block appearance-none w-full bg-transparent" +
                      " hover:border-gray-500 border-b-2 rounded-none font-bold" +
                      " py-2 pr-8 leading-tight focus:outline-none"
                    }
                  >
                    <option>ทับเที่ยง</option>
                    <option>ย่านตาขาว</option>
                    <option>นาโยง</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"flex flex-col w-full p-5"}>
                <div className={"text-sm lg:text-base"}>
                  {ComponentText.SELECT_TYPE}
                </div>
                <div className={"flex w-full  mt-2"}>
                  <div className="flex flex-col">
                    <div
                      className={
                        "flex items-center justify-center rounded-md w-20 h-20 bg-red-200"
                      }
                    >
                      <FoodSvg
                        width="50"
                        height="50"
                        className={"m-auto h-full block"}
                      />
                    </div>
                    <div className={"mt-2 text-center text-base text-gray-700"}>
                      อาหาร
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={
                        "flex items-center justify-center rounded-md w-20 h-20 ml-4  bg-red-200"
                      }
                    >
                      <BeverageSvg
                        width="50"
                        height="50"
                        className={"block m-auto h-full"}
                      />
                    </div>
                    <div className={"text-center text-base text-gray-700 mt-2"}>
                      เครื่องดื่ม
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }}
    />
  )
}
export default Market
