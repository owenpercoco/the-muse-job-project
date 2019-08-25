import React, { Component } from "react";
import Square from './jobitem';
import Filter from './filterbar';
import axios from 'axios';
import JobList from "./joblist";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter :{
              company: '',
              level: 'all',
              location: '',
              category: '',
            },
            jobList : [],
            displayList : [],
            industries : [],
            companies : [],
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
      }


    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var filter_ = this.state.filter;
        filter_[name] = value;

        this.setState({
          filter: filter_
        });

        this.filterList();
      }
    
      filterList(){
          console.log(this.state.filter);
          console.log(this.state.jobList);
          //this.refreshList();
          //company
          var tmp_list = [];
          var company_text = this.state.filter.company;
          var location_text = this.state.filter.location;
          for (var i = 0; i < this.state.jobList.length; i++ ){
            if(this.state.jobList[i].company.name.includes(company_text) && this.state.jobList[i].location.includes(location_text)){
                for (var j = 0; j < this.state.jobList[i].company.industry.length; j++){
                    if(this.state.jobList[i].company.industry[j].includes(this.state.filter.category)){
                        tmp_list.push(this.state.jobList[i]);
                        break;
                    }
                }
                
                if(this.state.filter.level != 'all'){
                    if(this.state.jobList[i].level === this.state.filter.level){
                        tmp_list.push(this.state.jobList[i]);
                    }
                }else{
                    tmp_list.push(this.state.jobList[i]);
                }
                
            }
          }
          this.setState({
              displayList: tmp_list
          })
      }

      componentDidMount() {
        this.refreshList();
      }

      refreshList(){
        axios
          .get("http://localhost:8000/api/jobs/")
          .then(res => this.setState({ jobList: res.data, displayList: res.data }))
          .catch(err => console.log(err));
      };


    render() {
      return (
        <div className="container">
          <div className="row text-center">
            <div className="main-body">
              <Filter data = {this.state.filter}
                      handleInputChange= {this.handleInputChange}></Filter>
              <JobList joblist = {this.state.displayList}></JobList>
            </div>
          </div>
        </div>
      );
    }
  }

