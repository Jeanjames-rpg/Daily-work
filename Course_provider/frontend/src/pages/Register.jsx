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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 ">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
         <div className="flex justify-center mb-6">
             <img src={logo} alt="Logo" className="h-32 w-32 object-contain mx-auto mb-6" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

            <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="username" onChange={(e) => setForm({...form,username: e.target.value,})}  />

            <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="email" onChange={(e) => setForm({...form,email: e.target.value,})}  />

            <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="password" onChange={(e) => setForm({...form,password: e.target.value,})} />

            <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="confirm password"  onChange={(e)=> setForm({...form,confirmpassword: e.target.value,})} />

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
        
    </div>
    );

}

export default Register;