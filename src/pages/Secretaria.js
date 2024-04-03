import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Secretariaacudientelista from './Secretariaacudientelista';

export default function Secretaria() {
	const url = 'https://localhost:7284/api/Acudiente';
	useEffect(() => {
		getAcudiente();
	  }, []);
	  
	  const getAcudiente = async () => {
		try {
		  const response = await axios.get(url);
		  setAcudiente(response.data);
		  setcontadorAcudiente(response.data.length);
		} catch (error) {
		  console.error('Error fetching acudiente:', error);
		}
	  };
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [contadorAcudiente, setcontadorAcudiente] = useState(0);
	const [acudiente, setAcudiente] = useState([]);

	const url1 = 'https://localhost:7284/api/cursos';
	const [cursos, setCursos] = useState([]);
	const [contadorCursos, setContadorCursos] = useState(0);
	useEffect(() => {
        getcursos();
    }, []);

    const getcursos = async () => {
        try {
            const respuesta = await axios.get(url1);
            setCursos(respuesta.data);
            setContadorCursos(respuesta.data.length);
        } catch (error) {
            console.error('Error al obtener cursos:', error);
        }
    };

	const url2 = 'https://localhost:7284/api/candidatoEstudiante';
	const [contadorEstudiantes, setContadorEstudiantes] = useState(0);
	const [candidatoEstudiantes, setCandidatoEstudiantes] = useState([]);

	useEffect(() => {
		getCandidatoEstudiantes();
	  }, []);
	  
	  const getCandidatoEstudiantes = async () => {
		try {
		  const response = await axios.get(url2);
		  setCandidatoEstudiantes(response.data);
		  setContadorEstudiantes(response.data.length);
		} catch (error) {
		  console.error('Error fetching candidatoEstudiantes:', error);
		}
	  };

	const url3 = 'https://localhost:7284/api/Docente'
    const [docente, setDocente] = useState([]);
	const [contadorDocente, setContadorDocente] = useState(0);

	useEffect(() => {
        getDocente();
    }, []);
    const getDocente = async () => {
      try {
        const respuesta = await axios.get(url3);
        setDocente(respuesta.data);
        setContadorDocente(respuesta.data.length);
        //getCursos(respuesta.data);
        //getMateria(respuesta.data);
        //getAula(respuesta.data);
      } catch (e) {
        console.log(e);
      }
        
    }
	const url4 = 'https://localhost:7284/api/materia';
	const [materia, setMateria] = useState([]);
	const [contadorMaterias, setContadorMaterias] = useState(0);

	useEffect(() => {
        getmateria();
    }, []);
	const getmateria = async () => {
		try {
			const respuesta = await axios.get(url4);
			setContadorMaterias(respuesta.data.length)
			if (Array.isArray(respuesta.data)) {
				setMateria(respuesta.data);
			} else {
				// Si no es un array, muestra un mensaje de error o realiza otra acción adecuada
			}
		} catch (error) {
		}
	};

	const url5 = 'https://localhost:7284/api/aula'
	const [aulas, setAulas] = useState([]);
    const [contadorAulas, setContadorAulas] = useState(0);
	useEffect(() => {
		getAulas();
	  }, []);
	  const getAulas = async () => {
		try {
		  const response = await axios.get(url5);
		  console.log('Datos recibidos:', response.data);
		  setAulas(response.data);
		  setContadorAulas(response.data.length);
		} catch (error) {
		  console.error('Error al obtener Aulas', error);
		}
	  };

	  const url7 = 'https://localhost:7284/api/horario'
	  const [horario, setHorario] = useState([]);
	  const [contadorHorario, setContadorHorario] = useState(0);

	  useEffect(() => {
		getHorario();
	  }, []);
	  const getHorario = async () => {
		try {
		  const response = await axios.get(url7);
		  console.log('Datos recibidos:', response.data);
		  setHorario(response.data);
		  setContadorHorario(response.data.length);
		} catch (error) {
		  console.error('Error al obtener Aulas', error);
		}
	  };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return(
            <React.Fragment>
            <div style={{ paddingBottom: '60px' }}>
	<main className={`full-box main-container ${isMenuOpen ? 'menu-open' : ''}`}>
	<section className="full-box nav-lateral">
			<div className="full-box nav-lateral-bg show-nav-lateral"></div>
			<div className="full-box nav-lateral-content">
				<figure className="full-box nav-lateral-avatar">
					<i className="far fa-times-circle show-nav-lateral"></i>
					<figcaption className="SRMNPE text-center">
						SRUNPE <br/><small className="roboto-condensed-light"></small>
					</figcaption>
					<img src="/assets/avatar/Avatar_negro.jpg" className="img-fluid" alt="Avatar"/>
					<figcaption className="roboto-medium text-center">
                    Axl Julian Acuña Rubiano <br/><small className="roboto-condensed-light"><p><span className="badge badge-info">Administrativo</span></p></small>
					</figcaption>
				</figure>
				<div className="full-box nav-lateral-bar"></div>
				<nav className="full-box nav-lateral-menu">
					<ul>
						<li>
							<a href="/Secretaria"><i className="fab fa-dashcube fa-fw"></i> &nbsp; Inicio</a>
						</li>

						<li>
							<a href=" " className="nav-btn-submenu"><i className="fas fa-users fa-fw"></i> &nbsp;  Estudiantes <i className="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="/Secretariaestudiantelista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Estudiante</a>
								</li>
								<li>
									<a href="/Secretariabuscarestudiante"><i className="fas fa-search fa-fw"></i> &nbsp; Buscar Estudiante</a>
								</li>
							</ul>
						</li>
						<li>
							<a href=" " className="nav-btn-submenu"><i className="fas fa-users fa-fw"></i> &nbsp;  Acudiente <i className="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="/Secretariaacudientelista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Acudientes</a>
								</li>
								<li>
									<a href="/Secretariabuscaracudiente"><i className="fas fa-search fa-fw"></i> &nbsp; Buscar Acuendiente</a>
								</li>
							</ul>
						</li>
						<li>
							<a href=" " className="nav-btn-submenu"><i className="fas fa-chalkboard-user fa-fw"></i> &nbsp; Docentes <i className="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="/Secretariadocentelista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Docentes</a>
								</li>
								<li>
									<a href="/Secretariadocentebuscar"><i className="fas fa-search fa-fw"></i> &nbsp; Buscar Docentes</a>
								</li>
							</ul>
						</li>
						<li>
							<a href=" " className="nav-btn-submenu"><i className="fas fa-layer-group fa-fw"></i> &nbsp; Cursos <i className="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="/Secretariacursoslista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Cursos</a>
								</li>
								<li>
									<a href="/Secretariacursobuscar"><i className="fas fa-search fa-fw"></i> &nbsp; Buscar Curso</a>
								</li>
							</ul>
						</li>
						<li>
							<a href=" " className="nav-btn-submenu"><i className="fas fa-pallet fa-fw"></i> &nbsp; Materias <i className="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="/Secretariamaterialista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Materias</a>
								</li>
							</ul>
						</li>
						<li>
							<a href=" " className="nav-btn-submenu"><i className="fas fa-kaaba"></i> &nbsp; Aulas <i className="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="/Secretariaulalista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Aulas</a>
								</li>
							</ul>
						</li>
						<li>
							<a href=" " className="nav-btn-submenu"><i className="far fa-calendar-alt"></i> &nbsp; Horarios <i className="fas fa-chevron-down"></i></a>
							<ul>
								<li>
									<a href="/SecretariaHorarioslista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Horarios</a>
								</li>
								<li>
									<a href="/SecretariaHorariosbuscar"><i className="fas fa-search fa-fw"></i> &nbsp; Buscar Horario</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
		</section>
		<section className="full-box page-content">
			<nav className="full-box navbar-info">
				<a href=" " className="float-left show-nav-lateral">
					<i className="fas fa-exchange-alt"></i>
				</a>
				<a href="/Secretariaactualizar">
					<i className="fas fa-user-cog"></i>
				</a>
				<a href=" " className="btn-exit-system">
					<i className="fas fa-power-off"></i>
				</a>
			</nav>
			{/*<img src="/assets/img/logotipo-6.jpeg" alt="Logotipo del colegio" className="logo-img"/>*/}
			<div className="full-box page-header">	
				<h3 className="text-left">
					<i className="fab fa-dashcube fa-fw"></i> &nbsp; INICIO
				</h3>
				<p className="eslogan text-justify">
					"Un camino transparente hacia el éxito académico: Descubre la excelencia con nuestro innovador sistema de registro de usuarios y notas escolares."
				</p>
			</div>
			<div className="full-box tile-container">
				<a href='/Secretariaestudiantelista' className="tile">
					<div className="tile-tittle">Estudiantes</div>
					<div className="tile-icon">
						<i className="fas fa-users fa-fw"></i>
						<p>Registrados: {contadorEstudiantes}</p>
					</div>
				</a>
				<a href='/Secretariaacudientelista' className="tile">
					<div className="tile-tittle">Acudientes</div>
					<div className="tile-icon">
						<i className="fas fa-users fa-fw"></i>
						<p>Registrados: {contadorAcudiente}</p>
					</div>
				</a>
				<a href='/Secretariadocentelista' className="tile">
					<div className="tile-tittle">Docentes</div>
					<div className="tile-icon">
						<i className="fas fa-chalkboard-user fa-fw"></i>
						<p>Registrados: {contadorDocente}</p>
					</div>
				</a>
				<a href='/Secretariacursoslista' className="tile">
					<div className="tile-tittle">Cursos</div>
					<div className="tile-icon">
						<i className="fas fa-layer-group fa-fw"></i>
						<p>Registrados: {contadorCursos}</p>
					</div>
				</a>
				<a href="/Secretariamaterialista" className="tile">
					<div className="tile-tittle">Materias</div>
					<div className="tile-icon">
						<i className="fas fa-pallet fa-fw"></i>
						<p>Registrados: {contadorMaterias}</p>
					</div>
				</a>
			<a href='/Secretariaulalista' className="tile">
				<div className="tile-tittle">Aulas</div>
				<div className="tile-icon">
					<i className="fas fa-kaaba"></i>
					<p>Registrados: {contadorAulas}</p>
				</div>
			</a>
			<a href='/Secretariahorarioslista' className="tile">
					<div className="tile-tittle">Horarios</div>
					<div className="tile-icon">
						<i className="far fa-calendar-alt"></i>
						<p>Registrados: {contadorHorario}</p>
					</div>
				</a>
				<hr></hr>
				<div >
    <div>
        <p>Derechos de autor </p>
        <p>&copy; Plantilla: https://designlopers.com/</p>
    </div>
	</div>
			</div>
		</section>
	</main>
</div>
            </React.Fragment>
    )
}