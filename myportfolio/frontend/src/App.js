import './App.css';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { ReactTyped } from "react-typed"
import{
  FaReact,
  FaPython,
  FaDatabase,
  FaWhatsapp,
  FaEnvelope,
  FaCss3Alt,
  FaHtml5,

} from "react-icons/fa";
import {motion} from "framer-motion";


function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/project/")
    .then((response) => {
      setProjects(response.data);
    });
  },  []);

  return (
    // <div>
    //   <h1>MY PORTFOLIO</h1>

    //   {projects.map((item) => (
    //     <div key={item.id}>
    //       <h2>{item.title}</h2>
    //       <p>{item.description}</p>
    //       <p>{item.technologies}</p>
          
    //     </div>
    //   ))}
    // </div>

    <div>
    {/* Navbar */}
    <nav className='navbar'>

      <h2>Jean James</h2>

      <ul>
        <li><a href='#hero'>Home</a></li>
        <li><a href='#about'>About</a></li>
        <li><a href='#education'>Education</a></li>
        <li><a href='#skill'>Skills</a></li>
        <li><a href='#projects'>Projects</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>

    </nav>

    {/* Hero Section */}
    {/* <section id='hero' className='hero'> */}
    <motion.section
    className='hero'
    id='hero'
    initial={{opacity:0,y:100}}
    animate={{opacity:1,y:0}}
    transition={{duration:1}}
    >
      <h1>Hi, Im Jean James</h1>

      {/* <p>Python Full Stack Developer</p> */}

      <ReactTyped
      style={{marginBottom:"8px"}}
      strings={[
        "Full Stack Developer",
        "React Developer",
        "Django Backend Developer"
      ]}
      typeSpeed={60}
      backSpeed={40}
      loop
      
      />

    <a href='/Jean_James_Resume_Updated_v3.pdf'>
      <button>Download Resume</button>
    </a>
    </motion.section>
    {/* </section> */}


<p className='subtitle'>
  Building modern full Stack web applications
  </p>



    {/* About */}
    <section id='about' className='about'>
      <h1>About Me</h1>

      <p>
        I am a dedicated and motivated BSc Information Technology graduate with a strong passion for software development and technology. I enjoy building efficient, user-focused solutions and continuously improving my skills in programming, database management, and problem-solving.

As an aspiring software developer, I am eager to contribute to innovative projects while learning and growing in a professional environment. I am a quick learner, adaptable, and committed to delivering quality work through teamwork and continuous improvement.

I am currently seeking opportunities to apply my technical knowledge and develop impactful software solutions that create real-world value.
      </p>
    </section>


    {/* education */}
    <section className='education' id='education'>
      <h1>Education</h1>
      <div className='edudetails'>
        <p>BSc Information Technology (Passed – Waiting for Results)
Siena College of Professional Studies, Kerala | Expected 2026</p> 
        <p>Higher Secondary (12th)
Santa Maria Senior Secondary School (CBSE) | 2022 | 65.8%</p>  
        <p>SSLC (10th)
Santa Maria Senior Secondary School (CBSE) | 2020 | 68.6%</p>
      </div>

    </section>


    {/* Skills */}
    <section id='skill' className='skills'>
      <h1>Skills</h1>

      <div className='skill-box'>

        <div className='skill-card'>
          <FaReact className='icon react' />
          <h2>React</h2>
          <p>Built responsive frontend interfaces and connected APIs using Axios</p>
        </div>

        <div className='skill-card'>
          <FaPython className='icon python'/>
          <h2>Django</h2>
          <p> Developed REST APIs and backend logic for full stack applications</p>
        </div>

        <div className='skill-card'>
          <FaDatabase className='icon db'/>
          <h2>PostgresSql</h2>
          <p>   Managed relational databases and integrated them with Django ORM</p>
        </div>

        <div className='skill-card'>
          <FaDatabase className='icon db'/>
          <h2>Mysql</h2>
          <p>Handled database design, queries, and backend integration</p>
        </div>

        <div className='skill-card'>
          <FaCss3Alt className='icon css'/>
          <h2>CSS</h2>
          <p>Designed responsive layouts with modern animations and effects</p>
        </div>

        <div className='skill-card'>
          <FaHtml5 className='icon js'/>
          <h2>JavaScript</h2>
          <p>Implemented dynamic frontend interactions and API handling</p>
        </div>

        <div className='skill-card'>
          <FaPython className='icon python'/>
          <h2>Flask</h2>
          <p>Built lightweight backend applications and REST APIs using Flask</p>
        </div>
        
        <div className='skill-card'>
          <FaPython className='icon python'/>
          <h2>Python</h2>
          <p>Built backend applications, automation scripts, and REST APIs</p>
        </div>

      </div>
    </section>

    {/* Projects */}
    <section id='projects' className='projects'>
      <h1>Projects</h1>
      <div className='projects-grid'>

      {projects.map((item) => (
       <div className='card' key={item.id}>
        <h2>{item.title}</h2>

        <p>{item.description}</p>

        <p>{item.technologies}</p>
       </div> 

      ))}

      </div>
    </section>

    {/* Contact */}
    <section id='contact' className='contact'>
      <h1>Contact</h1>

      <p><FaEnvelope/>Email: jean@gmail.com</p>
      <p><FaWhatsapp/>whatsapp: 7306503326</p>

    </section>

    {/* Footer */}
    <footer>
      <p>© 2026 Jean Portfolio</p>
    </footer>

    </div>
  );

 
}

export default App;
