import React, {Component} from 'react';

class SelectOption extends Component {
  render() {
    return (<option value={this.props.dataItem.key}>{this.props.dataItem.value}</option>)
  }
}

class DropdownMenu extends Component {

  render() {
    let options = [];
    if (this.props.selectableData) {
      let selectableData = this.props.selectableData;
      options = selectableData.map((dataItem) => <SelectOption key={dataItem.key} dataItem={dataItem}/>);
    }
    return (
      <div className="form-group">
        {!this.props.type ?
          <label>Select students to assign</label>
        : null}

        <select className="form-control" onChange={this.props.handleInputChange} name={this.props.name}>
          {options}
        </select>
      </div>
    )
  }
}

export default DropdownMenu;
