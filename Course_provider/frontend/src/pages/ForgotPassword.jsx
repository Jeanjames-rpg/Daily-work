import { useState } from "react";
import api from "../services/api";


function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "password-reset/",
                {email}
            );

            setMessage(response.data.message);
        } catch (error) {
            console.log(error);

            setMessage(
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div>

            <div>

                <h1 className="text-2xl font-bold text-center mb-3">
                    Forgot Password?
                </h1>

                <p className="text-gray-600 text-center mb-6">
                    Enter your email address an we'll send you a password reset link.
                </p>


                <form onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input 
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Send Reset Link
                    </button>

                </form>

                {message && (
                    <p className="mt-5 text-center text-green-600">
                        {message}
                    </p>
                )}
            </div>

        </div>
    );
}

export default ForgotPassword;