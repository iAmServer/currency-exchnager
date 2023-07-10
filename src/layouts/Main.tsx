import { Link, Outlet } from "react-router-dom";

const MainLayout: React.FC<any> = () => {
  return (
    <>
      <div className="nav-bar">
        <img src="vite.svg" alt="logo" />

        <div className="nav-item">
          <Link to={`/detail/EUR/USD/0`}>EUR-USD Details</Link>
          <Link to={`/detail/EUR/GBP/0`}>EUR-GBP Details</Link>
        </div>
      </div>
      <div className="main-body">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
