import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/Idea.module.css'

interface IdeaProps {
  name: string,
  description: string,
  date: Date
}

function Idea({ name, description, date }: IdeaProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{name}</p> <br />
      <p className={styles.description}>{description}</p> <br />
      <p className={styles.date}>
        <FontAwesomeIcon icon={faHistory}/> {date.toLocaleDateString()}
      </p>
    </div>
  )
}

export default Idea
