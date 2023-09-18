import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, css, Spinner } from 'theme-ui'
import { useSelector, useDispatch } from 'react-redux';
import { fetchShipping, updateShipping, fetchBilling, updateBilling } from '../../../../themes/gatsby-theme-flexiblocks/src/store/ducks/addressSlice'; 
import ContentButtons from '@solid-ui-components/ContentButtons'
import FormCheckbox from '@solid-ui-components/ContentForm/FormCheckbox'
import FormInput from '@solid-ui-components/ContentForm/FormInput'
import FormTextarea from '@solid-ui-components/ContentForm/FormTextarea'
import FormHidden from '@solid-ui-components/ContentForm/FormHidden'
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi'
import { useFormik } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for validation
import Reveal from '@solid-ui-components/Reveal/Reveal';


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
    zIndex: 1,
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


// ... (previous imports and code)

const auth = typeof window !== 'undefined' ? localStorage.getItem("auth") : null
const parsedData = JSON.parse(auth);

const ContentForm = ({ id, form: { action, fields, buttons } = {} }) => {
  
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
  const { shipping, status, billing } = useSelector((state) => state.address);
  useEffect(() => {
    dispatch(fetchShipping({ id: parsedData && parsedData.user.id }));
    dispatch(fetchBilling({ id: parsedData && parsedData.user.id }));
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
  let initialValues = {};
  const buttonValue = buttons[0].text;
  console.log("initial:", initialValues)
  console.log(buttonValue)
  // Check if the shipping array is empty
if (Object.keys(shipping).length !== 0) {
  if (buttonValue === 'Update Shipping') {
    initialValues = {
      first_name: shipping.first_name,
      last_name: shipping.last_name,
      company: shipping.company,
      address_1: shipping.address_1,
      address_2: shipping.address_2,
      city: shipping.city,
      state: shipping.state,
      postcode: shipping.postcode,
      country: shipping.country,
    };
  } else {
    initialValues = {
      first_name: billing.first_name,
      last_name: billing.last_name,
      company: billing.company,
      address_1: billing.address_1,
      address_2: billing.address_2,
      city: billing.city,
      state: billing.state,
      postcode: billing.postcode,
      country: billing.country,
      email: billing.email,
      phone: billing.phone,
    };
  }
}
 

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {

      switch (buttonValue) {
        case 'Update Shipping': // Handle contact form submission
          await handleShippingForm(values);
          break;
        case 'Update Billing': // Handle login form submission
          await handleBillingForm(values);
          break;
        default:
          // Handle unknown button text or any other action
          break;
      }
    },
  });
  const handleBillingForm = async ({
    first_name,
    last_name,
    company ,
    address_1,
    address_2,
    city,
    state,
    postcode,
    country,
    email,
    phone
  }) => {
   const data = {
    billing: {
      first_name,
      last_name,
      company ,
      address_1,
      address_2,
      city,
      state,
      postcode,
      country,
      phone,
      email
    }
   }
   dispatch(updateBilling({ id: parsedData && parsedData.user.id, data }));
  };
  const handleShippingForm = async ({
    first_name,
    last_name,
    company ,
    address_1,
    address_2,
    city,
    state,
    postcode,
    country
  }) => {
   const data = {
    shipping: {
      first_name,
      last_name,
      company ,
      address_1,
      address_2,
      city,
      state,
      postcode,
      country
    }
   }
   dispatch(updateShipping({ id: parsedData && parsedData.user.id, data }));
  };
    


  return (
    <form
      css={css(styles.form)}
      onSubmit={formik.handleSubmit}
    >
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
        
        <button type='submit' style={{ background: 'transparent', border: 'none' }}>
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
      </Box>
    </form>
  );
};

ContentForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  success: PropTypes.bool
}

export default ContentForm;

