
import './App.css';
import Footer from './componenets/Footer';
import Header from './componenets/Header';
import Main from './componenets/Main';
import AddChapter from './pages/Addchapter';
import Createcourse from './pages/Coursecreation';
import CourseDetail from './pages/CourseDetail';
import CourseList from './pages/Courselist';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Mycourses from './pages/Mycourses';
import MyEnrollments from './pages/MyEnrollments';
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

    <Header/>

    <Main>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/courses' element={<CourseList/>}/>
        <Route path='/create' element={<Createcourse/>} />
        <Route path='/my-courses' element={<Mycourses/>} />
        <Route path='/courses/:id' element={<CourseDetail/>}/>
        <Route path='/courses/:id/add-chapter'  element={<AddChapter/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
      </Routes>
    </Main>
    
    <Footer/>
    </BrowserRouter>
  );


}

export default App;
