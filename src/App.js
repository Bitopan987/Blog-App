import React from 'react';

let articleURL = 'https://mighty-oasis-08080.herokuapp.com/api/articles';

class App extends React.Component {
  state = {
    articles: [],
  };
  componentDidMount() {
    fetch(articleURL)
      .then((res) => res.json())
      .then(({ articles }) => {
        this.setState({ articles });
      });
  }
  render() {
    return (
      <ul>
        {this.state.articles.map((article) => {
          return <li>{article.title}</li>;
        })}
      </ul>
    );
  }
}

export default App;
