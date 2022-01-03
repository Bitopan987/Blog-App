import Post from './Post';

import Loader from './Loader';

function Posts(props) {
  const { articles, error, favoriteArticle, unFavoriteArticle } = props;

  if (error) {
    return <p>{error}</p>;
  }
  if (!articles) {
    return <Loader />;
  }
  if (articles.length < 1) {
    return <h2>No articles Found</h2>;
  }
  return articles.map((article) => (
    <Post
      key={article.slug}
      {...article}
      favoriteArticle={favoriteArticle}
      unFavoriteArticle={unFavoriteArticle}
    />
  ));
}

export default Posts;
