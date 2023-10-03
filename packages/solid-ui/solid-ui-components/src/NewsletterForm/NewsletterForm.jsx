import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, css, Spinner } from 'theme-ui';
import Reveal from '@solid-ui-components/Reveal';
import ContentButtons from '@solid-ui-components/ContentButtons';
import FormCheckbox from '@solid-ui-components/ContentForm/FormCheckbox';
import FormInput from '@solid-ui-components/ContentForm/FormInput';
import FormTextarea from '@solid-ui-components/ContentForm/FormTextarea';
import FormHidden from '@solid-ui-components/ContentForm/FormHidden';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';

import { useFormik } from 'formik';

const styles = {
  form: {
    position: `relative`,
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
      backgroundColor: `rgba(255,255,255,0.85)`,
    },
  },
  buttonsWrapper: {
    display: `inline-flex`,
    flexWrap: `wrap`,
    justifyContent: `center`,
    '.button-group-button + .button-group-link': {
      flex: `100%`,
      ml: 0,
      mt: 3,
    },
  },
};

const NewsletterForm = ({ id, form: { action, fields, buttons } = {} }) => {
  const formik = useFormik({
    initialValues: '',
    onSubmit: async values => {
      submitNewsForm(values);
    },
  });
  const submitNewsForm = async values => {
    const portalId = GATSBY_HUBSPOT_PORTALID; // example portal ID (not real)
    const formGuid = GATSBY_HUBSPOT_FORMID; // example form GUID (not real)
    const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const requestBody = {
      portalId,
      formGuid,
      fields: [
        {
          name: 'email',
          value: values.email,
        },
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
  };

  return (
    <form css={css(styles.form)} onSubmit={formik.handleSubmit}>
      <Box variant="forms.row">
        {fields?.map(({ identifier, value, ...props }, index) => {
          let Component;
          switch (props.type) {
            case 'PASSWORD':
            case 'EMAIL':
            case 'TEXT':
              Component = FormInput;
              break;
            case 'TEXTAREA':
              Component = FormTextarea;
              break;
            case 'CHECKBOX':
              Component = FormCheckbox;
              break;
            case 'HIDDEN':
              Component = FormHidden;
              break;
            default:
              break;
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
          );
        })}
      </Box>
      {/* Error messages */}
      {formik.errors.password && formik.touched.password && (
        <div>{formik.errors.password}</div>
      )}
      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
        <div>{formik.errors.confirmPassword}</div>
      )}
      <Box sx={{ textAlign: `center` }}>
        <button
          type="submit"
          style={{ background: 'transparent', border: 'none' }}
        >
          <ContentButtons
            content={buttons}
            wrapperStyles={styles.buttonsWrapper}
          />
        </button>
      </Box>
      {/* */}
    </form>
  );
};

export default NewsletterForm;

NewsletterForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  success: PropTypes.bool,
};
