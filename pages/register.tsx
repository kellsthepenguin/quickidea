import { NextPage } from 'next'
import toast, { Toaster } from 'react-hot-toast'
import styles from '../styles/Login.module.css' // reuse css

const Register: NextPage = () => {
  function register() {
    const name = (document.getElementById('name') as HTMLInputElement).value
    const mail = (document.getElementById('mail') as HTMLInputElement).value
    const pw = (document.getElementById('pw') as HTMLInputElement).value

    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mail, pw })
    }).then((res) => res.json()).then(({ error }: { error?: string }) => {
      if (error) {
        toast.error(`Register failed. Reason: ${error}`)
      } else {
        toast.success('Success! Redirecting to login..')
        setTimeout(() => {
          location.href = '/login'
        }, 1000)
      }
    })
  }

  return (
    <div>
      <Toaster />
      <div className={styles.container}>
        <h1>Register</h1>
        <input placeholder='name' id='name' /> <br />
        <input placeholder='mail' type='email' id='mail' /> <br />
        <input placeholder='pw' type='password' id='pw' /> <br />
        <button onClick={register}>Register</button> <br />
        or <a href="/login" style={{
          color: '#1fcf81',
          fontWeight: 'bold'
        }}>Login</a>
      </div>
    </div>
  )
}

export default Register
