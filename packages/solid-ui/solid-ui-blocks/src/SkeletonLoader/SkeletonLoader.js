import React from 'react';
import { motion } from 'framer-motion';

const BlogPostLoader = () => {
  return (
    <motion.div
      className="blog-post skeleton"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 0.7, transition: { yoyo: Infinity, duration: 1.5 } }}
    ></motion.div>
  );
};

export default BlogPostLoader;
