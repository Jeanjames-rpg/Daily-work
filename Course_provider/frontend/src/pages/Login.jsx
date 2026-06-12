import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import Main from "../componenets/Main";


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
         <div>
            
            <Header/>

            <Main>
            <form onSubmit={handleLogin} >

                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>

                <input type="password"  placeholder="Password" onChange={(e) => setPassword(e.target.value)} />   

                <button type="submit">
                    Login
                </button>

                <p>
                    Return to our Homepage <Link to= "/">Home</Link>
                </p>

                <p>
                    Dont have an account?
                    <Link to='/register'>Register</Link>
                </p>

             </form>
             
             </Main>

             <Footer/>
         </div>
        );

}
export default Login;