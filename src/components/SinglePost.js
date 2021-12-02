import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { articlesURL } from '../utils/constant';
import Loader from './Loader';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articlesURL + `/` + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch articles!' });
      });
  }
  render() {
    const { article, error } = this.state;
    console.log(article, 'article single');
    if (error) {
      return <p>{error}</p>;
    }
    if (!article) {
      return <Loader />;
    }

    return (
      <article className="single-post ">
        <header className="post-banner">
          <div className=" container">
            <h1 className="post-title">{article.title}</h1>
            <div className="flex item-center">
              <Link to="/profile">
                <img alt="" className="author-img" src="/images/profile.png" />
              </Link>
              <div className="post-details">
                <Link to="/profile" className="link">
                  <p className="post-author"> {article.author.username}</p>
                </Link>
                <time className="post-time" dateTime="">
                  {article.createdAt}
                </time>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="single-post-body">{article.body}</div>
        </div>
        {this.props.user === null ? (
          <footer className="post-footer">
            <div className="container">
              <p>
                <Link to="/login" className="green">
                  Sign In
                </Link>{' '}
                or{' '}
                <Link to="/signup" className="green">
                  Sign Up
                </Link>{' '}
                to add comments on this article.
              </p>
            </div>
          </footer>
        ) : (
          ''
        )}
      </article>
    );
  }
}

export default withRouter(SinglePost);
