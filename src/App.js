import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

// Componente de cabecera
function Header({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${theme}`}>
      <div className="container header-container">
        <div className="header-name">Rodrigo Montenegro F</div>
        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#inicio" onClick={toggleMenu}>Inicio</a></li>
            <li><a href="#sobre-mi" onClick={toggleMenu}>Sobre mí</a></li>
            <li><a href="#proyectos" onClick={toggleMenu}>Proyectos</a></li>
            <li><a href="#contacto" onClick={toggleMenu}>Contacto</a></li>
          </ul>
        </nav>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
}

// Componente de inicio
function Home() {
  return (
    <section id="inicio" className="section home full-height">
      <div className="container">
        <h1>Bienvenido a mi portafolio</h1>
        <p>Soy un desarrollador web apasionado por crear experiencias digitales increíbles.</p>
        <a href="#proyectos" className="btn">Ver mis proyectos</a>
      </div>
    </section>
  );
}

// Componente sobre mí
function About() {
  return (
    <section id="sobre-mi" className="section about full-height">
      <div className="container">
        <h2>Sobre mí</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Soy un desarrollador web con experiencia en React, Node.js y diseño responsivo. Me apasiona crear aplicaciones web eficientes y fáciles de usar.</p>
            <h3>Mis habilidades:</h3>
            <ul>
              <li>React</li>
              <li>JavaScript</li>
              <li>HTML & CSS</li>
              <li>Node.js</li>
              <li>Git</li>
            </ul>
          </div>
          <div className="about-image">
            <img src="https://via.placeholder.com/300" alt="Rodrigo Montenegro" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente de detalles del proyecto
function ProjectDetail({ project, onClose }) {
  return (
    <div className="project-detail">
      <h3>{project.title}</h3>
      <img src={project.image} alt={project.title} />
      <p>{project.description}</p>
      <h4>Detalles del proyecto:</h4>
      <ul>
        <li>Tecnologías utilizadas: React, Node.js, Express</li>
        <li>Duración del proyecto: 3 meses</li>
        <li>Rol: Desarrollador Full Stack</li>
      </ul>
      <button onClick={onClose} className="btn">Cerrar</button>
    </div>
  );
}

// Componente de proyectos
function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = [
    { id: 1, title: 'Proyecto 1', description: 'Una aplicación web de comercio electrónico', image: 'https://via.placeholder.com/300x200' },
    { id: 2, title: 'Proyecto 2', description: 'Un blog personal con CMS personalizado', image: 'https://via.placeholder.com/300x200' },
    { id: 3, title: 'Proyecto 3', description: 'Una aplicación de seguimiento de tareas', image: 'https://via.placeholder.com/300x200' },
    { id: 4, title: 'Proyecto 4', description: 'Una aplicación de seguimiento de tareas', image: 'https://via.placeholder.com/300x200' },
  ];

  return (
    <section id="proyectos" className="section projects full-height">
      <div className="container">
        <h2>Mis Proyectos</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
        {selectedProject && (
          <div className="modal">
            <div className="modal-content">
              <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Componente de contacto
function Contact() {
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '', reply_to: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log('Resultado:', result);
      setStatus('Mensaje enviado correctamente!');
      setFormData({ from_name: '', from_email: '', message: '', reply_to: '' });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setStatus('Error al enviar el mensaje.');
    }
  };

  return (
    <section id="contacto" className="section contact full-height">
      <div className="container">
        <h2>Contacto</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="from_name">Nombre:</label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="from_email">Correo electrónico:</label>
            <input
              type="email"
              id="from_email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reply_to">Replica del Correo:</label>
            <input
              type="email"
              id="reply_to"
              name="reply_to"
              value={formData.reply_to}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Enviar</button>
          {status && <div className="form-status">{status}</div>}
        </form>
      </div>
    </section>
  );
}

// Componente principal de la aplicación
function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Aplicar tema al cargar la página
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Home />
      <About />
      <Projects />
      <Contact />
      <footer>
        <p>&copy; 2024 Mi Portafolio. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
