import { Link } from 'react-router-dom';
function FeedNav() {
  return (
    <nav className="feed-nav">
      <ul className="flex">
        <li className="feed-nav-item">
          <Link className="active" to="/">
            Global Feed
          </Link>
        </li>
        <li className="feed-nav-item">
          <Link className="active" to="/">
            #tab Feed
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default FeedNav;
