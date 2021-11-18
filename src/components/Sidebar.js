import React from 'react';
import { tagsURL } from '../utils/constant';
import Loader from './Loader';

class Sidebar extends React.Component {
  state = {
    tags: null,
    error: '',
  };

  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({ tags, error: '' });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch tags!' });
      });
  }
  render() {
    const { tags, error } = this.state;
    if (error) {
      return error;
    }
    if (!tags) {
      return <Loader />;
    }
    return (
      <aside className="tags">
        <h2>Popular tags</h2>
        {tags.map((tag) => {
          return (
            <button key={tag} className="btn btn_secondary">
              {tag}
            </button>
          );
        })}
      </aside>
    );
  }
}

export default Sidebar;
