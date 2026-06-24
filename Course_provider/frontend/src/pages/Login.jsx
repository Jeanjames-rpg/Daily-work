import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../styles/Register_login.module.css"
import logo from "../assets/logo2.PNG"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
         e.preventDefault();
        
         try{

            const response = await api.post( "login/",{username,password,});

            localStorage.setItem("access",response.data.access);

            localStorage.setItem("refresh",response.data.refresh);

            alert ('Login Success');

            const user = await api.get("me/")
            console.log(user.data);

            if (user.data.role === 'mentor'){
                navigate("/dashboard");
            }
            else{
                navigate("/dashboard");
            }


         } catch (error) {
            console.log(error);
         }
        };


        return(
         <div className={styles.container}>
            <img src={logo} alt="Logo" className={styles.logo} />
            
            <form onSubmit={handleLogin} className={styles.form} >

                <input placeholder="Username" className={styles.input} onChange={(e) => setUsername(e.target.value)}/>

                <input type="password"  placeholder="Password" className={styles.input} onChange={(e) => setPassword(e.target.value)} />   

                <button  className={styles.button} type="submit">
                    Login
                </button>

                <p className={styles.links}>
                    Return to our Homepage <Link to= "/">Home</Link>
                </p>

                <p className={styles.links}>
                    Dont have an account?
                    <Link to='/register'>Register</Link>
                </p>

             </form>
             
             

         </div>
        );

}
export default Login;