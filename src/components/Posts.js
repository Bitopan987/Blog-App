import Post from './Post';

import Loader from './Loader';

function Posts(props) {
  const { articles, error } = props;

  if (error) {
    return <p>{error}</p>;
  }
  if (!articles) {
    return <Loader />;
  }
  return articles.map((article) => <Post key={article.slug} {...article} />);
}

export default Posts;
