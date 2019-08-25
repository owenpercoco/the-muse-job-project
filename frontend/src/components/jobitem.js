import React, { Component } from "react";
 

export default class Job extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded : false,
        long_text: this.props.job.description.replace(/<\/?[^>]+(>|$)/g, ""),
        text : this.props.job.description.substring(0, 100).replace(/<\/?[^>]+(>|$)/g, ""),
        c_text : this.props.job.description.substring(0, 100).replace(/<\/?[^>]+(>|$)/g, ""),
      };
     this.expandText = this.expandText.bind(this)
    }
    
    //company: "HBO"
    //description: "<p><b>OVERALL SUMMARY</b><br><br>The Media Software Engineering (MSE) team at HBO enables media workflows using creative and pragmatic technology solutions. We are a software engineering group that develops and supports applications and workflows that ingest media assets as they show up at our doors and run it through the media supply chain by processing, managing, transforming, and delivering the assets to all HBO affiliates and partners.<br><br>We are a fundamental part of HBO-s innovation and success and realizing our mission requires a staff of highly motivated and technically flexible software professionals across a variety of disciplines: development, program management, testing, and design. We are hiring people to build a team that can create engaging, high-quality solutions, platforms, and interactive experiences.<br><br>We are looking for a hands-on Technical Leader with the knowledge, motivation, and energy to accelerate the efficiency of our engineering operations and implement scalable infrastructure on AWS. The successful candidate will work closely with product/project managers and development staff with a Devops mindset in the delivery, security, and operations of systems across our entire media supply chain.<br><br><b>PRIMARY RESPONSIBILITIES</b><br><ul><li>Develop and support automation patterns and processes that enable teams to deploy and maintain applications on AWS<br></li><li>Design and develop infrastructure-as-code for cloud native applications <br></li><li>Build and maintain infrastructure for security, monitoring, logging, and CI/CD on Jenkins<br></li><li>Work on architecture initiatives such as hybrid cloud strategy, container orchestration, and application lifecycle management<br></li><li>Troubleshoot and fix bugs, security vulnerabilities, and operational issues<br></li><li>Work closely with team members in a collaborative and agile environment<br></li></ul><br><b>REQUIREMENTS</b><br><ul><li>5+ years of established track record in architecting and implementing scalable, distributed, and highly available systems on cloud/hybrid environments<br></li><li>Expert knowledge in AWS resources such as VPC, subnets, network access control lists, security groups, EC2, S3 buckets, IAM, Route 53, Lambda, ECS, EKS<br></li><li>Hands-on experience with Ansible and Terraform.<br></li><li>Hands-on experience with Docker and Kubernetes<br></li><li>Hands-on experience with expert level knowledge of Linux/Unix, PowerShell<br></li><li>Experience supporting microservices architectures with REST APIs, MongoDB, RabbitMQ, Spring, Node.js, Java, and Python <br></li><li>Background in network architecture<br></li><li>Strong communication skills and an ability to interact with all levels of technical and non-technical personnel<br></li><li>Drive to master emerging technologies and share experiences with team members<br></li><li>Proven problem solving and critical thinking skills<br></li><li>Bachelor-s degree in computer science, engineering, or equivalent technical experience<br></li></ul><br><br></p>"
    //id: 44
    //location: "New York, NY"
    //name: "Technical Lead"
    //published_date: "2019-08-23T21:11:27.059600Z"
    //remote: false
    //salary_bottom: 120000
    //salary_top: 200000

    expandText(){
      console.log()
      if (this.state.expanded){
        this.setState({c_text : this.state.text})
      }else{
        this.setState({c_text : this.state.long_text})
      }
      this.setState({expanded : !this.state.expanded});
    }
    render() {
      return (
        <div className = "row"
          onClick={ this.expandText}
            >
          <div className = "job-container">
          <em className = "salary-text">{this.props.job.salary_bottom} - {this.props.job.salary_top}, {this.props.job.location}</em>
          <div className = "title-text">
            {this.props.job.name}
          </div>
          <div className = "description-text">
            {this.state.c_text}
          </div>
          <em className="company-text">{this.props.job.company.name}</em>
          </div>
        </div>
      );
    }
  }

