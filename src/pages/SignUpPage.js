import {Button} from 'components/button'
import {Field} from 'components/field'
import {IconEyeClose, IconEyeOpen} from 'components/icon'
import {Input} from 'components/input'
import {Label} from 'components/label'
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'

import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {toast} from 'react-toastify'

import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth, db} from 'firebase-app/firebase-app'
import {NavLink, Navigate, useNavigate} from 'react-router-dom'
import {addDoc, collection} from 'firebase/firestore'
import Authentication from './Authentication'
import InputPasswordToggle from 'components/input/InputPasswordToggle'

const schema = yup.object({
  fullname: yup.string().required('Enter your fullname'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Enter your email address'),
  password: yup
    .string()
    .min(8, 'Your password must be 8 character')
    .required('Enter your password'),
})

const SignUpPage = () => {
  const [togglePassword, setTogglePassword] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const arrErrors = Object.values(errors)
    const lengthArrErrors = Object.values(errors).length

    if (lengthArrErrors > 0) {
      toast.error(arrErrors[0]?.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      })
    }
  }, [errors])

  useEffect(() => {
    document.title = 'Sign up page'
  }, [])

  const handleSignUp = async (values) => {
    if (!isValid) return

    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user
        updateProfile(auth.currentUser, {
          displayName: values.fullname,
        })
        toast.success('Create success !!!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        })

        const colRef = collection(db, 'users')

        addDoc(colRef, {
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        })
        navigate('/sign-in')
      })
      .catch((error) => {
        const errorMessage = error.code

        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        })
      })
  }

  return (
    <Authentication>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
        className="form"
      >
        <Field className="field">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        <Field className="field">
          <Label htmlFor="account">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          />
        </Field>
        <Field className="field">
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Do you have an account ? <NavLink to={'/sign-in'}>Sign in</NavLink>{' '}
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] m-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign up
        </Button>
      </form>
    </Authentication>
  )
}

export default SignUpPage
