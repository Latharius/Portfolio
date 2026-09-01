import React, { useState, useEffect } from "react";
import './App.css';

// Define the possible states for active text boxes
type ActiveBox = "about" | "experience" | "projects" | null;

const App: React.FC = () => {
  // State to track which text box is active
  const [activeBox, setActiveBox] = useState<ActiveBox>(null);

  // Function to handle button clicks and toggle the respective text box
  const handleClick = (box: ActiveBox) => {
    setActiveBox(activeBox === box ? null : box); // Toggle logic
  };

  useEffect (() => {
    document.title = "Leith Rabah | Portfolio";
  }, []); // Set the document title when the component mounts
  
  return (
    <div className="container">
      <h1 className="header">
        <span className="typewriter">Hello There! I'm Leith Rabah!</span>
      </h1>

      <div className="buttons_card">
        <button className="button button_animate" onClick={() => handleClick("about")}>About Me</button>
        <button className="button button_animate" onClick={() => handleClick("experience")}>My Experience</button>
        <button className="button button_animate" onClick={() => handleClick("projects")}>Personal Projects</button>
        <a href="/LeithResume.docx" target="_blank" rel="noopener noreferrer" download>
          <button className="button button_animate">Download Resume</button>
        </a>
      </div>

      <div className={`text_box_wrapper ${activeBox ? "open" : "closed"}`}>
        {activeBox === "about" && (
          <div className="text_box">
            <p>I'm a Software Engineer with hands-on experience building and maintaining mission-critical systems, currently supporting Launch Control 
            Center operations at NASA on the Kennedy Space Center campus. My work centers on automated testing (Python, Behave/Cucumber, BDD), 
            infrastructure automation (Ansible, AWX), and root-cause analysis for high-stakes aerospace environments where reliability and precision 
            aren't optional.</p>
            <p>Before that, I spent nearly two years at LocusUSA building cross-platform applications with React and Flutter, designing REST APIs, and 
              engineering a real-time digital spectrum analyzer that boosted system performance by roughly 50%. That role sharpened my ability to move 
              fluidly between front-end product work, backend integration, and embedded systems, often bridging the gap between hardware constraints 
              and user-facing software.</p>
            <p>I hold a B.S. in Computer Engineering from the University of Central Florida, and I bring a full-stack mindset shaped by both 
              consumer-facing product development and rigorous, systems-level engineering. I'm comfortable across the Python/JavaScript/TypeScript 
              ecosystem, DevOps tooling (Git, Docker, Ansible, Linux), and databases (MySQL, MongoDB), and I thrive in environments where I need to 
              diagnose problems quickly, automate repetitive work, and collaborate closely with cross-functional teams.</p>
              <p>I'm drawn to roles where software reliability actually matters. Where the code I write supports real operations, real people, or real missions.</p>
            <p>
              You can reach me on <a href="https://www.linkedin.com/in/leith-rabah-29a931186/" target="_blank" rel="noopener noreferrer">Linkedin</a>,
              &nbsp;<a href="https://github.com/Latharius" target="_blank" rel="noopener noreferrer">Github</a>, or via 
              email at <a href="mailto:leithr97@gmail.com">Leithr97@gmail.com</a>
            </p>
            <p>Not a hiring manager? Feel free to send me a review or advice, i'm always looking to improve!</p>
          </div>
        )}

        {activeBox === "experience" && (
          <div className="text_box">
            <p><strong>NASA:</strong> Insourcing transition from Amentum to NASA continuing the same role and responsibilities from 10/2026-Present</p>
            <p><strong>Amentum:</strong> <u>Software Engineer</u> from 01/2026-09/2026 specializing in Python development, automated testing, and deployment automation for 
            mission-critical systems. Experienced in developing and troubleshooting software, building BDD-based test automation with Behave/Cucumber, 
            and automating deployments and configurations using Ansible and AWX. Skilled in Red Hat Linux, Docker, Flask, Git, root-cause analysis, and 
            software integration, with a focus on system reliability, maintainability, and operational readiness.</p>
            <p><strong>LocusUSA:</strong> <u>Software Engineer</u> from 09/2023-03/2025 specializing in frontend development, software testing, 
            and system optimization. Designed, developed, tested, and optimized cross-platform applications using Flutter, .NET MAUI, Python, and Figma. 
            Experienced in programming, testing, and debugging circuit boards to ensure reliability and production readiness. Led the design and development 
            of a <u>digital spectrum analyzer</u> that processed external data and displayed results through a customizable GUI, achieving a <u>50% improvement</u> in 
            response time and a more consistent, reliable connection method.</p>
          </div>
        )}

        {activeBox === "projects" && (
          <div className="text_box">
            <p><strong><a href="https://github.com/Samdosi/OnlyHands-" target="_blank" rel="noopener noreferrer">OnlyHands</a>:</strong> A Tinder-style matching application 
            designed to connect martial artists with training and sparring partners. I focused on the database layer, using <u>MongoDB</u> to structure and manage user data, 
            and contributed to the frontend using <u>React.js</u></p>
            <p><strong><a href="https://docs.google.com/document/d/1lRhKnxf_nXBFLPZNh7UkucsBuqzN2b4t/edit" target="_blank" rel="noopener noreferrer">Frequency-Based 
            Instrumental Lights</a>:</strong> My senior capstone project, completed with a team of two computer engineers and two electrical engineers, including myself. 
            I worked alongside my partner to build the software application: a <u>Python program</u> that that analyzed audio input in real time through a microphone and 
            translated musical notes and volume into corresponding RGB light colors, intervals, and brightness levels.</p>
            <p><strong>Secret Project (Mobile App, in development):</strong> Creating an application integrating real-time geolocation tracking, interactive maps, 
            dynamic scheduling, and instant messaging to streamline planning and communication between users. Built with the goal of bringing communities together and 
            saving people time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
