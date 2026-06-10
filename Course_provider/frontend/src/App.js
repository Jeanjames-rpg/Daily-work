
import './App.css';
import Createcourse from './pages/Coursecreation';
import CourseList from './pages/Courselist';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Mycourses from './pages/Mycourses';
import Register from './pages/Register';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

// function App() {
//   return (
//     <div>
//       <Register/>
//       <Login/>
      
//     </div>
    
//   );

 
// }

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/courses' element={<CourseList/>}/>
        <Route path='/create' element={<Createcourse/>} />
        <Route path='/my-courses' element={<Mycourses/>} />

      </Routes>
    
    </BrowserRouter>
  );


}

export default App;
