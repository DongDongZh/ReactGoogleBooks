import React from "react";
import "./style.css";
// import Jumbotron from "../Jumbotron";

function SavedResults(props) {
  return (
    <ul className="list-group search-results">
      {/* {checkResults(!props.results)&&<p className = "no-result">No results found. Please try a different search.</p>} */}
      {props.results.map(result => (
        <li key={result.id} className="list-group-item">
          <h1>{result.title}</h1>
          <a type="view" href={result.previewLink} target = "_blank" className="btn btn-submit btn-view">
            View
          </a>
          <button type="delete" onClick={()=>props.DeleteItem(result._id)} className="btn btn-submit btn-delete">
            Delete
          </button>
          <p>Written By {result.author}</p>
          <img className = "inline inline-image" src={result.imageURL} alt="thumbnail"/>
          <p className = "inline-description inline">{result.synopsis}</p>
        </li>

      ))}
    </ul>
  );
};

// function checkVolumnInfo(result) {
//   return (!!result && !!result.volumeInfo && !!result.volumeInfo.imageLinks && !!result.volumeInfo.description&& !!result.volumeInfo.authors);
// };

// function checkResults(results){
//   return(!!results); 
// }

// function checkImageLinks(volumeInfo){
//   return (!!volumeInfo.imageLinks); 
// }; 

export default SavedResults;
