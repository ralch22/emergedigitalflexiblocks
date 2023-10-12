import cheerio from 'cheerio';
import _ from 'lodash';

// Replace, add, or remove elements by class using Cheerio
export default function manipulateContentByClass(
  htmlContent,
  classToManipulate,
  newElement,
) {
  const $ = cheerio.load(htmlContent);

  $(classToManipulate).each((index, element) => {
    const manipulatedElement = $(newElement);
    $(element).replaceWith(manipulatedElement);
  });

  return $.html();
}

export const allRelatedPosts = (allPosts, currentPost) => {
  const hasSharedCategoryOrTag = (postA, postB) => {
    console.log('has', `${postA} : ${postB}`);
    const sharedCategories = _.intersectionBy(
      postA.categories.nodes,
      postB.categories.nodes,
      'id',
    );
    const sharedTags = _.intersectionBy(
      postA.tags.nodes,
      postB.tags.nodes,
      'id',
    );
    return sharedCategories.length > 0 || sharedTags.length > 0;
  };
  return allPosts.filter(
    post =>
      post.id !== currentPost.id && hasSharedCategoryOrTag(currentPost, post),
  );
};

export const regexString = string => {
  const parts = string.split('/');
  if (parts.length >= 3) {
    const secondDirectory = parts[2];
    return secondDirectory;
  } else {
    return null;
  }
};
