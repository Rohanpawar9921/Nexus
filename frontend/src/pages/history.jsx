import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../styles/history.module.css';
import { IconButton } from '@mui/material';
export default function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [getHistoryOfUser])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();        return `${day}/${month}/${year}`

    }
    
    return (
        <div className={styles.historyContainer}>
            <div className={styles.header}>
                <h2>Meeting History</h2>
                <IconButton 
                    onClick={() => {
                        routeTo("/home")
                    }}
                    className={styles.homeButton}
                >
                    <HomeIcon />
                </IconButton>
            </div>

            <div className={styles.meetingList}>
                {
                    (meetings.length !== 0) ? meetings.map((e, i) => {
                        return (
                            <div key={i} className={styles.meetingCard}>
                                <div className={styles.meetingCode}>
                                    Code: {e.meetingCode}
                                </div>
                                <div className={styles.meetingDate}>
                                    Date: {formatDate(e.date)}
                                </div>
                                <button 
                                    className={styles.joinButton}
                                    onClick={() => routeTo(`/${e.meetingCode}`)}
                                >
                                    Join
                                </button>
                            </div>
                        )
                    }) : <div className={styles.emptyMessage}>No meeting history found</div>
                }
            </div>
        </div>
    )
}
