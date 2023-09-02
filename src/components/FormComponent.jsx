import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Box, makeStyles, Typography } from '@material-ui/core';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const FormComponent = () => {
  const useStyles = makeStyles(theme => ({
    form_container: {
      display: 'flex',
      marginBottom: '25px',
      padding: '12px'
    },
    field_block: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    field: {
      maxWidth: '300px',
      width: '300px',
      height: '50px',
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: '15px',
      marginRight: '15px',
      '& .MuiFormControl-root': {
        border: 0,
        margin: 0,
        display: 'inline-flex',
        padding: 0,
        position: "relative",
        minWidth: '100%',
        flexDirection: 'column',
        verticalAlign: 'top',
      }
    },
    buttons_container: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '0px 48px 16px 24px'
    },
  }))
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      fullName: '',
      mobileNo: '',
      email: '',
      jobType: '',
      dateOfBirth: '',
      preferredLocation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (<div>
    <form
      onSubmit={formik.handleSubmit}
    >
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 12, width: '25ch' },
        }}
        className={classes.form_container}
      >
        {fields && fields.length ? fields.map((field, index) => {
          return <Typography component="div" className={classes.field}><TextField
            id={field.id}
            name={field.name}
            select={field.options ? true : false}
            label={field.label}
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
          >
            {field.options && field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Typography>
        }) : ''}
      </Box>
    </form>
    <Typography component="div" className={`${classes.buttons_container}`}>
      <Button color="primary" variant="outlined" >
        Add User
      </Button>
    </Typography>
  </div>);
}

const fields = [
  {
    id: 'fullName',
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    options: false
  },
  {
    id: 'mobileNo',
    name: 'mobileNo',
    label: 'Mobile Number',
    type: 'number',
    options: false
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email Id',
    type: 'text',
    options: false
  },
  {
    id: 'jobType',
    name: 'jobType',
    label: 'Job Type',
    type: 'text',
    options: [
      {
        value: 'FT',
        label: 'FT',
      },
      {
        value: 'PT',
        label: 'PT',
      },
      {
        value: 'consultant',
        label: 'consultant',
      }
    ]
  },
  {
    id: 'dateOfBirth',
    name: 'dateOfBirth',
    label: 'Date Of Birth',
    type: 'text',
    options: false
  },
  {
    id: 'preferredLocation',
    name: 'preferredLocation',
    label: 'Preferred Location',
    type: 'text',
    options: [
      {
        value: 'Chennai',
        label: 'Chennai',
      },
      {
        value: 'Hyderabad',
        label: 'Hyderabad',
      },
      {
        value: 'Bangalore',
        label: 'Bangalore',
      }
    ]
  },
]