import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FolderItem from './FolderItem';

export class Folder extends Component {
  onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("Text", this.props.folder.id);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData('Text');
    
    this.props.drop(id, this.props.folder.id);
  }

  onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onFolderContextMenu(this.props.folder.id, e.pageX, e.pageY);
  }

  onDoubleClick = (e) => {
    e.stopPropagation();
    if(!this.props.folderRoot.includes(this.props.folder.id)) {
      this.props.open(this.props.folder.id);
    }
  }

  changeExpansion = (e) => {
    const { modifyItem, folder } = this.props;
    modifyItem({
      ...folder,
      expanded: !folder.expanded
    });
  }

  expanded = () => {
    const { folder, folders, folderRoot, items, drop, onFolderContextMenu, onItemContextMenu, open, modifyItem } = this.props;
    return (
      <div>
        {folder.folders.map(x => <Folder key={x} folders={folders} folder={folders[x]} folderRoot={folderRoot} items={items} drop={drop} onFolderContextMenu={onFolderContextMenu} onItemContextMenu={onItemContextMenu} open={open} modifyItem={modifyItem} />)}
        {folder.items.map(x => <FolderItem key={x} item={items[x]} onItemContextMenu={onItemContextMenu} open={open} />)}
      </div>
    );
  }
  
  render() {
    const { folder } = this.props;
    const folderExpansion = folder.expanded ? 'angle-down' : 'angle-right';
    return (
      <div className="folder" onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} draggable="true" onContextMenu={this.onContextMenu} onDoubleClick={this.onDoubleClick}>
        <FontAwesomeIcon icon={folderExpansion} className="folder-expansion-icon" onClick={this.changeExpansion} />
        <FontAwesomeIcon icon="folder" className="folder-icon" />
        {folder.name}
        {folder.expanded && this.expanded()}
      </div>
    );
  }
}

Folder.propTypes = {
  folders: PropTypes.object.isRequired,
  folder: PropTypes.object.isRequired,
  folderRoot: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  drop: PropTypes.func.isRequired,
  onFolderContextMenu: PropTypes.func.isRequired,
  onItemContextMenu: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  modifyItem: PropTypes.func.isRequired
};

export default Folder;
