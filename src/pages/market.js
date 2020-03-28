import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const ComponentText = {
  HERO_TITLE: "ตลาด",
  HERO_SUBTITLE: "",
}

const Market = () => {
  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Marketplace" />
            <div className="flex flex-col items-center justify-center bg-blue-100">
              <div className="flex flex-col items-center">
                <div className="mt-0 mb-2 text-xl font-normal font-bold leading-normal text-black lg:text-4xl">
                  {ComponentText.HERO_TITLE}
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
