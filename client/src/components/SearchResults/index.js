import React from "react";
import "./style.css";
import Jumbotron from "../Jumbotron";

function itemJSON(result) {
  return {title: result.volumeInfo.title,
  author: result.volumeInfo.authors[0],
  synopsis: result.volumeInfo.description,
  imageURL: result.volumeInfo.imageLinks.thumbnail,
  previewLink:result.volumeInfo.previewLink
}
}; 

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {checkResults(!props.results)&&<p className = "no-result">No results found. Please try a different search.</p>}
      {checkResults(props.results)&&(props.results.map(result => (checkVolumnInfo(result)) && (
        <li key={result.id} className="list-group-item">
          <h1>{result.volumeInfo.title}</h1>
          <a type="view" href={result.volumeInfo.previewLink} target = "_blank" className="btn btn-submit btn-view">
            View
          </a>
          <button type="save" onClick={() => props.handleSaveItem(itemJSON(result))} className="btn btn-submit btn-save">
            Save
          </button>
          <p>Written By {result.volumeInfo.authors[0]}</p>
          <img className = "inline inline-image" src={result.volumeInfo.imageLinks.thumbnail} alt="thumbnail"/>
          <p className = "inline-description inline">{result.volumeInfo.description}</p>
        </li>

      )))}
    </ul>
  );
};

function checkVolumnInfo(result) {
  return (!!result && !!result.volumeInfo && !!result.volumeInfo.imageLinks && !!result.volumeInfo.description&& !!result.volumeInfo.authors);
};

function checkResults(results){
  return(!!results); 
}

// function checkImageLinks(volumeInfo){
//   return (!!volumeInfo.imageLinks); 
// }; 

export default SearchResults;
