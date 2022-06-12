import Header from '../Header';
import Footer from '../Footer';
import PostForm from '../post/PostForm';
import useApp from "@/hooks/useApp"

const PostLayout = ({ children }) => {
  const app = useApp();
  
  return (
    <div className="wrap">
      <Header to="main" />
      <section className="post-content">{children}</section>
      {/* { app.device === "mobile" && <Footer /> } */}
      <PostForm />
    </div>
  );
};

export default PostLayout;
