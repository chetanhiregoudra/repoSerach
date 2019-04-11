import React, { Component } from 'react';
import AxiosInstance from './services'
import './App.css';


class App extends Component {

	state={
		searchValue:"",
		searchResult:[],
		spinnerStatus:false
	}
	getSearchResult = () => {
		this.setState({spinnerStatus:true});
			const request = AxiosInstance.get(
				"https://api.github.com/search/repositories?q="+this.state.searchValue);
				request.then(({ data }) => {
					this.setState({searchResult:data.items,spinnerStatus:false})
				});
	}
	setSearchValue = (e) =>{
		this.setState({searchValue:e.target.value});
	}
	renderCards = (searchRepositoryCards) =>{
		let cardDetails = searchRepositoryCards.map(data =>{
				return (
					<div className="col-sm-3" key={data.id}>
				<div className="card" >
				<img className="card-img-top rounded-circle img-responsive" src={data.owner.avatar_url} alt="Card image" />
				<div className="card-body">
					<h4 className="card-title">{data.name}</h4>
					<div class="btn-group btn-group-justified">
						<a href="#" target="_blank" class="btn btn-default"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; {data.size}</a>
						<a href={data.forks_url} target="_blank" class="btn btn-default">
							<i class="fas fa-code-branch"></i>
								&nbsp;Forks&nbsp; {data.forks}
						</a>
						<a href={data.issues_url} target="_blank" class="btn btn-default">
							<i class="fas fa-info-circle"></i>
							&nbsp;Open Issues &nbsp;{data.open_issues}</a>
					</div>
						<p className="card-text">{data.description}</p>
					<a href={data.html_url} className="btn btn-primary stretched-link">VIEW PROFILE</a>
				</div>
			</div>
			</div>)
		})
		return cardDetails;
	}
  render() {
		console.log(this.state.searchResult)
    return (
      <div className="App">
        <div className="panel panel-primary">
					<div className="panel-heading"><h2>Git Repository Search</h2></div>
						<div className="panel-body">
							<div className="row">
								<div className="col-sm-3">
									<input type="text" placeholder="Enter search key" value={this.state.searchValue} className="form-control input" onChange={this.setSearchValue}/>
								</div>
								<div className="col-sm-2">
									<button type="button" className="btn btn-primary submit" onClick={this.getSearchResult}>Search</button>
								</div>
							</div>
						</div>
					</div>
					{this.state.spinnerStatus && (
						<div class="spinner-border" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					)}
					
					{this.state.searchResult.length > 0 && (
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h2>Git Repository Search Result</h2>
							</div>
							<div className="row">
							{this.renderCards(this.state.searchResult)}
							</div>
							
							
							
						</div>
					)}
					
			</div>
					
      
    );
  }
}

export default App;
