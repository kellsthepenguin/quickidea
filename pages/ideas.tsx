import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import useSWR from 'swr'

import Idea from '../components/Idea'
import IdeaType from '../types/Idea'
import { checkJWT } from '../utils'

import styles from '../styles/Ideas.module.css'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function useIdeas(token: string) {
  const { data, error } = useSWR(`/api/ideas?token=${token}`, fetcher)

  return {
    ideas: data,
    isLoading: !error && !data,
    isError: error
  }
}

const Ideas: NextPage = () => {
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

  const { ideas, isLoading, isError } = useIdeas(token)

  if (isLoading) return <div>Loading...</div>
  if (isError || ideas.error) return <div>An error occurred. please try again later.</div>

  const ideaComponents: JSX.Element[] = []

  ideas.forEach((idea: IdeaType, i: number) => {
    ideaComponents.push(
      <Idea
        name={idea.name}
        description={idea.description}
        date={new Date(Date.parse(idea.date))}
        key={i}
      />
    )
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
        {ideaComponents}
      </div>
    </div>
  )
}

export default Ideas
