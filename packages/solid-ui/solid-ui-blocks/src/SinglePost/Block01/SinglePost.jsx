import React from "react";


const Cases = ({ post }) => {
  
  return (
    <>
      <div>
      <h2>{post.title.rendered}</h2>
      {/* {featuredMediaUrl && <img src={featuredMediaUrl} alt={post.title.rendered} style={{ maxWidth: '100%' }} />} */}
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
    </>
  );
};

export default Cases;

