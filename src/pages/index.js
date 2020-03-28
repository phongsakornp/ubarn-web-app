import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const ComponentText = {
  HERO_TITLE: "สถานการณ์ COVID-19 จังหวัดตรัง",
  HERO_SUBTITLE: "",
}

const Stat = ({ title, className }) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center w-32 h-32 bg-white rounded-md shadow lg:w-40 shadow-sm ${className}
      `}
    >
      <div className="text-sm font-bold">{title}</div>
    </div>
  )
}

const IndexPage = () => {
  return (
    <Layout
      renderContent={({ innerHeight }) => {
        return (
          <>
            <Seo title="Home" />
            <div
              className="flex flex-col items-center justify-center"
              style={{ height: innerHeight }}
            >
              <div className="flex flex-col items-center">
                <div className="mt-0 mb-2 text-xl font-normal font-bold leading-normal text-black lg:text-4xl">
                  {ComponentText.HERO_TITLE}
                </div>
              </div>
              <div className="conainter flex items-center justify-evenly w-full lg:w-2/3 mt-16 ">
                <Stat title="จำนวน" />
                <Stat title="จำนวน" />
                <Stat title="จำนวน" className="hidden lg:flex" />
              </div>
            </div>
          </>
        )
      }}
    />
  )
}

export default IndexPage
