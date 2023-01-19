import React, { useMemo, useState } from 'react'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserWithEmailAndPassword } from '../../redux/slices/auth/thunks'

export const Register = () => {

  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state=> state.auth)


  const isCheckhingAuth = useMemo(()=> status === "checking", [status])

  const formData = { displayName: "", email: "", password: "" }

  const [formSubmitted, setFormSubmitted] = useState(false)

  const formValidations = {
    displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
    password: [(value) => value.length >= 6, "El password debe contenter al menos 6 caracteres"],
    email: [(value) => value.includes("@"), "El email debe incluir un @"],
  }

  const { input, handleInputChange, isdisplayNameValid, isEmailValid, isPasswordValid, isFormValid } = useForm(formData, formValidations)


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(registerUserWithEmailAndPassword(input.email, input.password, input.displayName))
  }

  // console.log(isdisplayNameValid);

  return (

    <AuthLayout title={"Register"}>
      <form onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      
      >

        <Grid
          container
        >
          <Grid item>
            <TextField
              xs={12}
              sx={{ mt: 2 }}
              label="Name"
              type={"text"}
              placeholder="Full Name"
              name='displayName'
              value={input.displayName}
              fullWidth
              onChange={handleInputChange}
              error={!!isdisplayNameValid && formSubmitted}
              helperText={isdisplayNameValid}
            />
          </Grid>

          <Grid item>
            <TextField
              xs={12}
              sx={{ mt: 2 }}
              label="Correo"
              type={"email"}
              placeholder="email@google.com"
              name='email'
              value={input.email}
              fullWidth
              onChange={handleInputChange}
              error={!!isEmailValid && formSubmitted}
              helperText={isEmailValid}
            />
          </Grid>

          <Grid item>
            <TextField
              xs={12}
              sx={{ mt: 2 }}
              label="Password"
              type={"password"}
              placeholder="password"
              name='password'
              value={input.value}
              fullWidth
              onChange={handleInputChange}
              error={!!isPasswordValid && formSubmitted}
              helperText={isPasswordValid}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
          <Grid item xs={12} sm={6} 
          display={!!errorMessage ? "": "none"}
          >
            <Alert 
            severity='error'
            >
              {errorMessage}
            </Alert>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant='contained' fullWidth type="submit" disabled={isCheckhingAuth} >
              Create Account
            </Button>
          </Grid>


        </Grid>

        <Grid container direction="row" justifyContent={"end"}>
          <Link component={RouterLink} color="inherit" to="/auth/login">
            <Typography>Have an account? Login here</Typography>
          </Link>
        </Grid>

      </form>


    </AuthLayout>
  )
}
