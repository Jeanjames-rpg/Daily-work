import { Link, useNavigate } from "react-router-dom"
import CourseList from "./Courselist";
import styles from "../styles/Homepage.module.css"



function Home(){
    const navigate = useNavigate();
    return (
        
    <div className={styles.container}>
        <section className={styles.hero}>
            
        
            
                <h1 className={styles.title}>Welcome to course provider</h1>

                <p className={styles.subtitle}>Learn from experts</p>


                
        </section>    
                <h2 className={styles.sectiontitle}>OUR COURSES</h2>

                <CourseList/>
            
        


    </div>
    );
}

export default Home;