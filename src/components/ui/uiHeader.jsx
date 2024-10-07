import React from "react"
import PropTypes from "prop-types"

const UiHeader = ({ title, level = 1 }) => {
  const HeadingTag = `h${level}` // Dynamically set the heading level

  return (
    <HeadingTag
      className={`text-slate-600 dark:text-white text-${
        level * 2
      }xl font-bold mb-4`}
    >
      {title}
    </HeadingTag>
  )
}

UiHeader.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]), // Validate heading level
}

export default UiHeader
