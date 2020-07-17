import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ListDisplay.css";

function ListDisplay({
  name,
  container,
  getName,
  onChange,
  onButtonPlus,
  onButtonMinus,
  onButtonUp,
  onButtonDown,
}) {
  return (
    <div>
      <div>{name}</div>
      <div className="list-display-buttons">
        {onButtonPlus && (
          <button onClick={onButtonPlus}>
            <FontAwesomeIcon icon="plus" className="list-display-icon" />
          </button>
        )}
        {onButtonMinus && (
          <button onClick={onButtonMinus}>
            <FontAwesomeIcon icon="minus" className="list-display-icon" />
          </button>
        )}
        {onButtonUp && (
          <button onClick={onButtonUp}>
            <FontAwesomeIcon icon="angle-up" className="list-display-icon" />
          </button>
        )}
        {onButtonDown && (
          <button onClick={onButtonDown}>
            <FontAwesomeIcon icon="angle-down" className="list-display-icon" />
          </button>
        )}
      </div>
      <div className="list-display">
        {container.length === 0 ? (
          <div>None</div>
        ) : (
          <select
            multiple
            onChange={onChange}
            size={Math.min(container.length, 10)}
          >
            {container.map((x) => (
              <option key={x} value={x}>
                {getName(x)}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

ListDisplay.propTypes = {
  name: PropTypes.string,
  container: PropTypes.any.isRequired,
  getName: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onButtonPlus: PropTypes.func,
  onButtonMinus: PropTypes.func,
  onButtonUp: PropTypes.func,
  onButtonDown: PropTypes.func,
};

export default ListDisplay;
