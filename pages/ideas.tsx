import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import Idea from '../components/Idea'

import styles from '../styles/Ideas.module.css'

const Ideas: NextPage = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      location.href = '/login'
    } else {
      fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      }).then((res) => res.json()).then(({ valid }) => {
        if (valid) {
          setToken(token)
        } else {
          localStorage.removeItem('token')
          location.href = '/login'
        }
      })
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ideas</h1>
        <a className={styles.addButton}>
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div>  
      <div className={styles.ideas}>
        <Idea name='샌즈' description='아시는구나' date={new Date(Date.now())}/>
        <Idea name='샌즈' description='아시는구나' date={new Date(Date.now())}/>
        <Idea name='샌즈' description='아시는구나' date={new Date(Date.now())}/>
      </div>
    </div>
  )
}

export default Ideas
