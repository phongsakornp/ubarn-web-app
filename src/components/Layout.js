/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import NavBar from "./NavBar"

const Layout = ({ renderContent }) => {
  const getInnerHeight = () => {
    return typeof window !== `undefined` ? window.innerHeight : 0
  }

  const [innerHeight, setInnerHeight] = React.useState(getInnerHeight())

  React.useEffect(() => {
    let vh = innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }, [innerHeight])

  const handleResize = () => {
    setInnerHeight(window.innerHeight)
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  console.log(`windowDimension`, innerHeight)

  return (
    <div className="bg-gray-200 h-full">
      <NavBar />
      <div className="">
        <main>{renderContent({ innerHeight: innerHeight - 62 })}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    </div>
  )
}
Layout.propTypes = {
  renderContent: PropTypes.func,
}
Layout.defaultProps = {
  renderContent: () => <div />,
}
export default Layout
