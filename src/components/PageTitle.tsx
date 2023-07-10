import { Link } from "react-router-dom";

interface Props {
  title: string;
  showHome: boolean;
}

const PageTitle: React.FC<Props> = ({ title, showHome }) => {
  return (
    <div className="page-title">
      <h1>{title}</h1>

      {showHome && <Link to="/">Go Home</Link>}
    </div>
  );
};

export default PageTitle;
