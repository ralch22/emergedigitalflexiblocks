import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, css, Spinner } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import ContentButtons from '@solid-ui-components/ContentButtons'
import FormCheckbox from '@solid-ui-components/ContentForm/FormCheckbox'
import FormInput from '@solid-ui-components/ContentForm/FormInput'
import FormTextarea from '@solid-ui-components/ContentForm/FormTextarea'
import FormHidden from '@solid-ui-components/ContentForm/FormHidden'
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi'
import useForm from '@helpers/useForm'
import { FormContext } from '@solid-ui-components/ContentForm'
import Divider from '@solid-ui-components/Divider/Divider'

const styles = {
  form: {
    position: `relative`
  },
  responseOverlay: {
    position: `absolute`,
    backgroundColor: `transparent`,
    width: `full`,
    height: `105%`,
    transition: `background-color 350ms ease-in`,
    textAlign: `center`,
    zIndex: -1,
    p: 3,
    top: 0,
    left: 0,
    active: {
      zIndex: 0,
      backgroundColor: `rgba(255,255,255,0.85)`
    }
  },
  buttonsWrapper: {
    display: `inline-flex`,
    flexWrap: `wrap`,
    justifyContent: `center`,
    '.button-group-button + .button-group-link': {
      flex: `100%`,
      ml: 0,
      mt: 3
    } 
  }
}

const NewsletterForm = ({ id, form: { action, fields, buttons } = {} }) => {
  const [message, setMessage] = useState(null)
  const { handleSubmit, submitting, success } = useForm()
  const { formValues, setFormValues } = useContext(FormContext)
  const formId = id
 
  
 
  useEffect(() => {
    return () =>
      success !== undefined &&
      submitting === false &&
      setFormValues({
        ...formValues,
        [formId]: {}
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, submitting, setFormValues])

  const onSubmit = async (e) => {
    await handleSubmit(e, { action })
    const hubspot_response = await submit_hubspot_form();
   setMessage(hubspot_response); // make sure it succeeded!
    
  }
  
  const submit_hubspot_form = async () => {
    const portalId = "7177031"; // example portal ID (not real)
    const formGuid = "6dfb89a8-a9ac-4a5c-82ff-17ff38d095b1"; // example form GUID (not real)
    const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;
  
    const requestBody = {
      portalId,
      formGuid,
      fields: [
        {
          name: 'email',
          value: formValues?.[formId].email,
        }
      ],
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
      
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
 
  const onChange = e => {
    setFormValues({
      ...formValues,
      [formId]: {
        ...formValues?.[formId],
        [e.target.name]: e.target.checked || e.target.value
      }
    })
  }

  return (
    <form
      css={css(styles.form)}
      onSubmit={onSubmit}
      method='POST'
      action={action}
      demo={action ? undefined : 'demo'}
    >
      <Box variant='forms.row'>
        {fields?.map(({ identifier, value, ...props }, index) => {
          let Component
          switch (props.type) {
            case 'PASSWORD':
            case 'EMAIL':
            case 'TEXT':
              Component = FormInput
              break
            case 'TEXTAREA':
              Component = FormTextarea
              break
            case 'CHECKBOX':
              Component = FormCheckbox
              break
            case 'HIDDEN':
              Component = FormHidden
              break
            default:
              break
          }

          return (
            <Box
              key={`index-${index}`}
              variant={props.compact ? 'forms.compact' : 'forms.full'}
            >
              <Component
                {...props}
                onChange={onChange}
                name={identifier}
                id={`${formId}.${identifier}`}
                value={formValues?.[formId]?.[identifier] || value || undefined}
              />
            </Box>
          )
        })}
      </Box>
      <Box sx={{ textAlign: `center` }}>
        <Divider space="1" />
        <ContentButtons
          content={buttons}
          wrapperStyles={styles.buttonsWrapper}
        />
      </Box>
      <Box
        sx={styles.responseOverlay}
        css={(submitting || success) && styles.responseOverlay.active}
      >
        {submitting && (
          <Reveal effect='fadeInDown'>
            <Spinner size='64' color='alpha' />
          </Reveal>
        )}
        {success === true && (
          <Reveal effect='fadeInDown'>
            <h4>{message}</h4>
            <BiCheckCircle size='64' css={css({ color: `success` })} />
          </Reveal>
        )}
        {success === false && (
          <BiErrorCircle size='64' css={css({ color: `error` })} />
        )}
      </Box>
    </form>
  )
}

export default NewsletterForm

NewsletterForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  success: PropTypes.bool
}
