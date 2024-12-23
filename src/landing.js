import React from 'react';
import Intro from './sections/intro';
import About from './sections/about';
import CourseAccess from './sections/courseAccess';
import VideoSection from './sections/VideoSection';
import Projects from './sections/projects';
import Contact from './sections/contact';

const Landing = () => {
    return (
        <>
            <Intro />
            <About />
            <CourseAccess />
            <VideoSection />
            <Projects />
            <Contact />
        </>
    );
};

export default Landing;