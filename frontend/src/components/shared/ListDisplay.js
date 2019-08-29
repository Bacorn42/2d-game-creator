import React from 'react';
import PropTypes from 'prop-types';

function ListDisplay(props) {
  const { name, container, getName, onChange, onButtonPlus, onButtonMinus, onButtonUp, onButtonDown } = props;
  return (
    <div>
      <div>{name}</div>
      <button onClick={onButtonPlus}>+</button>
      <button onClick={onButtonMinus}>-</button>
      <button onClick={onButtonUp}>↑</button>
      <button onClick={onButtonDown}>↓</button>
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