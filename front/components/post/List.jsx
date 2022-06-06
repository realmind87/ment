import { useCallback } from 'react';
import { useRouter } from 'next/router';

const List = ({ id, title, content, images }) => {
  const router = useRouter();

  const onRouterDetail = useCallback((id) => {
    router.push({
      pathname: `/post/${id}`,
    });
  }, []);

  return (
    <div className="post-box" onClick={() => onRouterDetail(id)}>
      {images && images.length > 0 && (
        <div className="post-box__thumb">
          <img src={`http://localhost:3065/${images[0].src}`} />
        </div>
      )}
      <div className="post-box__area">
        <strong className="tit">{title}</strong>
        <p className="txt-info">{content}</p>
      </div>
    </div>
  );
};

export default List;
