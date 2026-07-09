import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import styles from "../styles/Register_login.module.css"
import logo from "../assets/logo2.PNG"

function Register() {
    const[form, setForm] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        role:"student",
    });

    

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (form.password !== form.confirmpassword){
            alert("Password dont match!");
            return;
        }

        try {
            await api.post("register/", {
                username: form.username,
                email: form.email,
                password: form.password,
                role: form.role,
            });

            alert("Registered Successfully");


        } catch (err) {
            console.log(err)
            console.log("Status:", err.response.status);
            console.log("Errors:", err.response.data);
        }
    };

    return (
    <div className={styles.container}>

        <img src={logo} alt="Logo" className={styles.logo} />

        <form onSubmit={handleSubmit} className={styles.form}>

            <input className={styles.input} placeholder="username" onChange={(e) => setForm({...form,username: e.target.value,})}  />

            <input className={styles.input} placeholder="email" onChange={(e) => setForm({...form,email: e.target.value,})}  />

            <input className={styles.input} placeholder="password" onChange={(e) => setForm({...form,password: e.target.value,})} />

            <input className={styles.input} placeholder="confirm password"  onChange={(e)=> setForm({...form,confirmpassword: e.target.value,})} />

            <select 
                className={styles.select}
                onChange={(e) => setForm({...form,role: e.target.value,})}>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>

            </select>

            <button className={styles.button} type="submit">Register</button>

            <p className={styles.links}>
                Return to our Homepage? <Link to='/'>Home</Link>
            </p>

            <p className={styles.links}>
                Already have an account ?
                <Link to='/login' >Login</Link>
            </p>

        </form>
        

        
    </div>
    );

}

export default Register;