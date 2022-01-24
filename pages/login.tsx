import { NextPage } from 'next'
import toast, { Toaster } from 'react-hot-toast'

import styles from '../styles/Login.module.css'

const Login: NextPage = () => {
  function login() {
    const mail = (document.getElementById('mail') as HTMLInputElement).value
    const pw = (document.getElementById('pw') as HTMLInputElement).value

    fetch('/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, pw })
    }).then((res) => res.json()).then(({ token, error }: {
      token?: string,
      error?: string
    }) => {
      console.log(error)
      if (error) {
        toast.error('Login Failed. please check your mail or password.')
      } else {
        toast.success('Success!')
        localStorage.setItem('token', token!)
        location.href = '/ideas'
      }
    })
  }

  return (
    <div>
      <Toaster />
      <div className={styles.container}>
        <h1>Login</h1>
        <input placeholder='mail' type='email' id='mail' /> <br />
        <input placeholder='pw' type='password' id='pw' /> <br />
        <button onClick={login}>Login</button> <br />
        or <a href="/register" style={{
          color: '#1fcf81',
          fontWeight: 'bold'
        }}>Register</a>
      </div>
    </div>
  )
}

export default Login
