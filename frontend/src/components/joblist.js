import React, { Component } from "react";
import Job from "./jobitem";

export default class JobList extends Component {
    constructor(props) {
      super(props);
      console.log("in the joblist constructor")
      console.log(this.props.joblist);
    }
  

    render() {
      var jobs = this.props.joblist.map((item, key) =>
          <Job key = {key}
               job = {item}/>
      );
      return (
        <div>
            <div>
                {jobs}
            </div>
        </div>
      );
    }
  }

