import Link from 'next/link';

const ErrorLayout = ({ children }) => {
  return (
    <div className="error">
      <div className="error__content">{children}</div>
      <div className="btn-area">
        <Link href="/">
          <button type="button" className="btn">
            메인페이지로 가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorLayout;
