import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, css, Spinner } from 'theme-ui';
import { navigate } from 'gatsby';
import Reveal from '@solid-ui-components/Reveal';
import ContentButtons from '@solid-ui-components/ContentButtons';
import FormCheckbox from '@solid-ui-components/ContentForm/FormCheckbox';
import FormInput from '@solid-ui-components/ContentForm/FormInput';
import FormTextarea from '@solid-ui-components/ContentForm/FormTextarea';
import FormHidden from '@solid-ui-components/ContentForm/FormHidden';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import useForm from '@helpers/useForm';
import { useFormik } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for validation
import { FormContext } from '@solid-ui-components/ContentForm';
import Divider from '@solid-ui-components/Divider/Divider';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import LOGIN from '../../../../themes/gatsby-theme-flexiblocks/src/mutations/login';
import REGISTER from '../../../../themes/gatsby-theme-flexiblocks/src/mutations/register';

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

// ... (previous imports and code)

const ContentForm = ({ id, form: { action, fields, buttons } = {} }) => {
  const [
    register,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(REGISTER);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (registerError) {
      // Show the Reveal element
      setIsVisible(true);

      // Hide the Reveal element after a delay (e.g., 3 seconds)
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Adjust the delay as needed (in milliseconds)

      return () => {
        // Clear the timeout when the component unmounts
        clearTimeout(hideTimeout);
      };
    }
  }, [registerError]);

  useEffect(() => {
    if (loginError) {
      // Show the Reveal element
      setIsVisible(true);

      // Hide the Reveal element after a delay (e.g., 3 seconds)
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Adjust the delay as needed (in milliseconds)

      return () => {
        // Clear the timeout when the component unmounts
        clearTimeout(hideTimeout);
      };
    }
  }, [loginError]);
  // const validationSchema = Yup.object().shape({
  //   // username: Yup.string().required('Invalid Username').required('Required')
  //   password: Yup.string().required('Required'),
  //   email: Yup.string().email('Invalid email').required('Email is required'),
  //   password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  //   confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //   .required('Confirm Password is required'),
  //   // Add validation for other fields as needed
  // });

  // Initialize different initialValues objects based on button text
  let initialValues = {};
  const buttonValue = buttons[0].text;

  switch (buttonValue) {
    case 'Contact':
      initialValues = {
        // Define initialValues for the contact form
        name: '',
        email: '',
        message: '',
        // Add other fields as needed
      };
      break;
    case 'Login':
      initialValues = {
        // Define initialValues for the login form
        username: '',
        password: '',
        // Add other fields as needed
      };
      break;
    case 'Create Account':
      initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
      break;
    default:
      // Handle unknown button text or any other action
      break;
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      switch (buttonValue) {
        case 'Send Message': // Handle contact form submission
          await submitContactForm(values);
          break;
        case 'Login': // Handle login form submission
          await handleLogin(values);
          break;
        case 'Create Account': // Handle register form submission
          await submitRegisterForm(values);
          break;
        default:
          // Handle unknown button text or any other action
          break;
      }
    },
  });
  const handleLogin = async values => {
    const loginInput = {
      username: values.username,
      password: values.password,
    };

    try {
      const response = await login({ variables: { input: loginInput } });

      if (
        response.data &&
        response.data.login &&
        response.data.login.authToken
      ) {
        // Successful login, handle authToken or redirect to a new page
        const auth = response.data.login;
        localStorage.setItem('auth', JSON.stringify(auth)); // Store the token in localStorage

        // Redirect to the dashboard or another page
        navigate('/dashboard');
      } else {
        // Handle login error, display a message to the user
        console.error('Login error:', response.errors[0].message);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };
  const submitContactForm = async values => {
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
        {
          name: 'firstName',
          value: values.firstName,
        },
        {
          name: 'lastName',
          value: values.lastName,
        },
        {
          name: 'message',
          value: values.message,
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

  const submitRegisterForm = async values => {
    const clientMutationId = uuidv4();

    const registerInput = {
      clientMutationId,
      password: values.password,
      email: values.email,
      username: values.username,
    };

    try {
      const response = await register({ variables: { input: registerInput } });

      if (response.data && response.data.registerUser) {
        // Successful registration, handle authToken or redirect to a new page
        const auth = response.data.registerUser;
        localStorage.setItem('auth', JSON.stringify(auth)); // Store the token in localStorage

        // Redirect to the dashboard or another page
        navigate('/dashboard');
      } else {
        // Handle registration error and display a message to the user
        console.error('Registration error:', response.errors[0].message);
      }
    } catch (error) {
      console.error('Registration error:', error.message);
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
      {buttonValue === 'Create Account' ? (
        <Box
          sx={styles.responseOverlay}
          css={
            isVisible || registerLoading || registerData
              ? styles.responseOverlay.active
              : null
          }
        >
          {registerLoading && (
            <Reveal effect="fadeInDown">
              <Spinner size="64" color="alpha" />
            </Reveal>
          )}
          {registerData && (
            <Reveal effect="fadeInDown">
              <BiCheckCircle size="64" css={css({ color: `success` })} />
            </Reveal>
          )}
          {registerError && isVisible && (
            <BiErrorCircle size="64" css={css({ color: `error` })} />
          )}
        </Box>
      ) : buttonValue === 'Login' ? (
        <Box
          sx={styles.responseOverlay}
          css={
            isVisible || loginLoading || loginData
              ? styles.responseOverlay.active
              : null
          }
        >
          {loginLoading && (
            <Reveal effect="fadeInDown">
              <Spinner size="64" color="alpha" />
            </Reveal>
          )}
          {loginData && (
            <Reveal effect="fadeInDown">
              <BiCheckCircle size="64" css={css({ color: `success` })} />
            </Reveal>
          )}
          {loginError && isVisible && (
            <BiErrorCircle size="64" css={css({ color: `error` })} />
          )}
        </Box>
      ) : null}
      {/* */}
    </form>
  );
};

ContentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  success: PropTypes.bool,
};

export default ContentForm;
