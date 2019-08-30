import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createItem } from '../../actions/folderActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <FontAwesomeIcon icon="image" onClick={() => this.props.createItem('folder_graphics')} size="lg" className="toolbar-icon" />
        <FontAwesomeIcon icon="volume-up" onClick={() => this.props.createItem('folder_audio')} size="lg" className="toolbar-icon" />
        <FontAwesomeIcon icon="file-code" onClick={() => this.props.createItem('folder_functions')} size="lg" className="toolbar-icon" />
        <FontAwesomeIcon icon="cube" onClick={() => this.props.createItem('folder_objects')} size="lg" className="toolbar-icon" />
        <FontAwesomeIcon icon="tv" onClick={() => this.props.createItem('folder_scenes')} size="lg" className="toolbar-icon" />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createItem: (id) => {
      dispatch(createItem(id));
    }
  };
}

export default connect(null, mapDispatchToProps)(Toolbar)
