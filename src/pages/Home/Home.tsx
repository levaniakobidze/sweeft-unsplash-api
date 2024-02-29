import { FC, useContext, useCallback, ChangeEvent, useEffect } from "react";
import ImageList from "../../components/ImageList/ImageList";
import Layout from "../../components/Layout/Layout";
import classes from "../../styles/Home.module.css";
import { AppContext, ContextTypes } from "../../context/appContext";

const Home: FC = () => {
  const { searchQuery, setSearchQuery, searchHistory, setSearchHistory } =
    useContext(AppContext) as ContextTypes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      console.log("hap");
      setSearchHistory([...searchHistory, searchQuery]);
    }
  }, [searchQuery]);

  const debounce = (
    func: (e: ChangeEvent<HTMLInputElement>) => void,
    delay: number
  ) => {
    let timer: number | null;
    return function (e: ChangeEvent<HTMLInputElement>) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(e);
      }, delay);
    };
  };

  const optimizedFn = useCallback(debounce(handleInputChange, 500), []);

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
                <input
                  type="text"
                  placeholder="Search for the best images"
                  onChange={optimizedFn}
                />
              </div>
            </div>
          </Layout>
        </div>
      </div>
      <Layout>
        <ImageList />
      </Layout>
    </div>
  );
};

export default Home;
