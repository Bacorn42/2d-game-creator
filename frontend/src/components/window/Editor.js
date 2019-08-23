import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Editor extends Component {
  onInput = (e) => {
    this.props.modifyItem({
      ...this.props.item,
      code: e.target.value
    });
  }

  componentDidMount() {
    const { item } = this.props;
    document.getElementById(item.id).value = item.code;
  }

  render() {
    const { item } = this.props;
    return (
      <div className="editor-content">
        <div className="editor-container">
          <textarea id={item.id} className="editor-textarea editor-style" onInput={this.onInput} spellCheck={false} />
          <pre className="editor-result editor-style">{item.code} </pre>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  item: PropTypes.object.isRequired,
  modifyItem: PropTypes.func.isRequired
}

export default Editor;