import React from "react";


const Blog = ({ post }) => {
  console.log(post)
  return (
    <>
      <div>
      <h2 dangerouslySetInnerHTML={{ __html: post.title }}></h2>
      {/* {featuredMediaUrl && <img src={featuredMediaUrl} alt={post.title} style={{ maxWidth: '100%' }} />} */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
    </>
  );
};

export default Blog;

