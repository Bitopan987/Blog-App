import Banner from './Banner';
import FeedNav from './FeedNav';
import Posts from './Posts';
import Sidebar from './Sidebar';

function Home(props) {
  return (
    <main>
      <Banner />
      <div className="container flex justify-between ">
        <section className="main">
          <FeedNav />
          <Posts />
        </section>
        <Sidebar />
      </div>
    </main>
  );
}

export default Home;
