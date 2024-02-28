import { Link } from "react-router-dom";
import classes from "../../styles/Header.module.css";
import Layout from "../Layout/Layout";

const Header = () => {
  return (
    <nav className={classes.header}>
      <Layout>
        <div className={classes.header_cont}>
          <div className={classes.logo}>Sweeft</div>
          <ul className={classes.menu_list}>
            <li className={classes.menu_list_item}>
              <Link to="/">Home</Link>
            </li>
            <li className={classes.menu_list_item}>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </div>
      </Layout>
    </nav>
  );
};

export default Header;
