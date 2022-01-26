import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { checkJWT } from '../utils'

import styles from '../styles/AddIdea.module.css'

async function addIdea(token: string, name: string, description: string) {
  const res = await fetch(`/api/ideas?token=${token}`, {
    method: 'POST',
    body: JSON.stringify({ name, description })
  })

  return await res.json()
}

const AddIdea: NextPage = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      location.href = '/login'
      return
    }
    
    checkJWT(token).then(isJWTValid => {
      if (isJWTValid) {
        setToken(token)
      } else {
        localStorage.removeItem('token')
        location.href = '/login'
      }
    })
  })

  return (
    <div className={styles.container}>
      name: <input placeholder='name of idea' id='name' />
      <br />
      description: <br />
      <textarea className={styles.description} id='description'/> <br />
      <button onClick={() => {
        const name = (document.getElementById('name') as HTMLInputElement).value
        const description = (document.getElementById('description') as HTMLTextAreaElement).value

        addIdea(token, name, description).then(() => {
          location.href = '/ideas'
        })
      }}>Submit!</button>
    </div>
  )
}

export default AddIdea
