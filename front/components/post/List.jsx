import { useCallback } from 'react'
//import {} from '@/reducers/slices/post'
import { useRouter } from 'next/router'
import backUrl from '../../config'

const List = ({ id, title, content, images, comments, user, likers }) => {

  const router = useRouter()
  const onRouterDetail = useCallback((id) => {
    router.push({pathname: `/post/${id}`});
  }, []);

  return (
    <div className="post-box" onClick={() => onRouterDetail(id)}>
      {images && images.length > 0 && (
        <div className="post-box__thumb">
          <img src={`${backUrl}/${images[0].src}`} />
        </div>
      )}
      <div className="post-box__area">
        <strong className="tit">{title}</strong>
        <p className="txt-info">{content.replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/ig,"")}</p>
        <div className='post-box-info'>
          <ul>
            <li>
              <div className='small-thumnail'><img src={`${backUrl}/${user.Images[0].src}`} /></div> 
              <strong>{user.nickname}</strong>
            </li>
            <li className='comment'>{comments.length} 댓글</li>
            <li className='ico like'>{likers && likers.length}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;
