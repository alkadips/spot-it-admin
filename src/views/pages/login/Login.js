import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ClipLoader from 'react-spinners/ClipLoader'
import axios from 'axios'
import swal from 'sweetalert'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser } from '@coreui/icons'
const Login = () => {
  const { signToken } = useParams()
  const checkToken = async () => {
    if (signToken) {
      try {
        let res = await axios.put(`${'http://localhost:5000'}/api/user/signin/${signToken}`)
        if (res.data.status === 'ok') {
          swal('Success', 'Account Activated Successfully, Login to continue', 'success')
        }
      } catch (err) {
        console.log(signToken)
        return swal('Error', `${err.response.data.message}`, 'error')
      }
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  })

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  )
  const validPasswordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/)

  const [loading, setLoading] = useState(false)
  // const { token } = isAutheticated()
  const [next, setNext] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [show, setShow] = useState(false)
  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    })
  }
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const validateForm = () => {
    let valid = true
    Object.values(errors).forEach((val) => {
      if (val.length > 0) {
        valid = false
        return false
      }
    })
    Object.values(user).forEach((val) => {
      if (val.length <= 0) {
        valid = false
        return false
      }
    })
    return valid
  }

  //cheking email and password
  useEffect(() => {
    if (validateForm()) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [errors])
  const handleNext = () => {
    if (next === false) {
      setNext(true)
    } else {
      setNext(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          emailError: validEmailRegex.test(value) ? '' : 'Email is not valid!',
        })

        break
      case 'password':
        setErrors((errors) => ({
          ...errors,
          passwordError: validPasswordRegex.test(value)
            ? ''
            : 'Password Shoud Be 8 Characters Long, Atleast One Uppercase, Atleast One Lowercase, Atleast One Digit, Atleast One Special Character',
        }))
        break
      default:
        break
    }

    setUser({ ...user, [name]: value })
  }
  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user.email || !user.password) {
      return swal('Error!', 'All fields are required', 'error')
    }
    setLoading(true)
    let response = await axios.post(`${'https://api-spotit.herokuapp.com'}/admin-signin`,
   { ...user })
    if (response.data.status === 'ok') {
      setLoading(false)
      console.log("response signin",response)
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: user.email,
          token: response.data.token,
        }),
      )

      navigate('/dashboard')
      setTimeout(window.location.reload(), 8000)
    } else {
      setLoading(false)
      let message = response.data.message
      swal({
        title: 'Error',
        text: message,
        icon: 'error',
        buttons: true,
        dangerMode: true,
      })
    }
  }

  const ForgotMail = async () => {
    let res = await axios.put(`${'https://api-spotit.herokuapp.com'}/forgotPassword`, { email: user.email })
    console.log(res)
    if (res.data.status === 'ok') {
      let message = res.data.message
      swal({
        title: 'Success',
        text: message,
        icon: 'success',
        buttons: true,
      }).then(() => {
        window.location.reload()
      })
    } else {
      swal('Oops!', 'Something went wrong!', 'error')
      handleClose()
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Username"
                        name="email"
                      />
                    </CInputGroup>
                    <p className="text-center py-2 text-danger">{errors.emailError}</p>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                          type={user.showPassword ? 'text' : 'password'}
                            value={user.password}
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                      />
                    </CInputGroup>
                    {errors.passwordError && (
                      <p className="text-center py-2 text-danger">{errors.passwordError}</p>
                    )}
                       <Modal show={show} onHide={handleClose} className="p-4">
                    <Modal.Header closeButton>
                        <Modal.Title>Password Reset Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Forgot your password? Don't worry, click 'Confirm' to reset your password</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancle
                        </Button>
                        <Button variant="primary" onClick={ForgotMail}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          disabled={!validForm}
                          onClick={handleSubmit}
                          color="primary"
                          className="px-4"
                        >
                          <ClipLoader color="white" loading={loading} size={20} />
                          {!loading && 'LogIn'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton onClick={() => handleShow()} color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
