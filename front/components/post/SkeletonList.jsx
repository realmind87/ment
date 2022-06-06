const SkeletonList = () => {
  return (
    <div className="post-box skeleton-area">
      <div className="post-box__thumb skeleton"></div>
      <div className="post-box__area">
        <strong className="tit skeleton__tit"></strong>
        <p className="txt-info skeleton__text"></p>
        <p className="txt-info skeleton__text"></p>
      </div>
    </div>
  );
};

export default SkeletonList;
