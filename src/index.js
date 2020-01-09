import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import TimeAgo from 'react-timeago';
import 'bootstrap/dist/css/bootstrap.min.css';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import logo from './logo.png';

class Reddit extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get(`https://www.reddit.com/r/trashpandas.json`).then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts });
    });
  };

  render() {
    return (
      <div class="container-fluid">
        <header class="page-header">
          <div class="row bg-black p-5"></div>
          <div class="row">
            <div class="col-xl-2" id="header-left-margin"></div>
            <div class="col-xl-1 mr-0 pr-0" id="header-left-image">
              <img class="header-image rounded-circle" src={logo} alt="Panda Icon"/>
            </div>
            <div class="col-xl-9 pl-0 header-content" id="header-content p-5">
              <h1 class="pb-0 mb-0">Trashpandas</h1>
              <small class="pt-0 mt-0">A small portfoio app by Nate Krieger</small>
            </div>
          </div>
        </header>

        <div class="row bg-secondary" id="main-container">
          <div class="col-xl-1 p-0 m-0" id="left-margin"></div>
          <div class="col-xl-6" id="post-content-container">
            {<ul class="m-0 p-0">
              {this.state.posts.map(post => {
              return <div class="m-0 p-0">
                <div class="row m-0 mt-3 mb-3 bg-white rounded" id="post">
                  <div class="col-xl-1 bg-light text-center m-0 p-0 rounded-left" id="score-bar">{post.score}</div>
                  <div class="col-xl-11" id="post-main">
                  <div id="post-header">Posted by u/{post.author} {post.author_flair_text} <TimeAgo date={post.created} formatter={formatter}/></div>
                  <h4 id="post-title" key={post.id}>{post.title}</h4>
                  <div id="post-body">
                  <div id="post-body-text">{post.selftext}</div>
                  <div id="post-body-thumbnail">{doesThumbnailExist(post.thumbnail) ? <img alt="thumbnail" src={post.thumbnail}></img> : <div></div> }</div>
                  </div>
                  <div id="post-footer"><a href={"www.reddit.com/" + post.permalink}>{post.num_comments} Comments</a></div>
                  </div>   
                </div>
              </div>;})}
              </ul>}
          </div>
          <div class="col-xl-4 p-0 m-0 border" id="static-content-container"></div>
          <div class="col-xl-1 p-0 m-0" id="right-margin"></div>
        </div>
      </div>
    );
  }
}

const formatter = buildFormatter(englishStrings);

const doesThumbnailExist = (thumb)=>{
  if(thumb == "self"){
    return false
  }
  return true
}

ReactDOM.render(<Reddit />, document.getElementById("root"));
