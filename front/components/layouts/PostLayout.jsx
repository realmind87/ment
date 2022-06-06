import Header from '../Header';
import Footer from '../Footer';
import PostForm from '../post/PostForm';
import { useSelector } from 'react-redux';
import { librarySelector } from '../../reducers/slices/library';

const PostLayout = ({ children }) => {
  const { deviceType } = useSelector(librarySelector);
  
  return (
    <div className="wrap">
      <Header to="main" />
      <section className="post-content">{children}</section>
      {/* { deviceType === "mobile" && <Footer /> } */}
      <PostForm />
    </div>
  );
};

export default PostLayout;
