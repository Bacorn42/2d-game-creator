import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Editor.css";
import tokenize from "../../2dgs/tokenize";

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      scrollAmount: 0,
    };
  }

  // TEMPORARY
  getNames = () => {
    return [];
    const {
      graphics,
      audio,
      functions,
      objects,
      scenes,
      animations,
    } = this.props;
    return [
      ...Object.keys(graphics).map((x) => graphics[x].name),
      ...Object.keys(audio).map((x) => audio[x].name),
      ...Object.keys(functions).map((x) => functions[x].name),
      ...Object.keys(objects).map((x) => objects[x].name),
      ...Object.keys(scenes).map((x) => scenes[x].name),
      ...Object.keys(animations).map((x) => animations[x].name),
    ];
  };

  onInput = (e) => {
    const { item, modifyItem, args } = this.props;
    modifyItem({
      ...item,
      code: e.target.value,
    });
    this.setState({
      ...this.state,
      tokens: tokenize(
        document.getElementById(item.id).value,
        args,
        this.getNames()
      ),
    });
  };

  componentDidMount() {
    const { item, args } = this.props;
    document.getElementById(item.id).value = item.code;
    this.setState({
      ...this.state,
      tokens: tokenize(item.code, args, this.getNames()),
    });
  }

  getLineCount = () => {
    const { tokens } = this.state;
    if (tokens.length === 0) {
      return 1;
    }
    return tokens[tokens.length - 1].line;
  };

  onScroll = (e) => {
    this.setState({
      ...this.state,
      scrollAmount: e.target.scrollLeft,
    });
    document.getElementById(this.props.item.id).scrollLeft =
      e.target.scrollLeft;
    document.getElementById(this.props.item.id + "_pre").scrollLeft =
      e.target.scrollLeft;
  };

  render() {
    const { item } = this.props;
    return (
      <div className="editor-content" onScroll={this.onScroll}>
        <div className="editor-container">
          <div className="editor-line-numbers">
            {[...Array(this.getLineCount())].map((x, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            id={item.id}
            className="editor-textarea editor-style"
            onInput={this.onInput}
            spellCheck={false}
            wrap={"off"}
            style={{ left: 60 + this.state.scrollAmount }}
          />
          <pre id={item.id + "_pre"} className="editor-result editor-style">
            {this.state.tokens.map((x, i) => (
              <span key={i} className={x.type + " " + x.secondaryType}>
                {x.value}
              </span>
            ))}
          </pre>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  item: PropTypes.object.isRequired,
  modifyItem: PropTypes.func.isRequired,
  args: PropTypes.array.isRequired,
};

export default Editor;
