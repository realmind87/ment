import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal';
import validation from '../../hooks/validation';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelector } from '../../reducers/slices/post';
import { closePostState } from '../../reducers/slices/post';
import {
  addPost,
  uploadImages,
  imageRemove,
} from '../../reducers/actions/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, openPostFrom } = useSelector(postsSelector);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [errTitle, setErrTitle] = useState(false);
  const [errContent, setErrContent] = useState(false);

  const [errTitleMsg, setErrTitleMsg] = useState('제목');
  const [errContentMsg, setErrContentMsg] = useState('내용');

  const onClose = useCallback(() => {
    document.querySelector('#body').classList.remove('hidden');
    setImg(null);
    setTitle('');
    setContent('');
    setErrTitle(false);
    setErrContent(false);
    setErrTitleMsg('제목');
    setErrContentMsg('내용');
    dispatch(closePostState());
  }, []);

  const onValidation = useCallback((title, content) => {
    if (
      validation(
        title.length <= 0,
        setTitle,
        setErrTitle,
        setErrTitleMsg,
        '제목을 입력해 주세요.',
      )
    )
      return false;
    if (
      validation(
        content.length <= 0,
        setContent,
        setErrContent,
        setErrContentMsg,
        '내용을 입력해 주세요.',
      )
    )
      return false;
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

  const onImageRemove = useCallback(
    (index) => dispatch(imageRemove(index)),
    [],
  );

  const onChangeTitle = useCallback(({ target }) => {
    setErrTitle(false);
    if (target.value <= 0) setErrTitleMsg('제목');
    setTitle(target.value);
  }, []);

  const onChangeContent = useCallback(({ target }) => {
    setErrContent(false);
    if (target.value <= 0) setErrContentMsg('내용');
    setContent(target.value);
  }, []);

  const onAddPost = useCallback(
    (e) => {
      e.preventDefault();
      if (!onValidation(title, content)) return true;
      const formData = new FormData();
      imagePaths.forEach((img) => {
        formData.append('image', img);
      });
      formData.append('title', title);
      formData.append('content', content);

      dispatch(addPost(formData));
      dispatch(closePostState())
      setImg(null);
      setTitle('');
      setContent('');
      document.querySelector('#body').classList.remove('hidden');
    },
    [imagePaths, title, content],
  );

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
                    <span className="tit-label">이미지</span>
                    <div className="img-wrap">
                      <div className="img-content">
                        {imagePaths &&
                          imagePaths.map((img, index) => (
                            <div key={index} className="img-pre-view">
                              <div className="img-area">
                                <img src={`http://localhost:3065/${img}`} />
                              </div>
                              <button
                                type="button"
                                className="btn-del"
                                onClick={() => onImageRemove(index)}
                              >
                                삭제
                              </button>
                            </div>
                          ))}

                        {imagePaths && imagePaths.length === 0 && (
                          <>
                            <label
                              className="img-area"
                              htmlFor="img-input"
                            ></label>
                            <input
                              accept="image/*"
                              type="file"
                              id="img-input"
                              name="image"
                              multiple
                              onChange={onImageChange}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <label className="tit-label" htmlFor="tit-input">
                      제목
                    </label>
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
                    <label className="tit-label" htmlFor="textarea">
                      내용
                    </label>
                    <div className="input-control">
                      <textarea
                        id="textarea"
                        className={errContent ? 'err' : ''}
                        placeholder={errContentMsg}
                        value={content}
                        onChange={onChangeContent}
                      />
                    </div>
                  </li>
                </ul>
                <div className="btn-area">
                  <button type="submit" className="btn">
                    등록
                  </button>
                </div>
              </form>
            </div>
            <button type="button" className="btn__close" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PostForm;
