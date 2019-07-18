import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";
import "./style.css";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer"

class Search extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    error: "",
    link:""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  // won't run until it's initially run one time 
  // componentDidMount() {
  //   API.getBaseBreedsList()
  //     .then(res => this.setState({ breeds: res.data.message }))
  //     .catch(err => console.log(err));
  // }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchBook(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.items, error: "" });
        // console.log(res.data.items);
        
      })
      .catch(err => this.setState({ error: err.message }));
  };

  // viewDetail = event => {
  //   event.preventDefault();
  //   API.searchBook(this.state.search)
  //     .then(res => {
  //       if (res.data.status === "error") {
  //         throw new Error(res.data.message);
  //       }
  //       this.setState({ link: res.data.items.selfLink, error: "" });

  //     })
  //     .catch(err => this.setState({ error: err.message }));
  // };

  saveItem = (itemJSON) => {
    if (itemJSON.title && itemJSON.author) {
      API.saveBook(itemJSON)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
    console.log(itemJSON);
  };

  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
         <Jumbotron>
          <h1 className="text-center Intro Intro-title">Google Books Search</h1>
          <h4 className = "text-center Intro">Search for and Save Books of Interest</h4>
          </Jumbotron>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            breeds={this.state.breeds}
          />
          <SearchResults 
          handleSaveItem = {this.saveItem}
          results={this.state.results}/>
          {/* <p>{JSON.stringify(this.state.results)}</p> */}
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default Search;
