import React, { useMemo } from 'react'
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material"
import { Google } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { googleSignIn, loginUserWithEmail } from '../../redux/slices/auth/thunks'


const formData = { email: "", password: "" }

export const Login = () => {


  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const { input, handleInputChange } = useForm(formData)

  const isAuthenticating = useMemo(() => status === "checking", [status])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUserWithEmail(input.email, input.password))
  }

  const handleGoogle = (e) => {
    dispatch(googleSignIn())
  }

  return (

    <AuthLayout title={"Login"}>

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
              label="Correo"
              type={"email"}
              placeholder="email@google.com"
              fullWidth
              name='email'
              value={input.email}
              onChange={handleInputChange}

            />
          </Grid>

          <Grid item>
            <TextField
              xs={12}
              sx={{ mt: 2 }}
              label="Password"
              type={"password"}
              placeholder="password"
              fullWidth
              name='password'
              value={input.password}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >

          <Grid item xs={12} sm={6}
            display={!!errorMessage ? "" : "none"}
          >
            <Alert
              severity='error'
            >
              {errorMessage}
            </Alert>
          </Grid>


          <Grid item xs={12} sm={6}>
            <Button
              disabled={isAuthenticating} type="submit" variant='contained' fullWidth >
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              disabled={isAuthenticating} variant='contained' fullWidth onClick={handleGoogle} >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent={"end"}>
          <Link component={RouterLink} color="inherit" to="/auth/register">
            Create Account
          </Link>
        </Grid>

      </form>


    </AuthLayout>
  )
}
