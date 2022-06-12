import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '@/reducers/actions/post';

const CommendForm = ({ id }) => {
    const dispatch = useDispatch();
    const postId = id;
    const [comment, setComment] = useState('');
    
    const onChangeCommend = useCallback(({ target }) => {
      setComment(target.value);
    }, []);
  
    const onPutCommend = useCallback(
      () => dispatch(addComment({ content: comment, postId })),
      [comment],
    );
      
    return (
      <div className="commend-wrap__form">
        <div className="input-control">
          <input type="text" value={comment} onChange={onChangeCommend} />
        </div>
        <button type="button" className="btn" onClick={onPutCommend}>
          등록
        </button>
      </div>
    )
}

export default CommendForm;