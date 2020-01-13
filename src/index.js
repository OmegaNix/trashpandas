import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import TimeAgo from 'react-timeago';
import 'bootstrap/dist/css/bootstrap.min.css';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import logo from './logo.png';
import BirthdayCake from './BirthdayCake.jpg';
import SidebarPanda from './sidebarpanda.jpg';

class Reddit extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get(`https://www.reddit.com/r/trashpandas.json?raw_json=1`).then(res => {
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

        <div class="row bg-background" id="main-container">
          <div class="col-xl-2 p-0 m-0" id="left-margin"></div>
          <div class="col-xl-5" id="post-content-container">
            {<ul class="m-0 p-0">
              {this.state.posts.map(post => {
              return <div class="m-0 p-0">
                <div class="row m-0 mt-3 mb-3 bg-white rounded" id="post">
                  <div class="col-xl-1 bg-light text-center m-0 p-0 rounded-left" id="score-bar">{post.score}</div>
                  <div class="col-xl-11" id="post-main">
                  <div id="post-header">Posted by u/{post.author} <div class="flairtext d-inline">{post.author_flair_text} </div><TimeAgo date={post.created} formatter={formatter}/></div>
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
          <div class="col-xl-3 p-0 m-0" id="static-content-container">
            <div class="row rounded bg-white m-0 mt-3 mb-3" id="static-title-card">
                <strong class="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">About Community</strong>
                <p class="p-3">Welcome to r/trashpandas: Your home for all things trashpanda-related! Here at r/trashpandas, we strive to share the cutest & *most awesomest* content there is! #🦝🦝🦝🦝🦝🦝🦝🦝🦝🦝🦝</p>
                <div class="row m-0 p-0 w-100">
                  <div class="col-xl-5 m-0">
                    <h5 class="mb-0">229k</h5><small class="mt-0">Members</small>
                  </div>
                  <div class="col-xl-7 m-0">
                    <h5 class="mb-0">130</h5><small class="mt-0">Online</small>
                  </div>
                </div>
                <hr class="row mx-auto" width="90%"></hr>
                <div class="row w-100 m-0 p-0 mb-3">
                <img class="col-xl-2 img-fluid m-0" alt="Birthday Cake" src={BirthdayCake}></img>
                <label class="col-xl-10 p-0 pt-2 h5">Created July 11, 2015</label>
                </div>
            </div>       
            <div class="row rounded bg-white m-0 mt-3 mb-3" id="static-filter-card">
              <strong class="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">Filter by flair</strong>
              <div class="row m-0 p-3 w-100">
              {/* fiter buttons here */}
              </div>
            </div>
            <div class="row w-100 m-0 p-0 mb-3">
                <img src={SidebarPanda} class="img-fluid rounded"></img>
            </div>
            <div class="row rounded bg-white m-0 mt-3 mb-3" id="static-rules-card">
              <strong class="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">r/trashpandas Rules</strong>
              <div class="row m-0 p-3 w-100">
              {/* rules dropdown here */}
              </div>
            </div>
            <div class="row w-100 m-0 p-0 mb-3">
                <img src={SidebarPanda} class="img-fluid rounded vertical-flip"></img>
            </div>
            <div class="row rounded bg-white m-0 mt-3 mb-3" id="static-mods-card">
              <strong class="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">Moderators</strong>
              <div class="row m-0 p-3 d-block">
                <a href="https://www.reddit.com/user/GoreFox/" class="d-inline modlist-link font-weight-bold m-2">u/GoreFox</a>
                <label class="bg-flairtext m-1">Trashpanda Enthusiast</label>
                <a href="https://www.reddit.com/user/JanetYellensFuckboy/" class="d-inline modlist-link font-weight-bold m-2">u/JanetYellensFuckboy</a>
                <label class="bg-flairtext d-inline m-1">takes credit for Guardia...</label>
                <a href="https://www.reddit.com/user/BotBust/" class="d-block modlist-link font-weight-bold m-2">u/BotBust</a>
                <a href="https://www.reddit.com/user/tsmaster777/" class="d-block modlist-link font-weight-bold m-2">u/tsmaster777</a>
                <a href="https://www.reddit.com/user/PapaTrashusPandusI/" class="d-inline modlist-link font-weight-bold m-2">u/PapaTrashusPandusI</a>
                <label class="bg-flairtext m-1">Lucipurrrr we are here</label>
                <a href="https://www.reddit.com/user/urbanspacecowboy/" class="d-block modlist-link font-weight-bold m-2">u/urbanspacecowboy</a>
                <a href="https://www.reddit.com/user/BotTerminator/" class="d-block modlist-link font-weight-bold m-2">u/BotTerminator</a>
                <a href="https://www.reddit.com/user/BotDefense/" class="d-block modlist-link font-weight-bold m-2">u/BotDefense</a>
                <a href="https://www.reddit.com/r/trashpandas/about/moderators/" class="d-block text-right modlist-link font-weight-bold m-3">VIEW ALL MODERATORS</a>
              </div>
                
            </div>
            <div class="row rounded bg-white m-0 mt-3" id="static-sitenav-card">
                <div class="col-xl-5 p-3">
                  <label class="font-weight-bold d-block">Reddit</label>
                  <a href="https://about.reddit.com/" class="d-block plaintext-link">About</a>
                  <a href="https://about.reddit.com/careers/" class="d-block plaintext-link">Careers</a>
                  <a href="https://about.reddit.com/press/" class="d-block plaintext-link">Press</a>
                  <a href="https://www.redditinc.com/advertising" class="d-block plaintext-link">Advertise</a>
                  <a href="http://www.redditblog.com/" class="d-block plaintext-link">Blog</a>
                </div>
                <div class="col-xl-7 p-3">
                  <label class="font-weight-bold">Using Reddit</label>
                  <a href="https://www.reddithelp.com/" class="d-block plaintext-link">Help</a>
                  <a href="https://www.reddit.com/mobile/download" class="d-bloc plaintext-link">Reddit App</a>
                  <a href="https://www.reddit.com/coins" class="d-block plaintext-link">Reddit Coins</a>
                  <a href="https://www.reddit.com/premium" class="d-block plaintext-link">Reddit Premium</a>
                  <a href="http://redditgifts.com/" class="d-block plaintext-link">Reddit Gifts</a>
                  <a href="https://www.reddit.com/subreddits/a-1/" class="d-block plaintext-link">Communities</a>
                  <a href="https://www.reddit.com/posts/a-1/" class="d-block plaintext-link">Top Posts</a>
                </div>
                <div class="row m-0 pl-3 mb-3 mt-3 pb-0">
                  <a href="https://www.redditinc.com/policies/user-agreement" class="plaintext-link mr-2">Terms</a><span>|</span>
                  <a href="https://www.redditinc.com/policies/content-policy" class="plaintext-link mr-2 ml-2">Content Policy</a><span>|</span>
                  <a href="https://www.reddit.com/help/privacypolicy" class="plaintext-link mr-2 ml-2">Privacy Policy</a><span>|</span>
                  <a href="https://www.reddit.com/help/healthycommunities/" class="plaintext-link ml-2">Mod Policy</a>
                </div>
                <div class="row m-0 p-2 pl-3 mb-0 mt-0 pt-0">
                <p>Reddit Inc © 2019. All rights reserved</p>
                </div>
            </div>
          </div>
          <div class="col-xl-2 p-0 m-0" id="right-margin"></div>
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
