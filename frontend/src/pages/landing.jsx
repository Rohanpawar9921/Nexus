import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/landing.module.css'
export default function LandingPage() {


    const router = useNavigate();    return (
        <div className={styles.landingPageContainer}>
            <nav className={styles.landingNav}>
                <div className={styles.navHeader}>
                    <h2>Nexus</h2>
                </div>
                <div className={styles.navList}>
                    <div 
                        className={styles.navItem}
                        onClick={() => router("/aljk23")}
                    >
                        Join as Guest
                    </div>
                    <div 
                        className={styles.navItem}
                        onClick={() => router("/auth")}
                    >
                        Register
                    </div>
                    <div 
                        className={styles.navButton}
                        onClick={() => router("/auth")}
                    >
                        Login
                    </div>
                </div>
            </nav>

            <div className={styles.mainContainer}>
                <div className={styles.heroContent}>
                    <h1><span>Connect</span> with your loved Ones</h1>
                    <p>Cover a distance by Nexus - connect with high-quality video calls, anywhere, anytime.</p>
                    <Link to={"/auth"} className={styles.getStartedButton}>
                        Get Started
                    </Link>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.imageBg}></div>
                    <img src="/mobile.png" alt="Nexus video calling app" />
                </div>
            </div>
        </div>
    )
}
