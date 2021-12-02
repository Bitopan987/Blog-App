import React from 'react';
import Pagination from './Pagination';
import Posts from './Posts';
import ProfileBanner from './ProfileBanner';
import { articlesURL } from '../utils/constant';

class Profile extends React.Component {
  state = {
    activeTab: 'my',
  };

  fetchData = () => {
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePageIndex - 1) * limit;
    const tag = this.state.activeTab;

    fetch(
      articlesURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          error: '',
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch articles!' });
      });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <section>
        <ProfileBanner />
        <div className="profile">
          <div className="profile_wrapper container">
            <div className="nav">
              <button className={activeTab === 'my' && 'active'}>
                My Articles
              </button>
              <button className={activeTab === 'fav' && 'active'}>
                Favourited Articles
              </button>
            </div>
            <Posts articles={[]} />
            <Pagination />
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
