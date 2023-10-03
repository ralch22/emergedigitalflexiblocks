import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, css, Spinner } from 'theme-ui';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUser,
  updateUser,
} from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/userSlice';
import { addUserInfo } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/checkoutSlice';
import ContentButtons from '@solid-ui-components/ContentButtons';
import FormCheckbox from '@solid-ui-components/ContentForm/FormCheckbox';
import FormInput from '@solid-ui-components/ContentForm/FormInput';
import FormTextarea from '@solid-ui-components/ContentForm/FormTextarea';
import FormHidden from '@solid-ui-components/ContentForm/FormHidden';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import Reveal from '@solid-ui-components/Reveal/Reveal';

import { useFormik } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for validation

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

const auth =
  typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const parsedData = JSON.parse(auth);

const ContentForm = ({
  id,
  form: { action, fields, buttons } = {},
  checkout,
}) => {
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
  const dispatch = useDispatch();
  const { user, status } = useSelector(state => state.user);
  const userInfo = useSelector(state => state.checkout.order.userInfo);
  useEffect(() => {
    dispatch(fetchUser({ id: parsedData && parsedData.user.id }));
    // Dispatch actions for other entities here
  }, [dispatch]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status === 'succeeded') {
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
  }, [status]);
  useEffect(() => {
    // Check if the token is expired
    if (parsedData && parsedData.user.authToken) {
      const currentTime = Date.now() / 1000; // Get current timestamp in seconds
      if (currentTime >= parsedData.user.authToken) {
        // Token has expired, log out the user and redirect
        handleLogout(); // Implement your logout function
        navigate('/'); // Redirect to the homepage
      }
    }
  }, []);
  let initialValues = {
    first_name: user.first_name,
    last_name: user.last_name,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      handleUserForm(values);
    },
  });

  function handleFieldChange(e) {
    const { name, value } = e.target;
    formik.handleChange(e);
    dispatch(addUserInfo({ ...userInfo, [name]: value }));
  }

  const handleUserForm = async ({ first_name, last_name }) => {
    const data = {
      first_name,
      last_name,
    };
    dispatch(updateUser({ id: parsedData && parsedData.user.id, data }));
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
                onChange={checkout ? handleFieldChange : formik.handleChange}
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
      {!checkout && (
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
      )}

      {/* <Box
        sx={styles.responseOverlay}
        css={isVisible ? styles.responseOverlay.active : null}
      >
        {status === "loading" && (
          <Reveal effect='fadeInDown'>
            <Spinner size='64' color='alpha' />
          </Reveal>
        )}
        {status === "succeeded" && isVisible && (
          <Reveal effect='fadeInDown'>
            <BiCheckCircle size='64' css={css({ color: `success` })} />
          </Reveal>
        )}
        {status === "failed" && (
          <BiErrorCircle size='64' css={css({ color: `error` })} />
        )}
      </Box> */}
    </form>
  );
};

ContentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  success: PropTypes.bool,
};

export default ContentForm;
