import Layout from "../../components/Layout/Layout";
import classes from "../../styles/Home.module.css";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.banner}>
        <div className={classes.hero_cont}>
          <Layout>
            <div className={classes.hero}>
              <p className={classes.sub_title}>WALLPAPERS</p>
              <h1 className={classes.title}>The best wallpapers</h1>
              <p className={classes.description}>
                Maecenas volutpat consequat orci id consectetur. Namvulput quam
                turpis, id tristique nibh ullamcorper dignissim.
              </p>

              <div className={classes.search_cont}>
                <input type="text" placeholder="Search for the best images" />
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default Home;
