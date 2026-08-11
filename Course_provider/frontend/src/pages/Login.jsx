import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../assets/logo2.PNG"
import AlertComponent from "../componenets/AlertComponent";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState({
        show: false,
        type: "info",
        message: "",
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
         e.preventDefault();
        
         try{

            const response = await api.post( "login/",{username,password,});

            // localStorage.setItem("access",response.data.access);

            // localStorage.setItem("refresh",response.data.refresh);

            // alert ('Login Success');

            // <AlertComponent type="success" message="Login succesfull"/>

            setAlert({
                show: true,
                type: "success",
                message: "Login successfull",
            });

            // window.location.href = "/dashboard";

            // const user = await api.get("me/")
            // console.log(user.data);

            // localStorage.setItem(
            //     "user",JSON.stringify(user.data)
            // );


            // window.location.href = '/dashboard';

            setTimeout(() => {
                navigate("/dashboard");
            },1000);

            // if (user.data.role === 'mentor'){
            //     navigate("/dashboard");
            // }
            // else{
            //     navigate("/dashboard");
            // }


         } catch (error) {

            if (error.response?.status === 401){
                setAlert({
                    show: true,
                    type: "error",
                    message: "Invalid username or password",
                });
            } else {
                setAlert({
                    show: true,
                    type: "error",
                    message: "something went wrong",
                });
            }

            console.log(error);
         }
        };


        return(
         <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">


            {alert.show && (
                <AlertComponent
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({...alert,show: false,})}
                />
            )}


            <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-32 w-32 object-contain mx-auto mb-6" />
            </div>
            <form onSubmit={handleLogin} className="space-y-5" >

                <input value={username} placeholder="Username" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setUsername(e.target.value)} required/>

                <input value={password} type="password"  placeholder="Password" className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500' onChange={(e) => setPassword(e.target.value)} required />   

                <button  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold" type="submit">
                    Login
                </button>

             </form>
             
            <div className="mt-6 text-center space-y-2">
             <p className='text-gray-600'>
                    Return to our {' '} <Link to= "/" className="text-indigo-600 hover:underline font-medium">Homepage</Link>
                </p>

                <p className="text-gray-600">
                    Dont have an account?{' '}
                    <Link to='/register' className="text-indigo-600 hover:underline font-medium">Register</Link>
                </p>
            </div> 
            
            </div>   
         </div>
        );

}
export default Login;