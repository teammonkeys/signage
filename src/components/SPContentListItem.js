import React from "react";

class SPContentListItem extends React.Component {
  setContent = async () => {
    //const contentFile = await fetchSPFile(this.props.fileType, this.props.url);
    const zoneIndex = this.props.zoneIndex;
    if (this.props.category === "document") {
      //const contentItem = <img src={contentFile} />;
      //this.props.setContent(contentFile, 0);
      //this.props.setContent(contentItem, zoneIndex);
    } else {
      console.log("Invalid file");
    }
  };

  render() {
    return (
      <div onDoubleClick={this.setContent}>
        <span>{this.props.name}</span>
        <span>{this.props.url}</span>
      </div>
    );
  }
}

export default SPContentListItem;
