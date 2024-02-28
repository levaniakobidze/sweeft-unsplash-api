import { ReactNode } from "react";
import classes from "../../styles/Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className={classes.layout}>{children}</div>;
};

export default Layout;
