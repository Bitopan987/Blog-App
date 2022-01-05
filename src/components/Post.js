import { Link } from 'react-router-dom';
function Post(props) {
  const {
    author,
    createdAt,
    title,
    description,
    slug,
    favoritesCount,
    favoriteArticle,
    unFavoriteArticle,
  } = props;
  let date = new Date(createdAt).toLocaleDateString('en-gb', {
    day: 'numeric',
    timeZone: 'utc',
    year: 'numeric',
    month: 'long',
  });
  console.log(favoriteArticle, unFavoriteArticle);
  return (
    <article className="post">
      <header className="flex justify-between ">
        <div className="flex item-center">
          <Link to={`/profile/${author.username}`}>
            <img
              className="author-img"
              alt="Profile"
              src={author.image || '/images/profile.png'}
            />
          </Link>

          <div className="post-details">
            <Link to={`/profile/${author.username}`} className="link">
              <p className="post-author">{author.username}</p>
            </Link>
            <time className="post-time" dateTime="">
              {date}
            </time>
          </div>
        </div>
        <div
          className="like_btn"
          onClick={
            favoritesCount === 0
              ? () => favoriteArticle(slug)
              : () => unFavoriteArticle(slug)
          }
        >
          <div>
            <img alt="" className="heart" src="/images/heart.png" />
          </div>
          <span className="favourites">{favoritesCount}</span>
        </div>
      </header>
      <Link to={`/article/${slug}`} className="link">
        <div className="post-body">
          <h2 className="post-title">{title}</h2>
          <p className="post-text">{description}</p>
        </div>
      </Link>
      <footer>
        <Link className="read-more-btn link" to={`/article/${slug}`}>
          Read More
        </Link>
        <hr></hr>
      </footer>
    </article>
  );
}

export default Post;
