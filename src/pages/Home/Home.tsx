import React, {
  FunctionComponent,
  useContext,
  useCallback,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import ImageList from "../../components/ImageList/ImageList";
import Layout from "../../components/Layout/Layout";
import classes from "../../styles/Home.module.css";
import { AppContext, ContextTypes } from "../../context/appContext";

const Home: FunctionComponent = () => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    searchHistory,
    setSearchHistory,
    setPageNum,
  } = useContext(AppContext) as ContextTypes;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPageNum(1);
  };

  useEffect(() => {
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      setSearchHistory([...searchHistory, searchQuery]);
    }
  }, [searchQuery, searchHistory, setSearchHistory]);

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

  const handleInputFocus = () => {
    setIsInputFocus(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      e.stopPropagation();
      setIsInputFocus(false);
    }, 600);
  };

  const handleDropdownItemClick = (word: string) => {
    setSearchQuery(word);
  };

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
                <div className={classes.search_input_cont}>
                  <input
                    type="text"
                    placeholder="Search for the best images"
                    onInput={optimizedFn}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  {!searchQuery && isInputFocus && searchHistory.length > 1 && (
                    <ul className={classes.search_dropdown}>
                      {searchHistory.map((word, index) => (
                        <li
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDropdownItemClick(word);
                          }}
                        >
                          {word}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
