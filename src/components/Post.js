function Post() {
  return (
    <ul>
      <li className="post">
        <div className="header">
          <div>
            <img alt="" src="/images/profile.png"></img>
            <div>
              <h4>devanshuy</h4>
              <p>date 13 AUG</p>
            </div>
          </div>
          <div>
            <img alt="" src="/images/heart.png"></img>
            <span>2</span>
          </div>
        </div>
        <div className="body">
          <h3>Mission</h3>
          <p>fantasy</p>
        </div>
        <div>
          <button className="btn btn_primary">Read more</button>
        </div>
        <hr></hr>
      </li>
    </ul>
  );
}

export default Post;
