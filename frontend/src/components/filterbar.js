import React, { Component } from "react";
 

export default class Filter extends Component {
    constructor(props) {
        super(props);
      }
    
  //filter on: company, level, location, and category

    render() {
      return (
        <div  className="filter" >
          
            <form>
            <div className="row"> 
            <div className="col">
                    <input 
                        name = "title"
                        value = {this.props.data.title}
                        onChange={this.props.handleInputChange}
                        type="text" className="form-control" placeholder="Title"/>
                </div>
                <div className="col">
                    <input 
                        name = "company"
                        value = {this.props.data.company}
                        onChange={this.props.handleInputChange}
                        type="text" className="form-control" placeholder="Company"/>
                </div>
                <div className="col">
                <input
                name = "category"
                value = {this.props.data.category}
                onChange={this.props.handleInputChange}
                className="form-control" placeholder="Industry" />
  
                </div>
                <div className="col">
                    <input 
                    name = "location"
                    value = {this.props.data.location}
                    onChange={this.props.handleInputChange}
                    type="text" className="form-control" placeholder="Location"/>
                </div>
                <div className="col">
                <select 
                 name = "level"
                 value = {this.props.data.level}
                 onChange={this.props.handleInputChange}
                 className="form-control" id="sel1">
                    <option value = "all">include all</option>
                    <option value = "0">Junior</option>
                    <option value = "1">Mid Level</option>
                    <option value = "2">Senior</option>
                    <option value = "3">Executive</option>
                </select>
                </div>
            </div>
            </form>
        </div>
      );
    }
  }
  