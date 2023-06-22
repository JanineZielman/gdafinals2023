import { Footer } from "./Footer";

export const Layout = ({
  settings,
  children,
}) => {
  return (
    <div>
      <div className="menu">
        <div className="menu-item logo">
          <a href={'/'}>
            <img src="/logo.jpg"/>
          </a>
        </div>
      </div>
      <main>{children}</main>
      <Footer settings={settings} />
    </div>
  );
};
