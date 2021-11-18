import { Link } from 'react-router-dom';
function Post(props) {
  const { author, createdAt, title, description, favouritesCount } = props;
  let date = new Date(createdAt).toLocaleDateString('en-gb', {
    day: 'numeric',
    timeZone: 'utc',
    year: 'numeric',
    month: 'long',
  });
  return (
    <article className="post">
      <header className="flex justify-between ">
        <div className="flex item-center">
          <Link to="/profile">
            <img
              className="author-img"
              alt="Profile"
              src={author.image || '/images/profile.png'}
            />
          </Link>

          <div className="post-details">
            <Link to="/profile" className="link">
              <p className="post-author">{author.username}</p>
            </Link>
            <time className="post-time" datetime="">
              {date}
            </time>
          </div>
        </div>
        <div className="like_btn">
          <span>&heart;</span>
          <span>{favouritesCount}</span>
        </div>
      </header>
      <Link to="/singlepost" className="link">
        <div className="post-body">
          <h2 className="post-title">{title}</h2>
          <p className="post-text">{description}</p>
        </div>
      </Link>
      <footer>
        <Link className="read-more-btn link" to="singlepost">
          Read More
        </Link>
        <hr></hr>
      </footer>
    </article>
  );
}

export default Post;
