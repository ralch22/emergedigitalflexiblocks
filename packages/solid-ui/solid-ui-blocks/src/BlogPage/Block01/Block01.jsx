import React from "react";
import { Container, Flex, Box, Badge, Link, Grid, Ima } from 'theme-ui'
import { StaticImage } from "gatsby-plugin-image"
import ContentContainer from '@solid-ui-components/ContentContainer'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Text from 'theme-ui'
import CustomImages from '@solid-ui-components/CustomImage'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import { format } from "date-fns";

import { FaRegClock } from 'react-icons/fa'

const styles = {
  wrapper: {
    flex: [`100%`, null, null, 1],
    minWidth: 400,
    maxWidth: [`none`, null, null, 500],
    cursor: `pointer`,
    p: 3
  },
  card: {
    overflow: `hidden`,
    height: `full`
  },
  content: {
    alignItems: `stretch`,
    flexDirection: [`row`, null, null, `column`],
    height: `full`
  },
  body: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    flex: 1,
    p: 4
  },
  footerWrapper: {
    alignItems: `center`
  },
  postInfo: {
    flex: 1,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    color: `omega`,
    ml: 3
  },
  imageWrapper: {
    textAlign: `center`,
    position: `relative`,
    display: `block`,
    height: `full`
  },
  image: {
    display: [`none`, `block`],
    height: `full`,
    bg: `omegaLighter`,
    borderRadius: `default`,
    minHeight: `15rem`,
    width: `100%`,
    div: {
      p: `0 !important`
    }
  },
  avatar: {
    size: 42,
    bg: `omegaLighter`,
    borderRadius: `full`,
    borderStyle: `solid`,
    borderWidth: `md`,
    borderColor: `omegaLighter`,
    boxSizing: `content-box`,
    img: {
      objectPosition: 'top center !important'
    }
  }
}

// const BlogBlock01 = ({ content: { text, collection, buttons }, posts }) => {
//   console.log("posts:", posts)
  
//   return (
//     // <Container>
//     //   {collection && (
//     //     <Reveal effect='fadeIn'>
//     //       <Flex sx={{ flexWrap: `wrap`, justifyContent: `center`, m: -3 }}>
//     //         {collection.map(({ container, text, images, avatar, buttons }) => {
//     //              return (
//     //               <>
//     //                  {posts.map(
//     //                 ({ id, content, date, author, excerpt, title, categories, featuredImage }, index) => {
//     //                   const imageData = featuredImage.node.sourceUrl
//     //                   const formatDate = (dateString) => {
//     //                     const date = new Date(dateString);
//     //                     return format(date, "MMMM dd, yyyy");
//     //                   };
                      
//     //                   const calculateReadingPeriod = (content) => {
//     //                     // Assuming average reading speed of 200 words per minute
//     //                     const words = content.split(" ").length;
//     //                     const readingSpeed = 200; // words per minute
//     //                     const readingTimeInMinutes = words / readingSpeed;
//     //                     return Math.ceil(readingTimeInMinutes);
//     //                   }
      
//     //                   const readingTime = calculateReadingPeriod(content)
//     //                   const dateFormat = formatDate(date)
//     //                   return (
//     //                     <Box key={`item-${id}`} sx={styles.wrapper}>
//     //                       <ContentContainer
//     //                         content={container}
//     //                         variant='cards.interactive'
//     //                         sx={styles.card}
//     //                       >
//     //                         <Flex as='article' sx={styles.content}>
//     //                           {/* Image */}
//     //                           <Box sx={{ flex: [0, 1], m: 2, mb: [null, null, null, 0] }}>
//     //                             <Box sx={styles.imageWrapper}>
//     //                             <StaticImage
//     //                                 src={imageData}
//     //                                 alt={featuredImage.node.alt}
//     //                                 style={styles.image}
//     //                                 placeholder="blurred"
//     //                                 layout="fixed"
//     //                               />
//     //                             </Box>
//     //                           </Box>
//     //                           <Box sx={styles.body}>
//     //                             {/* Category */}
//     //                             {categories?.nodes?.map(({ name, id }) => (
//     //                               <Box sx={{ display: `inline-block` }} key={id}>
//     //                               <Box mb='3'>
//     //                                 <Badge
//     //                                   variant='tag'
//     //                                   sx={{ bg: `alphaLighter` }}
//     //                                   color={text[0]?.color}
//     //                                 >
//     //                                   {name}
//     //                                 </Badge>
//     //                               </Box>
//     //                             </Box>
//     //                             ))}
//     //                             {/* Title */}
//     //                             <Text
//     //                               sx={{ flex: [0, 0, `auto`] }}>{title}</Text>
//     //                             {/* Excerpt */}
//     //                             <Text
//     //                               content={text?.[2]}
//     //                               variant='small'
//     //                               sx={{ flex: `auto`, mb: 3 }}
//     //                             >{excerpt}</Text>
//     //                             {/* Footer */}
//     //                             <Box sx={{ variant: `text.small` }}>
//     //                               <Flex sx={styles.footerWrapper}>
//     //                               <StaticImage
//     //                                 src={author?.node?.avatar.url}
//     //                                 alt={featuredImage.node.alt}
//     //                                 style={styles.avatar}
//     //                                 placeholder="blurred"
//     //                                 layout="fixed"
//     //                               />
//     //                                 <Flex sx={styles.postInfo}>
//     //                                   {/* Author */}
//     //                                   <Text
//     //                                     content={text?.[3]}
//     //                                     sx={{
//     //                                       display: `inline-block`,
//     //                                       flexBasis: `full`
//     //                                     }}
//     //                                   >
//     //                                     <Link color={text?.[3]?.color}>
//     //                                       <strong>{author?.node?.name}</strong>
//     //                                     </Link>
//     //                                   </Text>
//     //                                   {/* Info */}
//     //                                   <Flex sx={{ alignItems: `center` }}>
//     //                                     <Text
//     //                                       sx={{ display: `inline-block` }}
//     //                                       mr='2'
//     //                                     >
//     //                                       {formatDate}
//     //                                     </Text>
//     //                                     {readingTime && <FaRegClock />}
//     //                                     <Text
//     //                                       sx={{ display: `inline-block` }}
//     //                                       ml='2'
//     //                                     >{readingTime}</Text>
//     //                                   </Flex>
//     //                                 </Flex>
//     //                               </Flex>
//     //                             </Box>
//     //                             {buttons && (
//     //                               <>
//     //                                 <Divider space={2} />
//     //                                 <ContentButtons content={buttons} />
//     //                               </>
//     //                             )}
//     //                           </Box>
//     //                         </Flex>
//     //                       </ContentContainer>
//     //                     </Box>
//     //                   )
//     //                 }
//     //               )}
//     //               </>
//     //              )
//     //         })}
//     //       </Flex>
//     //     </Reveal>
//     //   )}
//     //   {buttons && (
//     //     <>
//     //       <Divider space={3} />
//     //       <ContentButtons content={buttons} />
//     //     </>
//     //   )}
//     // </Container>
    
//   )
// }


// export default WithDefaultContent(BlogBlock01)

const Posts = ({ posts }) => {

  return (
    <Grid columns={[1, 2]} gap={4}>
      {posts.map(
        ({ id, content, date, author, excerpt, title, categories, featuredImage }, index) => {
          const imageData = featuredImage?.node?.sourceUrl
          console.log(excerpt)
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return format(date, "MMMM dd, yyyy");
          };
          
          const calculateReadingPeriod = (content) => {
            // Assuming average reading speed of 200 words per minute
            const words = content.split(" ").length;
            const readingSpeed = 200; // words per minute
            const readingTimeInMinutes = words / readingSpeed;
            return Math.ceil(readingTimeInMinutes);
          }

          const readingTime = calculateReadingPeriod(content)
          const dateFormat = formatDate(date)
          return (
            <Box
            key={id}
            p={4}
            bg="white"
            boxShadow="md"
            borderRadius="md"
            styles={styles.wrapper}
            sx={{ transition: "transform 0.2s", "&:hover": { transform: "scale(1.02)" } }}
          >
            <Box sx={{ flex: [0, 1], m: 2, mb: [null, null, null, 0] }}>
              <Box sx={styles.imageWrapper}>                          
              <img
                src={imageData}
                alt={featuredImage.node.alt}
                style={styles.image}
              />
                </Box>
              </Box>
              <Box sx={styles.body}>
                {/* Category */}
                <Flex>
                {categories?.nodes?.map(({ name, id }) => (
                  <Box mb="3" sx={{ display: `flex` }} key={id}>
                  <Box>
                    <Badge
                      variant='tag'
                      sx={{ bg: `alphaLighter` }}
                      color="alphaDark"
                    >
                      {name}
                    </Badge>
                  </Box>
                </Box>
                ))}
                </Flex>
           
                <h2 style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: title }} />
                <p dangerouslySetInnerHTML={{ __html: excerpt }} /> 
            </Box>
            <Flex sx={styles.footerWrapper}>

                <img
                  src={author?.node?.avatar.url}
                  alt={featuredImage.node.alt}
                  style={styles.avatar}
                />
                  <Flex sx={styles.postInfo}>
                    {/* Author */}
                    <h5
                      sx={{
                        display: `inline-block`,
                        flexBasis: `full`
                      }}
                    >
                      <Link>
                        <strong>{author?.node?.name}</strong>
                      </Link>
                    </h5>
                    {/* Info */}
                    <Flex sx={{ alignItems: `center` }}>
                      <h5
                        sx={{ display: `inline-block` }}
                        mr='2'
                      >
                        {formatDate}
                      </h5>
                      {readingTime && <FaRegClock />}
                      <h5
                        style={{ display: `inline-block`, marginLeft: '1em' }}
                      >{readingTime} min</h5>
                    </Flex>
                  </Flex>
                </Flex>
              

      
          </Box>
          )
        }
      )}
    </Grid>
  );
};

export default WithDefaultContent(Posts);

