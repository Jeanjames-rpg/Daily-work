import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Header from "../componenets/Header";
import Main from "../componenets/Main";
import Footer from "../componenets/Footer";


function Dashboard (){
    const [user, setUser] = useState(null);

    useEffect(() => {
        api
        .get('me/')
        .then((res) => {
            setUser(res.data);
        });
    
    },[]);

    return (

        <div>

        <div>
            {user &&(
                <>
                    <h1>Welcome {user.username}</h1>
                    <h2>Role : {user.role}</h2>

                </>
            )}

            <div>
                <Link to='/courses'>See Available Courses</Link>
            </div>

            {user?.role === 'mentor' &&(
                <Link to='/create'>
                    <button>Create Course</button>
                </Link>
            )}

            {user?.role === 'mentor' &&(
                <Link to='/my-courses'>
                    <button>My courses</button>
                </Link>
            )}

            <div>
                <Link to='/'>Return to Home?</Link>
            </div>
            
        </div>

        </div>
    );
}

export default Dashboard;