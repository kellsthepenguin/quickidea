import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import '@fortawesome/fontawesome-svg-core/styles.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.login}>
        <a href="/login">Login</a>
      </div>

      <div className={styles.introduce}>
        <p>
          당신의 참신한 <p className={styles.accent_blue}>아이디어</p>.
          <br />
          까먹지 않게,
          <br />
          <p className={styles.accent_green}>빠르게</p> 등록하세요.
        </p>
        <br />
        <a className={styles.get_started} href="/login">
          시작하기&nbsp;
          <FontAwesomeIcon icon={faChevronRight} />
        </a>
      </div>
    </div>
  )
}

export default Home
