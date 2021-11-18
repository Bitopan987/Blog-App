import React from 'react';
import Post from './Post';
import { articlesURL } from '../utils/constant';
import Loader from './Loader';

class Posts extends React.Component {
  state = {
    articles: null,
    error: '',
  };

  componentDidMount() {
    fetch(articlesURL + '/?limit=10')
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ articles: data.articles, error: '' });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch articles!' });
      });
  }
  render() {
    const { articles, error } = this.state;
    console.log(articles);
    if (error) {
      return <p>{error}</p>;
    }
    if (!articles) {
      return <Loader />;
    }
    return articles.map((article) => <Post key={article.slug} {...article} />);
  }
}

export default Posts;
