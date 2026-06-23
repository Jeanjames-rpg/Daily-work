import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css"

function MentorDashboard(){
    const[user ,setUser] = useState(null);

    useEffect(()=>{
        api
        .get('me/')
        .then((res)=>{
            setUser(res.data);
        });
    },[]);

    return(

        <div className={styles.container}>
             <div className={styles.card}>
                {user&&(
                    <h1 className={styles.title}>Welcome {user.username}</h1>
                )}
                <Link to="/my-courses">
                <button className={styles.button}>My Courses</button>
                </Link>

                <Link to="/create">
                <button className={styles.button}>Create Course</button>
                </Link>
            
            </div>   
        </div>

    );
}
export default MentorDashboard;