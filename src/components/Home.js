import React from 'react';
import Banner from './Banner';
import FeedNav from './FeedNav';
import Posts from './Posts';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import { articlesURL } from '../utils/constant';

class Home extends React.Component {
  state = {
    articles: null,
    error: '',
    articlesCount: 0,
    articlesPerPage: 10,
    activePageIndex: 1,
    activeTab: '',
  };

  removeTab = () => {
    this.setState({ activeTab: '' });
  };

  addTab = (value) => {
    this.setState({ activeTab: value });
  };
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activePageIndex !== this.state.activePageIndex ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

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

  updateCurrentPageIndex = (index) => {
    this.setState({ activePageIndex: index }, this.fetchData);
  };
  render() {
    const {
      articles,
      error,
      activeTab,
      articlesCount,
      articlesPerPage,
      activePageIndex,
    } = this.state;
    return (
      <main>
        <Banner />
        <div className="container flex justify-between ">
          <section className="main">
            <FeedNav activeTab={activeTab} removeTab={this.removeTab} />
            <Posts articles={articles} error={error} />
            <Pagination
              articlesCount={articlesCount}
              articlesPerPage={articlesPerPage}
              activePageIndex={activePageIndex}
              updateCurrentPageIndex={this.updateCurrentPageIndex}
            />
          </section>
          <Sidebar addTab={this.addTab} />
        </div>
      </main>
    );
  }
}

export default Home;
