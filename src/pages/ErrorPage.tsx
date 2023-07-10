import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <Link to="/">Go Home</Link>
    </div>
  );
};

export default ErrorPage;
