import React, { useContext, useEffect, useState } from 'react';
import style from '../styles/LoginPage.module.css';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const {login} =useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    tnc: false
  })
  const [error, setError] = useState({
    name: false,
    username: false,
    email: false,
    mobile: false,
    tnc: false
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError({ ...error, [e.target.name]: false })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError((error) => { return { ...error, name: false, username: false, email: false, mobile: false, tnc: false } })
    let error = false;
    if (formData.name.trim().length === 0) {
      setError((error) => { return { ...error, name: true } })
      error = true
    }
    if (formData.username.trim().length === 0) {
      setError((error) => { return { ...error, username: true } })
      error = true
    }
    if (formData.email.trim().length === 0) {
      setError((error) => { return { ...error, email: true } })
      error = true
    }
    if (formData.mobile.trim().length === 0) {
      setError((error) => { return { ...error, mobile: true } })
      error = true
    }
    if (formData.tnc == false) {
      setError((error) => { return { ...error, tnc: true } })
      error = true
    }
    if (error == false) {
      login(formData)
      setFormData({ name: "", username: "", email: "", mobile: "", tnc: false })
      navigate('/home')
    } else {
      return
    }

  }
  useEffect(()=>{
    localStorage.setItem('info-user',JSON.stringify(formData))
  })

  return (
    <div className={style.mainContainer}>
      <div className={style.imageContainer}>
        <div className={style.imageText}>Discover new things on Superapp</div>
      </div>
      <div className={style.formContainer}>
        <div className={style.displayForm}>
          <div className={style.headings}>
            <h1>Super app</h1>
            <h3>Create your new account</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`${style.inputField} ${error.name ? style.inputFieldError : ''}`}
            />
            {error.name && <p className={style.errorText}>Field is required</p>}

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`${style.inputField} ${error.username ? style.inputFieldError : ''}`}
            />
            {error.username && <p className={style.errorText}>Field is required</p>}

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`${style.inputField} ${error.email ? style.inputFieldError : ''}`}
            />
            {error.email && <p className={style.errorText}>Field is required</p>}

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className={`${style.inputField} ${error.mobile ? style.inputFieldError : ''}`}
            />
            {error.mobile && <p className={style.errorText}>Field is required</p>}

            <label className={style.checkBox}>
              <input
                type="checkbox"
                checked={formData.tnc} onChange={() => {
                  setFormData({ ...formData, tnc: !formData.tnc })
                  setError({ ...error, tnc: false })
                }}
              />
              <span>Share my registration data with Superapp</span>
            </label>
            {error.tnc && <p className={style.errorText}>Check this box if you want to proceed</p>}

            <button type="submit">SIGN UP</button>
          </form>

          <div className={style.displayInfo}>
            <p>By clicking on Sign up, you agree to Superapp <span>Terms and Conditions of Use</span>.</p>
            <p>
              To learn more about how Superapp collects, uses, shares, and protects your personal data,
              please head to Superapp <span>Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
