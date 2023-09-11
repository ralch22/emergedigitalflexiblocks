import React from 'react'
import { Layout, Stack, Main, Sidebar } from '@solid-ui-layout'
import PageTitle from '@solid-ui-components/PageTitle'
import Divider from '@solid-ui-components/Divider'
import Seo from '@solid-ui-blocks/Seo'
import ContactForm from '@solid-ui-blocks/ContactForm'
import ContactInfo from '@solid-ui-blocks/ContactInfo'
import Commitment from '@solid-ui-blocks/Commitment'

const PageContact = props => (
  <Layout {...props}>
    <Seo title='Contact' />
    <Divider />
    <Stack>
      <Main>
        <PageTitle
          header="Let's Connect"
          subheader='FlexiBlog theme comes with a pre-made contact form component.
					You can integrate this form with serverless services such as Formspree, Getform,
					FormKeep and others to receive form submissions via email.'
        />
        <Divider />
        <ContactForm />
      </Main>
      <Sidebar>
        <Commitment />
        <Divider />
        <ContactInfo />
      </Sidebar>
    </Stack>
  </Layout>
)

export default PageContact
