import React from 'react';
import validate from '../utils/validate';
import { articlesURL } from '../utils/constant';

class NewPost extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    errors: {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    fetch(articlesURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(',').map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not create new article');
        }
        return res.json();
      })
      .then(({ article }) => {
        this.props.updateUser(article);
        this.setState({ title: '', description: '', body: '', tagList: '' });
        // this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <section className="form_section article">
        <form>
          <input
            className="handleinput"
            name="title"
            type="text"
            placeholder="Article Title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <span className="error"></span>
          <input
            className="handleinput"
            name="description"
            type="text"
            onChange={this.handleChange}
            placeholder="What's this article all about?"
            value={this.state.description}
          />
          <span className="error"></span>
          <textarea
            className="handleinput"
            rows="6"
            name="body"
            onChange={this.handleChange}
            value={this.state.body}
            placeholder=" Write your article(In markdown format)"
          ></textarea>
          <span className="error"></span>
          <input
            className="handleinput"
            name="tagList"
            type="text"
            onChange={this.handleChange}
            placeholder="Enter Tags"
            value={this.state.tagList}
          />
          <div className="btn_sec">
            <input
              className="btn_secondary"
              value="Publish Article"
              type="submit"
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </section>
    );
  }
}

export default NewPost;
