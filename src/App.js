import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';
//import latestTag from 'raw-loader!./latestTag.txt'; // Importa el contenido del archivo como texto
import latestTag from './latestTag.txt'; // Just import the file

//import latestTag from './latestTag.txt'; // Importa el archivo


// Componente de cabecera
// Componente de cabecera
function Header({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Alternar estado del menú
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Clases de encabezado y nav basadas en tema y estado del menú
  const headerClass = `header ${theme}`;
  const navClass = `header-nav ${menuOpen ? 'open' : ''}`;
  const boxClass = `menu-box ${theme}`; // Clase para el recuadro

  return (
    <header className={headerClass}>
      <div className="container header-container">
        <div className="header-name">Rodrigo Montenegro</div>
        <nav className={navClass}>
          <ul>
            {['Inicio', 'Sobre mí', 'Proyectos', 'Contacto'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={toggleMenu}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      {/* Recuadro debajo del menú */}
      <div className={boxClass}></div>
    </header>
  );
}


// Componente de inicio
// Componente de inicio
function Home() {
  const [tagContent, setTagContent] = useState(''); // Inicializa como vacío

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch(latestTag);
        const text = await response.text(); // Obtén el contenido como texto
        setTagContent(text); // Actualiza el estado con el contenido
      } catch (error) {
        console.error('Error al cargar la etiqueta:', error);
      }
    };

    fetchTag(); // Llama a la función para cargar la etiqueta
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <section id="inicio" className="section home full-height">
      <div className="container">
        <h1>Bienvenido a mi portafolio</h1>
        <p>Soy un desarrollador web apasionado por crear experiencias digitales increíbles.</p>
        <a href="#proyectos" className="btn">Ver mis proyectos</a>
      </div>
      <div className="prueba">
        <p>Tag: {tagContent}</p>
      </div>
    </section>
  );
}


// Componente sobre mí
function About() {
  return (
    <section id="sobre-mí" className="section about full-height">
      <div className="container">
        <h2>Sobre mí</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Soy Rodrigo Montenegro, un desarrollador web con experiencia en React, Node.js y diseño responsivo.
              Me apasiona crear aplicaciones web eficientes y fáciles de usar.
            </p>
            <SkillList />
          </div>
          <div className="about-image">
            <img src="https://via.placeholder.com/300" alt="Rodrigo Montenegro" />
          </div>
        </div>
      </div>
    </section>
  );
}


// Lista de habilidades reutilizable
function SkillList() {
  const skills = ['React', 'JavaScript', 'HTML & CSS', 'Node.js', 'Git'];
  return (
    <>
      <h3>Mis habilidades:</h3>
      <ul>
        {skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </>
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
// Componente de contacto
function Contact() {
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '', reply_to: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
        <div className="about-text">
          <p>
            Si tienes alguna pregunta o deseas discutir una oportunidad de trabajo, no dudes en contactarme. Estoy disponible y emocionado por nuevas colaboraciones.
          </p>
        </div>
        <div className="contact-box"> {/* Recuadro redondeado */}
          <form onSubmit={handleSubmit} className="contact-form">
            <InputField label="Nombre" name="from_name" value={formData.from_name} handleChange={handleChange} />
            <InputField label="Correo electrónico" name="from_email" value={formData.from_email} handleChange={handleChange} />
            <TextAreaField label="Mensaje" name="message" value={formData.message} handleChange={handleChange} />
            <InputField label="Replica del Correo" name="reply_to" value={formData.reply_to} handleChange={handleChange} />
            <button type="submit" className="btn">Enviar</button>
            {status && <div className="form-status">{status}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}


// Componente reutilizable para campos de entrada
function InputField({ label, name, value, handleChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        type={name === 'from_email' || name === 'reply_to' ? 'email' : 'text'}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}

// Componente reutilizable para textarea
function TextAreaField({ label, name, value, handleChange }) {
  return (
    
    <div className="form-group">
      
      <label htmlFor={name}>{label}:</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}
function Footer({ theme }) {
  const footerClass = `footer ${theme}`;
  return (
    <footer className={footerClass}>
      <div className="container footer-container">
        <p> &copy; {new Date().getFullYear()} Rodrigo Montenegro. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

// Componente principal de la aplicación
function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.className = theme; // Aplicar el tema cuando cambie
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Home />
      <About />
      <Projects />
      <Contact />
      <Footer theme={theme} /> {/* Añadir el footer aquí */}
    </div>
  );
}

export default App;
