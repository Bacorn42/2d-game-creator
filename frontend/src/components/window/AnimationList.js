import React from 'react';

function AnimationList(props) {
  const { item, animations, openAnimation } = props;
  if(item.animations.length === 0) {
    return (<div>None</div>);
  }
  return (
    <div className="animation-list">
      <select multiple={true} onChange={openAnimation} size={Math.min(item.animations.length, 10)}>
        {item.animations.map(x => <option key={x} value={x}>{animations[x].name}</option> )}
      </select>
    </div>
  );
}

export default AnimationList;