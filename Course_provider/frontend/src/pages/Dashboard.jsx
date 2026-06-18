import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css"


function Dashboard (){
    const [user, setUser] = useState(null);

    useEffect(() => {
        api
        .get('me/')
        .then((res) => {
            setUser(res.data);
        });
    
    },[]);

    return (

        <div className={styles.container}>

        <div className={styles.card}>
            {user &&(
                <>
                    <h1 className={styles.title}>Welcome {user.username}</h1>
                    <h2 className={styles.role}>Role : {user.role}</h2>

                </>
            )}

            <div className={styles.links}>
                <Link to='/courses'>See Available Courses</Link>
            </div>

            {user?.role === 'mentor' &&(
                <Link to='/create'>
                    <button className={styles.button} >Create Course</button>
                </Link>
            )}

            {user?.role === 'mentor' &&(
                <Link to='/my-courses'>
                    <button className={styles.button} >My courses</button>
                </Link>
            )}

            <div>
                <Link className={styles.links} to='/'>Return to Home?</Link>
            </div>
            
        </div>

        </div>
    );
}

export default Dashboard;