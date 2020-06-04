import React from "react";
import PropTypes from "prop-types";
import Window from "./Window";

export function WindowFolders({ id }) {
  return <Window id={id} />;
}

WindowFolders.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WindowFolders;
