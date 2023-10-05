// noop

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, css, Flex, Spinner } from 'theme-ui';
import ContentButtons from '@solid-ui-components/ContentButtons';
import FormCheckbox from '@solid-ui-components/ContentForm/FormCheckbox';
import FormInput from '@solid-ui-components/ContentForm/FormInput';
import FormTextarea from '@solid-ui-components/ContentForm/FormTextarea';
import FormHidden from '@solid-ui-components/ContentForm/FormHidden';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Reveal from '@solid-ui-components/Reveal';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import { submitNews } from '@elegantstack/gatsby-theme-flexiblocks/src/store/ducks/contactSlice';

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
      backgroundColor: `rgba(255, 255, 255, 0.85)`
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
  const dispatch = useDispatch()
  const { news, status, contact } = useSelector(state => state.contact)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status === 'failed') {
      // Show the Reveal element
      setIsVisible(true)

      // Hide the Reveal element after a delay (e.g., 3 seconds)
      const hideTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 1000) // Adjust the delay as needed (in milliseconds)

      return () => {
        // Clear the timeout when the component unmounts
        clearTimeout(hideTimeout)
      }
    }
  }, [status])
  const formik = useFormik({
    initialValues: {},
    onSubmit: async values => {
      dispatch(submitNews({ data: values }))
    }
  })
  return (
    <form css={css(styles.form)} onSubmit={formik.handleSubmit}>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={identifier}
                id={`${id}.${identifier}`}
                value={formik.values[identifier] || value || ''}
                // Add other Formik-related props as needed
              />
            </Box>
          )
        })}
      </Box>
      {status === 'succeeded' && (
        <Flex>
          <Reveal effect='fadeInDown'>
            <BiCheckCircle size='20' css={css({ color: `success` })} />
          </Reveal>{' '}
          We will get in touch shortly
        </Flex>
      )}
      {/* Error messages */}
      {formik.errors.password && formik.touched.password && (
        <div>{formik.errors.password}</div>
      )}
      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
        <div>{formik.errors.confirmPassword}</div>
      )}
      <Box sx={{ textAlign: `center` }}>
        <button
          type='submit'
          style={{ background: 'transparent', border: 'none' }}
        >
          <ContentButtons
            content={buttons}
            wrapperStyles={styles.buttonsWrapper}
          />
        </button>
      </Box>
      <Box
        sx={styles.responseOverlay}
        css={isVisible ? styles.responseOverlay.active : null}
      >
        {status === 'loading' && (
          <Reveal effect='fadeInDown'>
            <Spinner size='64' color='alpha' />
          </Reveal>
        )}
        {status === 'succeeded' && (
          <Reveal effect='fadeInDown'>
            <BiCheckCircle size='64' css={css({ color: `success` })} />
          </Reveal>
        )}
        {status === 'failed' && isVisible && (
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
