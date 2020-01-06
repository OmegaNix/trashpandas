import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

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
      <div>
        <header>
          <h1 class="header-title">r/trashpandas</h1>
          <h5 class="header-subtitle">A small portfoio app by Nate Krieger</h5>
        </header>
        <ul>
          {this.state.posts.map(post => {
            return <div class="postcard">
              <div class="post-left-margin card-content">
                <div class="post-score">Score {post.score}</div>
              </div>
              <div class="post-main card-content">
                <div class="post-header">Posted by u/{post.author} {post.author_flair_text} <TimeAgo date={post.created} formatter={formatter}/></div>
                <h4 class="post-title" key={post.id}>{post.title}</h4>
                <div class="post-body">
                  <div class="post-body-text">{post.selftext}</div>
                  <div class="post-body-thumbnail">{doesThumbnailExist(post.thumbnail) ? <img alt="thumbnail" src={post.thumbnail}></img> : <div></div> }</div>
                </div>
                <div class="post-footer"><a href={"www.reddit.com/" + post.permalink}>{post.num_comments} Comments</a></div>
              </div>
            </div>;})}
        </ul>
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
