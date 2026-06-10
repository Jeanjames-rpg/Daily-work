import { useState } from "react";
import api from "../services/api";

function Register() {
    const[form, setForm] = useState({
        username:"",
        email:"",
        password:"",
        role:"student",
    });


    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try {
            await api.post("register/", form);

            alert("Registered Successfully");
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input  placeholder="username" onChange={(e) => setForm({...form,username: e.target.value,})}  />

            <input  placeholder="email" onChange={(e) => setForm({...form,email: e.target.value,})}  />

            <input  placeholder="password" onChange={(e) => setForm({...form,password: e.target.value,})} />

            <select onChange={(e) => setForm({...form,role: e.target.value,})}>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>

            </select>

            <button type="submit">Register</button>

        </form>
    );

}

export default Register;