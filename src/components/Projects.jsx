import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';


function Projects() {
  const sectionRef = useRef(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  const projects = [
    {
      title: 'Inventory Management System',
      description: 'Developed a comprehensive, full-stack Inventory Management System for a university to replace manual, error-prone inventory tracking. The system features accurate location tracking , automated repair notifications , and detailed reporting to significantly improve resource allocation, efficiency, and decision-making for faculty and administration.',
      image: project1,
      link: 'https://github.com/MalithDN/Inventory-Management-System-For-University-Faculty.git',
    },
    {
      title: 'FOT Connect',
      description: 'FOT Connect is a user-centric mobile application designed to improve communication and information sharing within the Faculty of Technology, University of Colombo. The app was conceptualized and designed using Material Design Guidelines, emphasizing clarity, consistency, and usability.',
      image: project2,
      link: 'https://github.com/ManugaK/FOT-News-App.git',
    },
    {
      title: 'Library Management System',
      description: 'Designed and developed a dynamic web application to manage users, books, and categories with secure authentication and role-based access.',
      image: project3,
      link: 'https://github.com/ManugaK/Web-App-Project.git',
    },
  ];

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTitleVisible(true);
        } else {
          setIsTitleVisible(false);
        }
      },
      { threshold: 0.2, once: false }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            });
          } else {
            setVisibleIndexes((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.2, once: false }
    );

    const section = sectionRef.current;
    const cards = document.querySelectorAll('.project-card');

    if (section) titleObserver.observe(section.querySelector('#projects-title'));
    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-24 min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Background gradient lights */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-90"
        style={{
          background:
            'radial-gradient(1200px 600px at 15% 20%, rgba(99, 179, 237, 0.14), transparent 60%), radial-gradient(900px 500px at 85% 80%, rgba(45, 212, 191, 0.12), transparent 60%)',
        }}
      />

      {/* Content wrapper above background */}
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-600 ease-out ${
              isTitleVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-90'}`}>
          <h2
            id="projects-title"
            className="text-5xl sm:text-6xl font-extrabold pb-3 tracking-tight bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Projects
          </h2>
          <div
            className="h-1 w-24 bg-gradient-to-r from-sky-400 to-emerald-400 mx-auto mt-3"
          />
          <p
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A collection of projects that showcase my skills and experience.
          </p>
        </div>

        {/* Project Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {projects.map((project, index) => {
            const isVisible = visibleIndexes.includes(index);

            return (
              <motion.div
                key={index}
                data-index={index}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 24, scale: 0.98 }
                }
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "center", willChange: "transform" }}
                className="project-card relative mb-12 flex flex-col p-6 bg-white/10 backdrop-blur-md rounded-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold text-white mt-6 text-left">{project.title}</h3>
                <p className="text-gray-300 text-sm mt-2 text-left flex-grow">{project.description}</p>
                
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-left group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Source Code</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Styles for gradient border/aura (matches Certifications card glow) */}
      <style>{`
        .project-card {
          background:
            linear-gradient(#0b0b0b, #0b0b0b) padding-box,
            linear-gradient(90deg, rgba(56,189,248,0.75), rgba(16,185,129,0.75)) border-box;
          border: 1.5px solid transparent;
          border-radius: 16px;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            box-shadow .5s ease,
            border-color .45s ease,
            filter .5s ease;
        }
        .project-card:hover {
          box-shadow:
            0 20px 65px rgba(56,189,248,0.28),
            0 12px 38px rgba(16,185,129,0.22),
            0 5px 10px rgba(0,0,0,0.4);
          filter: brightness(1.08);
        }
      `}</style>
    </section>
  );
}

export default Projects;