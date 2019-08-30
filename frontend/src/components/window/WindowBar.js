import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getIcon from '../../utils/getIcon';

export class WindowBar extends Component {
  onDragStart = (e) => {
    if(this.props.maximized) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    e.dataTransfer.setData("Text", JSON.stringify({
      id: this.props.item.id,
      offsetX: e.pageX - this.props.x,
      offsetY: e.pageY - this.props.y
    }));
  }

  onClick = (e) => {
    e.stopPropagation();
    this.props.closeWindow(this.props.item.id);
  }

  render() {
    const maximizeIcon = this.props.maximized ? 'window-restore' : 'window-maximize';
    return (
      <div className="window-bar" draggable="true" onDragStart={this.onDragStart}>
        <div className="window-bar-title">
          <FontAwesomeIcon icon={getIcon(this.props.item.id)} className="window-bar-title-icon" />
          <div>{this.props.item.name}</div>
        </div>
        <div className="window-bar-icons">
          <FontAwesomeIcon icon={ maximizeIcon } size="lg" className="window-bar-maximize" onClick={this.props.changeMaximize} />
          <FontAwesomeIcon icon="window-close" size="lg" className="window-bar-close" onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

WindowBar.propTypes = {
  item: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  closeWindow: PropTypes.func.isRequired,
  maximized: PropTypes.bool.isRequired,
  changeMaximize: PropTypes.func.isRequired
}

export default WindowBar;
