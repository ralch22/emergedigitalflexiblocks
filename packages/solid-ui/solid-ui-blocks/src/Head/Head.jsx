import React from 'react'

export default function Head({ element }) {
  return <head dangerouslySetInnerHTML={{ __html: element }} />
}
