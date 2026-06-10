import { useState } from "react";
import api from ".../services/api";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
         e.preventDefault();
        
         try{

            const response = await api.post( "login/",{username,password,});

            localStorage.setItem("access",response.data.access);

            localStorage.setItem("refresh",response.data.refresh);

            alert ('Login Success');
         } catch (error) {
            console.log(error);
         }
        };


        return(
            <form onSubmit={handleLogin} >

                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>

                <input type="password"  placeholder="Password" onChange={(e) => setPassword(e.target.value)} />   

                <button type="submit">
                    Login
                </button>
             </form>

        );

}
export default Login;