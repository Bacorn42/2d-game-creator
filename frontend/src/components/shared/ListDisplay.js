import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ListDisplay.css';

function ListDisplay(props) {
  const { name, container, getName, onChange, onButtonPlus, onButtonMinus, onButtonUp, onButtonDown } = props;
  return (
    <div>
      <div>{name}</div>
      <div className="list-display-buttons">
        <button onClick={onButtonPlus}><FontAwesomeIcon icon="plus" className="list-display-icon" /></button>
        <button onClick={onButtonMinus}><FontAwesomeIcon icon="minus" className="list-display-icon" /></button>
        <button onClick={onButtonUp}><FontAwesomeIcon icon="angle-up" className="list-display-icon" /></button>
        <button onClick={onButtonDown}><FontAwesomeIcon icon="angle-down" className="list-display-icon" /></button>
      </div>
      <div className="list-display">
        {container.length === 0 ? <div>None</div> :
        <select multiple={true} onChange={onChange} size={Math.min(container.length, 10)}>
          {container.map(x => <option key={x} value={x}>{getName(x)}</option> )}
        </select>
        }
      </div>
    </div>
  );
}

ListDisplay.propTypes = {
  name: PropTypes.string,
  container: PropTypes.any.isRequired,
  getName: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onButtonPlus: PropTypes.func.isRequired,
  onButtonMinus: PropTypes.func.isRequired,
  onButtonUp: PropTypes.func.isRequired,
  onButtonDown: PropTypes.func.isRequired
};

export default ListDisplay;