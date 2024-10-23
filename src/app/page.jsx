'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import namelogo from '../../public/images/namelogo.png';
import logo from '../../public/images/logo.png';

export default function Home() {
  const [email, setEmail] = useState('');
  const [placeholder, setPlaceholder] = useState('Please enter your email address');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  async function Submit(e) {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Success: Email submitted");
        setSubmitStatus('success');
        setEmail('');
      } else {
        throw new Error('Failed to submit email');
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.landingPage}>
        <div className={styles.headerContainer}>
          <header className={styles.header}>
            <div className={styles.logoContainer}>
              <Image
                src={namelogo}
                alt="BlackPrint"
                width={190}
                height={40}
                priority
              />
            </div>
            <div className={styles.contactContainer}>
              <a href="mailto:gilberto@blackprint.ai" className={styles.contactButton}>
                Contact
              </a>
            </div>
          </header>
        </div>

        <main className={styles.mainContent}>
          <div className={styles.logoBox}>
            <Image
              src={logo}
              alt="BlackPrint Logo"
              className={styles.logoMain}
              width={200}
              height={200}
              priority
            />
            <h1 className={styles.comingSoon}>COMING SOON</h1>
          </div>

          <div className={styles.descriptionBox}>
            <p className={styles.description}>
              Acquisition Intelligence Platform for CRE in Latam
            </p>
            <p className={styles.subDescription}>
              Discover optimal locations faster with BlackPrint&apos;s data-driven,
              acquisition intelligence platform
            </p>
          </div>

          <div className={styles.formBox}>
            <p className={styles.notifyText}>Get notified when the site goes live:</p>
            <form onSubmit={Submit} className={styles.notifyForm}>
              <input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setPlaceholder('')}
                onBlur={() => setPlaceholder('Please enter your email address')}
                required
                className={styles.emailInput}
                disabled={isSubmitting}
              />
              <button type="submit" className={styles.notifyButton} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Notify Me'}
              </button>
            </form>
            {submitStatus === 'success' && <p className={styles.successMessage}>Thank you for subscribing!</p>}
            {submitStatus === 'error' && <p className={styles.errorMessage}>An error occurred. Please try again.</p>}
          </div>
        </main>
      </div>
    </div>
  );
}