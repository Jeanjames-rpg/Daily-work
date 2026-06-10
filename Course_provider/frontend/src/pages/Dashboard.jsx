import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";


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

        </div>
    );
}

export default Dashboard;