import Header from '../Header';

const IntroLayout = ({ children }) => {
  return (
    <div className="wrap login">
      <div className="intro-area">{children}</div>
    </div>
  );
};

export default IntroLayout;
