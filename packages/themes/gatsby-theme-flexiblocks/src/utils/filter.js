import cheerio from 'cheerio'

// Replace, add, or remove elements by class using Cheerio
export default function manipulateContentByClass(
  htmlContent,
  classToManipulate,
  newElement
) {
  const $ = cheerio.load(htmlContent)

  $(classToManipulate).each((index, element) => {
    const manipulatedElement = $(newElement)
    $(element).replaceWith(manipulatedElement)
  })

  return $.html()
}

export const regexString = string => {
  const parts = string.split('/')
  if (parts.length >= 3) {
    const secondDirectory = parts[2]
    return secondDirectory
  } else {
    return null
  }
}
