import * as React from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={`${styles['footer']} container`}>
      <ul className={`${styles['footer__nav']} list-reset`}>
        <li className={styles['footer__nav-item']}>
          <a className={styles['footer__nav-item--link']}>
          </a>
        </li>
        <li className={styles['footer__nav-item']}>
          <a className={styles['footer__nav-item--link']}>
          </a>
        </li>
        <li className={styles['footer__nav-item']}>
          <a className={styles['footer__nav-item--link']}>
          </a>
        </li>
        <li className={styles['footer__nav-item']}>
          <a className={styles['footer__nav-item--link']}>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
