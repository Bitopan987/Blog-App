import React from 'react';
import { articlesURL } from '../utils/constant';
import Loader from './Loader';

class Comment extends React.Component {
  state = {
    comments: [],
    comment: '',
    errors: {
      comment: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let { errors, comment } = this.state;
    switch (name) {
      case 'comment':
        errors.comment = comment ? 'You must be include one word' : '';
        break;
      default:
        break;
    }
    this.setState({
      errors,
      [name]: value,
    });
  };

  componentWillMount() {
    this.fetchComment();
  }

  componentDidUpdate(preProps, preState) {
    if (preState.comments !== this.state.comments) {
      this.fetchComment();
    }
  }

  deleteComment = (slug, id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    };

    fetch(articlesURL + `/${slug}/comments/${id}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((data) => this.fetchComment())
      .catch((errors) => console.log(errors));
  };

  fetchComment = () => {
    fetch(articlesURL + `/${this.props.article.slug}/comments`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ comments }) =>
        this.setState({
          comments,
        })
      )
      .catch((errors) => console.log(errors));
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let { errors, comment } = this.state;
    switch (name) {
      case 'comment':
        errors.comment = comment ? 'You must be include one word' : '';
        break;
      default:
        break;
    }
    this.setState({
      errors,
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { comment } = this.state;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: comment,
        },
      }),
    };
    fetch(articlesURL + `/${this.props.article.slug}/comments`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ comment }) => this.fetchComment())
      .catch((errors) => console.log(errors));
  };
  render() {
    const { user, article } = this.props;

    if (!this.state.comments) {
      return <Loader />;
    }
    return (
      <section className="container">
        <hr className="line"></hr>
        <div className="commentWrapper">
          <form action="" className=" block" onSubmit={this.handleSubmit}>
            <textarea
              id=""
              cols="30"
              rows="5"
              className="text-area"
              placeholder="Write a comment..."
              onChange={this.handleChange}
              name="comment"
              value={this.state.comment}
            ></textarea>
            <div className="btn-wrapper">
              <div className="flex items-center">
                <div>
                  <img src={`${user.image}`} alt="" className="user-image" />
                </div>
                <h4 className="username">{user.username}</h4>
              </div>
              <button type="submit" className="btn_comment">
                Post Comment
              </button>
            </div>
          </form>
        </div>
        <div>
          {this.state.comments.map((e) => {
            return (
              <>
                <div className="display_comment">
                  <div className="flex items-center">
                    <img src={`${e.author.image}`} alt="" />
                    <p className="comment">{e.body}</p>
                  </div>
                  <p
                    className="btn_delete"
                    onClick={() => this.deleteComment(article.slug, e.id)}
                  >
                    delete
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </section>
    );
  }
}

export default Comment;
