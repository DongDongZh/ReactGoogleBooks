import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SavedResults from "../components/SavedResults";
import Alert from "../components/Alert";
import "./style.css";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer"

class Saved extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    error: "",
    link:""
  };

  // won't run until it's initially run one time 
  componentDidMount() {
    this.getSavedBooks();
  };

   getSavedBooks(){
    API.getBooks()
    .then(res => this.setState({results:res.data}))
    .catch(err => console.log(err));
  }


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

  // saveItem = event => {
  //   event.preventDefault();
  //   API.saveBook(this.state.search)
  //     .then(res => {
  //       if (res.data.status === "error") {
  //         throw new Error(res.data.message);
  //       }
  //       this.setState({ results: res.data.items, error: "" });
  //     })
  //     .catch(err => this.setState({ error: err.message }));
  // };

  DeleteItem = (id) =>{
      API.deleteBook(id)
        .then(res => {
          this.getSavedBooks(API);
          if (res.data.status === "error") {
            throw new Error(res.data.message);
          }
        })
        .catch(err => this.setState({ error: err.message }));
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
          <SavedResults 
          // handleSaveItem = {this.saveItem}
          results={this.state.results}
          DeleteItem = {this.DeleteItem}/>
          {/* <p>{JSON.stringify(this.state.results)}</p> */}
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default Saved;
