import { Link, useNavigate } from "react-router-dom"



function Home(){
    const navigate = useNavigate();
    return (
        
    <div>
        <h1>Well to our course provider page</h1>

        <p>Our courses</p>

        <div>

        <button type="button" onClick={() => navigate("/register")}>Register</button>

        </div>
        <div> 

        <button type="button" onClick={() => navigate("/login")}>Login</button>
        
        </div>
        
        <Link to='/courses'>  <button>Available Courses</button> </Link>

        <Link to='/create'>Create a Course?</Link>

        <Link to='/my-courses'>Mentor mycourses</Link>


    </div>
    )
}

export default Home;