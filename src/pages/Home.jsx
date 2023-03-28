import HomeContent from "../components/Content/HomeContent";
import Row from "../components/Row/Row";
import * as servicesMovies from "../services/servicesMovies";

const Home = () => {
  return (
    <>
      <HomeContent />
      <Row
        title="Trending"
        id="trending"
        fetchMovies={servicesMovies.getTrending}
      />
      <Row
        title="Top Rate"
        id="top-rate"
        fetchMovies={servicesMovies.getTopRate}
      />
      <Row
        title="Up Comming"
        id="up-coming"
        fetchMovies={servicesMovies.getUpComming}
      />
    </>
  );
};

export default Home;
