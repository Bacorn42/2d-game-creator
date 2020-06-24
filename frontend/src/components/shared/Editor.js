import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Editor.css";
import tokenize from "../../2dgs/tokenize";
import { modifyItem } from "../../actions/folderActions";

export function Editor({ id, item, modifyItem, names }) {
  const [tokens, setTokens] = useState([]);
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    document.getElementById(id).value = item.code;
    setTokens(tokenize(document.getElementById(id).value, item.args, names));
  }, [id, item.code, item.args, names]);

  const onInput = (e) => {
    modifyItem({
      ...item,
      code: e.target.value,
    });
    setTokens(tokenize(document.getElementById(id).value, item.args, names));
  };

  const getLineCount = () => {
    if (tokens.length === 0) {
      return 1;
    }
    return tokens[tokens.length - 1].line;
  };

  const onScroll = (e) => {
    setScrollAmount(e.target.scrollLeft);
    document.getElementById(id).scrollLeft = e.target.scrollLeft;
    document.getElementById(id + "_pre").scrollLeft = e.target.scrollLeft;
  };

  return (
    <div className="editor-content" onScroll={onScroll}>
      <div className="editor-container">
        <div className="editor-line-numbers">
          {[...Array(getLineCount())].map((x, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          id={id}
          className="editor-textarea editor-style"
          onInput={onInput}
          spellCheck={false}
          wrap={"off"}
          style={{ left: 60 + scrollAmount }}
        />
        <pre id={id + "_pre"} className="editor-result editor-style">
          {tokens.map((x, i) => (
            <span key={i} className={x.type + " " + x.secondaryType}>
              {x.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemType = ownProps.id.split("_")[0];
  const items = state.folderReducer;
  const names = [
    ...Object.keys(items.graphics).map((x) => items.graphics[x].name),
    ...Object.keys(items.audio).map((x) => items.audio[x].name),
    ...Object.keys(items.functions).map((x) => items.functions[x].name),
    ...Object.keys(items.objects).map((x) => items.objects[x].name),
    ...Object.keys(items.scenes).map((x) => items.scenes[x].name),
    ...Object.keys(items.animations).map((x) => items.animations[x].name),
  ];
  return {
    item: state.folderReducer[itemType][ownProps.id],
    names: names.filter(Boolean),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
  };
};

Editor.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
