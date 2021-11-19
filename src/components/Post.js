import { Link } from 'react-router-dom';
function Post(props) {
  const { author, createdAt, title, description } = props;
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
            <time className="post-time" dateTime="">
              {date}
            </time>
          </div>
        </div>
        <div className="like_btn">
          <div>
            <img alt="" className="heart" src="/images/heart.png" />
          </div>
          <span className="favourites">1</span>
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
