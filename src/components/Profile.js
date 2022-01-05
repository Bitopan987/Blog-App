import React from 'react';
import { withRouter } from 'react-router-dom';
import Posts from './Posts';
import ProfileBanner from './ProfileBanner';
import { articlesURL, userProfile } from '../utils/constant';
import Loader from './Loader';

class Profile extends React.Component {
  state = {
    activeTab: 'author',
    articles: [],
    profile: null,
    params: this.props.match.params.username,
  };

  fetchProfile = () => {
    fetch(userProfile + `/${this.state.params}`)
      .then((data) => {
        if (!data.ok) {
          data.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return data.json();
      })
      .then(({ profile }) => {
        console.log({ profile });
        this.setState({ profile });
      })
      .catch((error) => console.log(error));
  };

  fetchData = () => {
    fetch(articlesURL + `?${this.state.activeTab}=${this.state.params}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not fetch data for specific user');
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => this.setState({ error: 'Not able to fetch articles!' }));
    this.fetchProfile();
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.match.params.username !== this.props.match.params.username) {
      this.setState({ params: this.props.match.params.username }, () => {
        this.fetchData();
      });
    }
  }

  handleActive = (tab) => {
    this.setState({ activeTab: tab }, () => {
      this.fetchData();
    });
  };

  handleFollow = (username, user) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    };
    fetch(userProfile + `/${username}/follow`, requestOptions)
      .then((data) => {
        if (!data.ok) {
          return data.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return data.json();
      })
      .then(({ profile }) => {
        console.log(profile);
        this.fetchProfile();
      })
      .catch((errors) => console.log(errors));
  };

  favoriteArticle = (slug) => {
    console.log(slug);
    fetch(articlesURL + `/${slug}/favorite`, {
      method: 'POST',
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article);
        this.fetchData();
      });
  };

  unFavoriteArticle = (slug) => {
    console.log(slug, 'unfav');
    fetch(articlesURL + `/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        this.fetchData();
      });
  };

  render() {
    const { activeTab, profile } = this.state;
    const { user } = this.props;
    if (!profile) {
      return <Loader />;
    }
    return (
      <section>
        <ProfileBanner
          user={user}
          profile={profile}
          handleFollow={this.handleFollow}
          handleUnFollow={this.handleUnFollow}
        />
        <div className="profile">
          <div className="profile_wrapper container">
            <div className="nav">
              <button
                onClick={() => this.handleActive('author')}
                className={activeTab === 'author' && 'active'}
              >
                My Articles
              </button>
              <button
                onClick={() => this.handleActive('favorited')}
                className={activeTab === 'favorited' && 'active'}
              >
                Favourited Articles
              </button>
            </div>
            <Posts
              articles={this.state.articles}
              unFavoriteArticle={this.unFavoriteArticle}
              favoriteArticle={this.favoriteArticle}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Profile);
