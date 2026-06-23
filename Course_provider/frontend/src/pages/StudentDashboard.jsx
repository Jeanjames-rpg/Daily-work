import { useEffect, useState } from "react"
import api from "../services/api";
import styles from "../styles/Dashboard.module.css"
import { Link } from "react-router-dom";

function StudentDashboard(){

    const [user ,setUser] = useState(null);

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

                    <h1>Welcome {user.username}</h1>
                )}

                <Link to='/courses'>
                    <button className={styles.button}>Browse Course</button>
                </Link>

                <Link>
                    <button className={styles.button}>My Enrollments</button>
                </Link>

            </div>

        </div>

    );

}
export default StudentDashboard;