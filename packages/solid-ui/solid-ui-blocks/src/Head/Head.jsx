import React from 'react'

export default function Head({ element }) {
  return (
    <>
      <head dangerouslySetInnerHTML={{ __html: element }} />
      <link
        id='iub_css'
        type='text/css'
        as='style'
        rel='stylesheet'
        href='https://cdn.iubenda.com/iubenda_badge.css'
        media='screen'
      />
    </>
  )
}
