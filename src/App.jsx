import './App.css'
import fotoPerfil from './assets/foto_perfil.jpg'
import angularLogo from './assets/angular.png'
import cssLogo from './assets/CSS.png'
import expressLogo from './assets/expressJS.png'
import gitLogo from './assets/git.png'
import htmlLogo from './assets/HTML.png'
import nodeLogo from './assets/nodejs.png'
import npmLogo from './assets/npm.png'
import reactLogo from './assets/react.svg'
import javaLogo from './assets/Java.png'
import pnpmLogo from './assets/PNPM.png'
import { motion } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ContactPage from './ContactPage.jsx'

const MotionLink = motion(Link)

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'Angular', src: angularLogo },
      { name: 'React', src: reactLogo },
      { name: 'HTML', src: htmlLogo },
      { name: 'CSS', src: cssLogo },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', src: nodeLogo },
      { name: 'Express', src: expressLogo },
      {name: 'Java', src: javaLogo },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', src: gitLogo },
      { name: 'npm', src: npmLogo },
      { name: 'pnpm', src: pnpmLogo },
    ],
  },
]

const projects = [
  {
    title: 'TFG Backend',
    description: 'Backend del TFG DAW con la lógica principal, API y persistencia de datos.',
    link: 'https://github.com/GonzaloBS01/TFG-DAW-Backend',
  },
  {
    title: 'TFG Frontend',
    description: 'Frontend del TFG DAW construido para consumir la API y mostrar la interfaz principal.',
    link: 'https://github.com/GonzaloBS01/TFG-DAW-Frontend',
  },
]

export default function App() {
  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.12, duration: 0.55, ease: 'easeOut' },
    }),
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage cardVariants={cardVariants} />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomePage({ cardVariants }) {
  return (
    <main className="app">
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-grid">
            <motion.img
              src={fotoPerfil}
              alt="Gonzalo Belloso"
              className="profile-pic"
              loading="lazy"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            />

            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <motion.h1 className="name" initial={{ scale: 0.99 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
                Gonzalo Belloso Sánchez
              </motion.h1>
              <motion.p className="role" initial={{ opacity: 0.85 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                Full-stack Junior
              </motion.p>
              <div className="cta">
                <motion.a whileHover={{ y: -3 }} href="#projects" className="btn primary">Ver proyectos</motion.a>
                <MotionLink whileHover={{ y: -3 }} to="/contacto" className="btn">Contacto</MotionLink>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <section id="about" className="section about">
        <h2>Sobre mí</h2>
        <p>Desarrollador Junior Full-Stack aprendiendo diseño, desarrollo y despliegue de aplicaciones web robustas y escalables. Cuento con una buena base técnica en el ecosistema JavaScript/TypeScript, con experiencia práctica en el desarrollo de interfaces dinámicas mediante Angular y React, para mi TFG he usado Angular y para otros proyectos he usado React, así como en la construcción de arquitecturas backend eficientes con Node.js y Java.</p>
        <br />
        <p>Mi perfil combina el desarrollo de software con un profundo interés por la infraestructura y los entornos de sistemas. Dispongo de un poco de experiencia autónoma en la gestión de servidores, virtualización mediante Docker y configuración de redes.</p>
        <br />
        <p>Gracias a mi trayectoria previa en soporte técnico y resolución de incidencias en hardware y electrónica, he desarrollado una buena capacidad analítica y una gran adaptabilidad ante retos tecnológicos complejos.</p>
      </section>

      <section id="skills" className="section skills">
        <h2>Habilidades</h2>
        <div className="skills-grid">
          {skills.map((s) => (
            <div key={s.category} className="skill-card">
              <h3>{s.category}</h3>
              <ul className="skill-logos">
                {s.items.map((item, j) => (
                  <motion.li
                    key={item.name}
                    className="skill-item"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.04 * j + 0.06, duration: 0.36, type: 'spring', stiffness: 220, damping: 20 }}
                    whileHover={{ scale: 1.12, y: -8, rotateZ: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img src={item.src} alt={item.name} title={item.name} />
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section projects">
        <h2>Proyectos</h2>
        <div className="projects-grid">
          {projects.map((p, index) => (
            <motion.article
              key={p.title}
              className="project-card"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.025, y: -8, rotateZ: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <a href={p.link} className="link">Ver repositorio</a>
            </motion.article>
          ))}
        </div>
      </section>

      <footer id="contact" className="section contact">
        <div className="contact-shell">
          <div className="contact-copy">
            <p className="section-label">Hablemos</p>
            <h2>Contacto</h2>
            <p>Si te interesa colaborar, hacer una práctica o comentarme una idea, puedes escribirme por cualquiera de estas vías o abrir el formulario completo.</p>
            <MotionLink whileHover={{ y: -3 }} to="/contacto" className="btn primary contact-cta">
              Ir al formulario
            </MotionLink>
          </div>

          <div className="contact-links">
            <a className="contact-link-card" href="mailto:gonzalo.belloso.01@gmail.com">
              <span>Email</span>
              <strong>gonzalo.belloso.01@gmail.com</strong>
            </a>
            <a className="contact-link-card" href="https://www.linkedin.com/in/gonzalo-belloso-sanchez" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>Ver perfil</strong>
            </a>
            <a className="contact-link-card" href="https://github.com/GonzaloBS01" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>Ver repos</strong>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
