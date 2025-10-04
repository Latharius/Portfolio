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
        <a href="/LeithsResume2.docx" target="_blank" rel="noopener noreferrer" download>
          <button className="button button_animate">Download Resume</button>
        </a>
      </div>

      <div className={`text_box_wrapper ${activeBox ? "open" : "closed"}`}>
        {activeBox === "about" && (
          <div className="text_box">
            <p>I am a Software Engineer with a Bachelor's degree in Computer Engineering from the University of Central Florida. I am passionate about developing 
              innovative software solutions that will have a meaningful impact on people's lives. With a strong foundation in software development, I am dedicated 
              to building applications that drive towards positive change. With the motto of "Efficiency first, style second", I strive to create clean, efficient, 
              and maintainable code that meets the needs of users and stakeholders alike before worrying about the design and style of the application.
            </p>
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
            <p><strong>LocusUSA:</strong> I was a software engineer for nearly 2 years where my focus was frontend programming.
            I designed, programmed, tested, and optimized web apps using <u>Figma</u>, <u>Flutter</u>, <u>.NET MAUI</u>, and <u>Python</u>.
            I also programmed, tested, and debugged circuit boards to ensure they were ready for distribution. My main project was the design and development of  digital 
            spectrum analyzer which read data from an external source and displayed it on a customizable GUI. The project resulted in a 50% increase in response time 
            and a more consistent and reliable connection method.</p>
          </div>
        )}

        {activeBox === "projects" && (
          <div className="text_box">
            <p><strong><a href="https://github.com/Samdosi/OnlyHands-" target="_blank" rel="noopener noreferrer">OnlyHands</a>:</strong> A Tinder-type application that was made 
            to match martial artists with other martial artists so they could more easily find training and sparring partners. Personally worked on the database 
            using <u>MongoDB</u> and on the frontend using <u>React.js</u></p>
            <p><strong><a href="https://docs.google.com/document/d/1lRhKnxf_nXBFLPZNh7UkucsBuqzN2b4t/edit" target="_blank" rel="noopener noreferrer">Frequency-Based 
            Instrumental Lights</a>:</strong> My senior Project. Completed with a team of two computer engineers and two electrical engineers, including myself. 
            Personally worked on the software application along with my partner. It was a <u>Python application</u> that allowed you to control the color themes, intervals, 
            and brightness levels of RGB lights by reading the sound waves going into the microphone and controlling the lights to display the correct colors and 
            brightness levels according to the musical notes and volume inputted into the microphone.
            </p>
            <p><strong>Secret Project (Mobile App):</strong> Creating an application which integrates real-time geolocation tracking with interactive maps, dynamic scheduling and 
            instant messaging for efficient planning and communication between users. Built with the hopes of bringing communities 
            together and saving everyone precious time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
