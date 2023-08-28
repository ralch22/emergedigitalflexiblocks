import cheerio from 'cheerio'

// Replace, add, or remove elements by class using Cheerio
export default function manipulateContentByClass(htmlContent, classToManipulate, newElement) {
  const $ = cheerio.load(htmlContent);

  $(classToManipulate).each((index, element) => {
    const manipulatedElement = $(newElement);
    $(element).replaceWith(manipulatedElement);
  });

  return $.html();
};

