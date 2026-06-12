import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import Main from "../componenets/Main";

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
            console.log("Status:", err.response.status);
            console.log("Errors:", err.response.data);
        }
    };

    return (
    <div>

        <Header/>

        <Main>
        <form onSubmit={handleSubmit}>

            <input  placeholder="username" onChange={(e) => setForm({...form,username: e.target.value,})}  />

            <input  placeholder="email" onChange={(e) => setForm({...form,email: e.target.value,})}  />

            <input  placeholder="password" onChange={(e) => setForm({...form,password: e.target.value,})} />

            <select onChange={(e) => setForm({...form,role: e.target.value,})}>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>

            </select>

            <button type="submit">Register</button>

            <p>
                Return to our Homepage? <Link to='/'>Home</Link>
            </p>

            <p>
                Already have an account ?
                <Link to='/login' >Login</Link>
            </p>

        </form>
        </Main>

        <Footer/>
    </div>
    );

}

export default Register;