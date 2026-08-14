import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api"


function ResetPassword() {
    const {user_id, token} = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmpassword) {
            setMessage("Password do not match");
            return;
        }

        try {

            await api.post(
                "password-reset-confirm/",
                {
                    user_id,
                    token,
                    password
                }
            );

            setMessage("Password reset successful. Redirecting...");

            setTimeout(()=>{
                navigate("/login");
            }, 2000);
        } catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Invalid or expired reset link."
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Reset Password
                </h1>

                <form onSubmit={handleSubmit}>

                    <input 
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
                    />

                    <input 
                        type="password"
                        placeholder="Confirm password"
                        value={confirmpassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
                    />

                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Reset Password
                    </button>

                </form>

                {message &&(
                    <p className="mt-5 text-center text-gray-600">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default ResetPassword;