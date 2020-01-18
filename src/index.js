import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeAgo from 'timeago-react';
import logo from './logo.png';
import BirthdayCake from './BirthdayCake.jpg';
import SidebarPanda from './sidebarpanda.jpg';
import upcarot from './upcarot.png';
import downcarot from './downcarot.png';


const removeNulls_Duplicates = (arr)=>{
  var cleanArray = arr.filter((el)=> {
      return el != null;
  });
  const cleanSet = new Set(cleanArray)
  cleanArray = [...cleanSet]
  return cleanArray;
}

const doesPropertyExist = (prop)=>{
  if(prop == null){
    return false;
  }
  return true;
}

class Reddit extends React.Component{
  state = {
    posts: [],
    flair_tags: [],
  };
  componentDidMount() {
    axios.get(`https://www.reddit.com/r/trashpandas.json?raw_json=1`).then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      const flair_tags = removeNulls_Duplicates(res.data.data.children.map(obj => obj.data.link_flair_text));
      this.setState({ posts, flair_tags });
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <header>
          <div className="row bg-black p-5"></div>
          <div className="row">
            <div className="col-xl-2 col-lg-0 p-0 m-0" id="header-left-margin"></div>
            <div className="col-xl-10 col-lg-12 d-inline" id="header-content ">
              <div className="d-inline mr-0 pr-0" id="header-left-image">
                <img className="header-image rounded-circle float-left" src={logo} alt="Raccoon Icon"/>
              </div>
              <h1 className="pb-0 mb-0 d-inline">Trashpandas</h1>
              <button className="reddit-button ml-sm-5 p-2 d-inline" style={{width: "90px"}}>JOIN</button>
              <small className="pt-0 mt-0 d-block">A small portfoio app by Nate Krieger</small>
              
            </div>
          </div>
        </header>

        <div className="row bg-background" id="main-container">
          <div className="col-xl-2 p-0 m-0" id="left-margin"></div>
          <div className="col-xl-5" id="post-content-container">
            {<ul className="m-0 p-0">
              {this.state.posts.map(post => {
              return <div className="m-0 p-0" key={post.id}>
                <div className="row m-0 mt-3 mb-3 bg-white rounded">
                  <div className="col-xl-1 d-inline bg-light text-center m-0 p-0 rounded-left">
                    <button className="rounded arrow-up-container bg-light mt-2 mb-0"><i className="fas fa-arrow-up"></i></button>
                    <div className="m-0 p-0 score-text">{post.score}</div>
                    <button className="rounded arrow-down-container bg-light mb-2 mt-0"><i className="fas fa-arrow-down"></i></button>
                  </div>
                  <div className="col-xl-11 d-inline" id="post-main">
                  <div className="lightweight-text text-secondary">Posted by u/{post.author} <div className="bg-flairtext text-dark d-inline">{post.author_flair_text} </div><TimeAgo datetime={post.created * 1000}/></div>
                  {doesPropertyExist(post.link_flair_text) ? <div className="badge badge-pill p-2 badge-light d-inline p-0 m-0">{post.link_flair_text}</div> : null}
                  <h5 className="pl-0 pt-3 pb-3 d-inline">{post.title}</h5>
                  <PostBody content={post}/>
                  <PostFooter content={post}/>
                  </div>   
                </div>
              </div>;})}
              </ul>}
          </div>
          <div className="col-xl-3 p-0 m-0" id="static-content-container">
            <div className="row rounded bg-white m-0 mt-3 mb-3" id="static-title-card">
                <strong className="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">About Community</strong>
                <p className="p-3">Welcome to r/trashpandas: Your home for all things trashpanda-related! Here at r/trashpandas, we strive to share the cutest & *most awesomest* content there is! #🦝🦝🦝🦝🦝🦝🦝🦝🦝🦝🦝</p>
                <div className="row m-0 p-0 w-100">
                  <div className="col-xl-5 m-0">
                    <h5 className="mb-0">229k</h5><small className="mt-0">Members</small>
                  </div>
                  <div className="col-xl-7 m-0">
                    <h5 className="mb-0">130</h5><small className="mt-0">Online</small>
                  </div>
                </div>
                <hr className="row mx-auto" width="90%"></hr>
                <div className="row w-100 m-0 p-0 mb-3">
                  <img className="col-xl-2 img-fluid m-0 font-weight-light" alt="Birthday Cake" src={BirthdayCake}/>
                <label className="col-xl-10 p-0 pt-2 h5">Created July 11, 2015</label>
                </div>
            </div>       
            <div className="row rounded bg-white m-0 mt-3 mb-3" id="static-filter-card">
              <strong className="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">Filter by flair</strong>
              <div className="row m-0 p-3 w-100">
              {/*FLAIR TAGS*/}
                <FlairMenu array={this.state.flair_tags}/>
              </div>
            </div>
            <div className="row w-100 m-0 p-0 mb-3">
                <img src={SidebarPanda} className="img-fluid rounded" alt="Smiling Raccoon"/>
            </div>
            <div className="row rounded bg-white m-0 mt-3 mb-3" id="static-rules-card">
              <strong className="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">r/trashpandas Rules</strong>
              <ol className="m-1 pl-4 pr-4 pt-2 pb-2 container-fluid">
                <CollapsableMenuItemOne/>
                <hr className="row m-2 mx-auto divider"></hr>
                <li className="plaintext">All posts must pertain to trashpandas</li>
                <hr className="row mx-auto m-2"></hr>
                <CollapsableMenuItemThree/>
                <hr className="row mx-auto m-2"></hr>
                <CollapsableMenuItemSimple title="No trashpanda marraige proposals" text="No pictures of giving rings to trashpandas. This engagement is off. We've seen this post many times here, and we needn't see it anymore. Just go to Las Vegas."/>
                <hr className="row mx-auto m-2"></hr>
                <li className="plaintext">No merchandise</li>
                <hr className="row mx-auto m-2"></hr>
                <CollapsableMenuItemSimple title="No profanity" text="This is a wholesome sub for people of all ages. Please keep profanity to a minimum."/>
                <hr className="row mx-auto m-2"></hr>
                <CollapsableMenuItemSimple title="Keep it apolitical" linksrc="https://www.reddit.com/r/trashpandas" linktext="r/trashpandas " text="supersede politics. Please don't bring politics into this subreddit."/>
                <hr className="row mx-auto m-2"></hr>
                <CollapsableMenuItemSimple title="No Bamboozlement" text="Any users caught bamboozling us will be banned. Please don't bamboozle."/>
              </ol>
            </div>
            <div className="row w-100 m-0 p-0 mb-3">
                <img src={SidebarPanda} className="img-fluid rounded vertical-flip" alt="Upsidown Smiling Raccoon"/>
            </div>
            <div className="row rounded bg-white m-0 mt-3 mb-3" id="static-mods-card">
              <strong className="row col-xl-12 m-0 bg-secondary p-3 text-white rounded-top">Moderators</strong>
              <div className="row m-0 p-3 d-block">
                <a href="https://www.reddit.com/user/GoreFox/" className="d-inline modlist-link font-weight-bold m-2">u/GoreFox</a>
                <label className="bg-flairtext m-1">Trashpanda Enthusiast</label>
                <a href="https://www.reddit.com/user/JanetYellensFuckboy/" className="d-inline modlist-link font-weight-bold m-2">u/JanetYellensFuckboy</a>
                <label className="bg-flairtext d-inline m-1">takes credit for Guardia...</label>
                <a href="https://www.reddit.com/user/BotBust/" className="d-block modlist-link font-weight-bold m-2">u/BotBust</a>
                <a href="https://www.reddit.com/user/tsmaster777/" className="d-block modlist-link font-weight-bold m-2">u/tsmaster777</a>
                <a href="https://www.reddit.com/user/PapaTrashusPandusI/" className="d-inline modlist-link font-weight-bold m-2">u/PapaTrashusPandusI</a>
                <label className="bg-flairtext m-1">Lucipurrrr we are here</label>
                <a href="https://www.reddit.com/user/urbanspacecowboy/" className="d-block modlist-link font-weight-bold m-2">u/urbanspacecowboy</a>
                <a href="https://www.reddit.com/user/BotTerminator/" className="d-block modlist-link font-weight-bold m-2">u/BotTerminator</a>
                <a href="https://www.reddit.com/user/BotDefense/" className="d-block modlist-link font-weight-bold m-2">u/BotDefense</a>
                <a href="https://www.reddit.com/r/trashpandas/about/moderators/" className="d-block text-right modlist-link font-weight-bold m-3">VIEW ALL MODERATORS</a>
              </div>
                
            </div>
            <div className="row rounded bg-white m-0 mt-3" id="static-sitenav-card">
                <div className="col-xl-5 p-3">
                  <label className="font-weight-bold d-block">Reddit</label>
                  <a href="https://about.reddit.com/" className="d-block plaintext-link">About</a>
                  <a href="https://about.reddit.com/careers/" className="d-block plaintext-link">Careers</a>
                  <a href="https://about.reddit.com/press/" className="d-block plaintext-link">Press</a>
                  <a href="https://www.redditinc.com/advertising" className="d-block plaintext-link">Advertise</a>
                  <a href="http://www.redditblog.com/" className="d-block plaintext-link">Blog</a>
                </div>
                <div className="col-xl-7 p-3">
                  <label className="font-weight-bold">Using Reddit</label>
                  <a href="https://www.reddithelp.com/" className="d-block plaintext-link">Help</a>
                  <a href="https://www.reddit.com/mobile/download" className="d-bloc plaintext-link">Reddit App</a>
                  <a href="https://www.reddit.com/coins" className="d-block plaintext-link">Reddit Coins</a>
                  <a href="https://www.reddit.com/premium" className="d-block plaintext-link">Reddit Premium</a>
                  <a href="http://redditgifts.com/" className="d-block plaintext-link">Reddit Gifts</a>
                  <a href="https://www.reddit.com/subreddits/a-1/" className="d-block plaintext-link">Communities</a>
                  <a href="https://www.reddit.com/posts/a-1/" className="d-block plaintext-link">Top Posts</a>
                </div>
                <div className="row m-0 pl-3 mb-3 mt-3 pb-0">
                  <a href="https://www.redditinc.com/policies/user-agreement" className="plaintext-link mr-2">Terms</a><span>|</span>
                  <a href="https://www.redditinc.com/policies/content-policy" className="plaintext-link mr-2 ml-2">Content Policy</a><span>|</span>
                  <a href="https://www.reddit.com/help/privacypolicy" className="plaintext-link mr-2 ml-2">Privacy Policy</a><span>|</span>
                  <a href="https://www.reddit.com/help/healthycommunities/" className="plaintext-link ml-2">Mod Policy</a>
                </div>
                <div className="row m-0 p-2 pl-3 mb-0 mt-0 pt-0">
                <p>Reddit Inc © 2019. All rights reserved</p>
                </div>
            </div>
            <div class="row"><button class="reddit-button mx-auto p-2 text-nowrap" style={{width: "130px"}}>BACK TO TOP</button></div>
          </div>
          <div className="col-xl-2 p-0 m-0" id="right-margin"></div>
        </div>
      </div>
    );
  }
}
class PostBody extends React.Component{
  constructor(props){
    super(props);
    this.state = {content : this.props.content}
  }
  render(){
    return <div className="container-fluid">
      <img src={this.state.content.thumbnail} alt="thumbnail"/>
    </div>
  }
}
class PostFooter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content : this.props.content,
      shareMenuIsVisible: false,
      moreMenuIsVisible: false,
    };
    this.commentClick = this.commentClick.bind(this);
    this.shareClick = this.shareClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.moreClick = this.moreClick.bind(this);
  }
  commentClick(){
    Example();
  }
  moreClick(){
    this.setState(state => ({
      moreMenuIsVisible: !state.moreMenuIsVisible,
    }));
  }
  shareClick(){
    this.setState(state => ({
      shareMenuIsVisible: !state.shareMenuIsVisible,
    }));
  }
  saveClick(){
    {/*THIS FEATURE NOT SUPPORTED MODAL BOX*/}
  }
  
  render(){
    return <div className="container-fluid row p-0 m-0">
      <button className="footer-menu-button m-1 ml-0 pl-0 shadow-none"><i className="fas fa-comment-alt mr-1"></i>{this.state.content.num_comments} Comments</button>
      <div className="m-0 p-0 d-inline">
        <button className="footer-menu-button m-1" onClick={this.shareClick}><i className="fas fa-share mr-1"></i>Share</button>
        <button className={this.state.shareMenuIsVisible ? "footer-drop-menu-item d-block ml-1 mt-n1 border-bottom-0" : "d-none"}><i className="fas fa-link mr-2"></i>Copy Text</button>
        <button className={this.state.shareMenuIsVisible ? "footer-drop-menu-item d-block ml-1" : "d-none"}><i className="fas fa-code ml-n1 mr-2"></i>Embed</button>
      </div>
      <button className="footer-menu-button m-1"><i className="fas fa-folder-plus mr-1"></i>Save</button>
      <div className="m-0 p-0 d-inline">
        <button className="footer-menu-button m-1" onClick={this.moreClick}><i className="fas fa-ellipsis-h"></i></button>
        <button className={this.state.moreMenuIsVisible ? "footer-drop-menu-item d-block ml-1 border-bottom-0 mt-n1" : "d-none"}><i class="fas fa-flag mr-2"></i>Hide</button>
        <button className={this.state.moreMenuIsVisible ? "footer-drop-menu-item d-block ml-1 border-bottom-2" : "d-none"}><i class="fas fa-ban mr-2"></i>Report</button>
      </div>
    </div>
  }
}

class FlairMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = { filterBy : null}
  }

  render(){
    return(<div>
      {<ul className="mb-4 p-0">
        {this.props.array.map(tag => {
            return <div className="m-0 p-0 d-inline">
              <div className="badge badge-pill p-2 badge-light d-inline p-0 m-0 font-weight-normal">{tag}</div>
            </div>;})}
        </ul>}
    </div>
    )
  }
}
class CollapsableMenuItemOne extends React.Component{
  constructor() {
    super();
    this.state = {isMenuCollapsed : true}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isMenuCollapsed: !state.isMenuCollapsed,
    }));
  }
  render(){
    return <li className="plaintext" onClick={this.handleClick}>No clickbait titles
    <img className="img-fluid float-right mt-2" height="12px" width="12px" src={this.state.isMenuCollapsed ? downcarot : upcarot} alt={this.state.isMenuCollapsed ? "closed" : "open"}/>
    <div className={this.state.isMenuCollapsed ? "d-none" : ""}>
    <label className="m-2">Examples:</label>
      <ol>
        <li className="p-1">You won't believe what happens!</li>
        <li className="p-1">Watch until the end!</li>
        <li className="p-1">You'll never guess...</li>
      </ol>
    </div>
  </li>
  }
}
class CollapsableMenuItemThree extends React.Component{
  constructor() {
    super();
    this.state = {isMenuCollapsed : true}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isMenuCollapsed: !state.isMenuCollapsed,
    }));
  }
  render(){
    return <li className="plaintext" onClick={this.handleClick}>No dead trashpandas
    <img className="img-fluid float-right mt-2" height="12px" width="12px" src={this.state.isMenuCollapsed ? downcarot : upcarot} alt={this.state.isMenuCollapsed ? "closed" : "open"}/>
    <div className={this.state.isMenuCollapsed ? "d-none" : ""}>
      <ol>
        <li className="p-1">Pictures of deceased trashpandas are not permitted in this sub. This includes taxidermied ones. When in doubt: Do not post it.</li>
        <li className="p-1">Advocating killing or harming trashpandas will not be tolerated.</li>
      </ol>
    </div>
  </li>
  }
}
class CollapsableMenuItemSimple extends React.Component{
  constructor(props) {
    super(props);
    this.state = {isMenuCollapsed : true}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isMenuCollapsed: !state.isMenuCollapsed,
    }));
  }
  render(){
    return <li className="plaintext" onClick={this.handleClick}>{this.props.title}
    <img className="img-fluid float-right mt-2" height="12px" width="12px" src={this.state.isMenuCollapsed ? downcarot : upcarot} alt={this.state.isMenuCollapsed ? "closed" : "open"}/>
    <div className={this.state.isMenuCollapsed ? "d-none" : ""}>
        <p className="m-2"><a href={this.props.linksrc} className="modlist-link">{this.props.linktext}</a>{this.props.text}</p>
    </div>
  </li>
  }
}

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


ReactDOM.render(<Reddit />, document.getElementById("app")); 
