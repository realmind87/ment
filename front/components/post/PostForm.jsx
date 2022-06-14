import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import Editor from './Editor';
import validation from '@/hooks/validation';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelector } from '@/reducers/slices/post';
import { closePostState } from '@/reducers/slices/post';
import { addPost, uploadImages, imageRemove } from '@/reducers/actions/post';
import backUrl from '../../config'

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, openPostFrom } = useSelector(postsSelector);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashTags, setHashTags] = useState('');

  const [errTitle, setErrTitle] = useState(false);
  const [errContent, setErrContent] = useState(false);

  const [errTitleMsg, setErrTitleMsg] = useState('제목');
  const [errContentMsg, setErrContentMsg] = useState('내용');

  const editor = useRef(null);

  const onClose = useCallback(() => {
    document.querySelector('#body').classList.remove('hidden');
    setTitle('');
    setContent('');
    setErrTitle(false);
    setErrContent(false);
    setErrTitleMsg('제목');
    setErrContentMsg('내용');
    dispatch(closePostState());
  }, []);

  const onValidation = useCallback((title, content) => {
    if (validation(title.length <= 0, setTitle, setErrTitle, setErrTitleMsg, '제목을 입력해 주세요.')) return false;
    return true;
  }, []);
  
  const onImageChange = useCallback((e) => {
    e.preventDefault();
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch(uploadImages(imageFormData));
  }, []);

  const onImageRemove = useCallback((index) => dispatch(imageRemove(index)), []);

  const onChangeTitle = useCallback(({ target }) => {
    setErrTitle(false);
    if (target.value <= 0) setErrTitleMsg('제목');
    setTitle(target.value);
  }, []);

  const onChangeHashTags = useCallback(({ target }) => {
    setHashTags(target.value);
  }, [])

  const onAddPost = useCallback((e) => {
      e.preventDefault();
      
      if (!onValidation(title)) return true;

      const formData = new FormData();
      imagePaths.forEach((img) => {
        formData.append('image', img);
      });
      formData.append('title', title);
      formData.append('content', editor.current.innerHTML);
      formData.append('hashtags', hashTags);

      dispatch(addPost(formData));
      dispatch(closePostState())
      
      setTitle('');
      setContent('');
      document.querySelector('#body').classList.remove('hidden');
    },
    [imagePaths, title, content, hashTags]);

  return (
    <Modal>
      {openPostFrom && (
        <div className="modal-wrap">
          <div className="modal-wrap__form">
            <header>게시물 등록</header>
            <div className="modal-wrap__content">
              <form encType="multipart/form-data" onSubmit={onAddPost}>
                <ul>
                  <li>
                    <label className="tit-label" htmlFor="tit-input">제목</label>
                    <div className="input-control">
                      <input
                        id="tit-input"
                        type="text"
                        className={errTitle ? 'err' : ''}
                        placeholder={errTitleMsg}
                        value={title}
                        onChange={onChangeTitle}
                      />
                    </div>
                  </li>

                  <li>
                    <label className="tit-label" htmlFor="textarea">내용</label>
                    <Editor ref={editor} />
                  </li>

                  <li>
                    <label className="tit-label" htmlFor="hashtag-input">해쉬태그</label>
                    <div className="input-control">
                      <input
                        id="hashtag-input"
                        type="text"
                        placeholder="#해쉬태그 입력"
                        value={hashTags}
                        onChange={onChangeHashTags}
                      />
                    </div>
                  </li>

                </ul>
                <div className="btn-area">
                  <button type="submit" className="btn">등록</button>
                </div>
              </form>
            </div>
            <button type="button" className="btn__close" onClick={onClose}>닫기</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PostForm;
