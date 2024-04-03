import React from 'react'
import { Link } from "react-router-dom";

export default function Docente() {
    return(
            <React.Fragment>
                <main className="full-box main-container">
                    <section className="full-box nav-lateral">
                        <div className="full-box nav-lateral-bg show-nav-lateral"></div>
                        <div className="full-box nav-lateral-content">
                            <figure className="full-box nav-lateral-avatar">
                                <i className="far fa-times-circle show-nav-lateral"></i>
                                <img src="/assets/avatar/Avatar_negro.jpg" className="img-fluid" alt="Avatar"/>
                                <figcaption className="roboto-medium text-center">
                                    Juan David Novoa Yanguma <br/><small className="roboto-condensed-light"><p><span className="badge badge-success">Docente</span></p></small>
                                </figcaption>
                            </figure>
                            <div className="full-box nav-lateral-bar"></div>
                            <nav className="full-box nav-lateral-menu">
                                <ul>
                                    <li>
                                    <a href='/Docente'>
                                        <i class="fab fa-dashcube fa-fw"></i> &nbsp; Inicio
                                    </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-btn-submenu"><i className="fas fa-layer-group fa-fw"></i> &nbsp; Cursos <i className="fas fa-chevron-down"></i></a>
                                        <ul>	
                                            <li>
                                                <a href='/Docenteelegircurso'>
                                                <a ><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Elegir Cursos</a>
                                                </a>	
                                            </li>					
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-btn-submenu"><i className="fas fa-users fa-fw"></i> &nbsp;  Estudiantes <i className="fas fa-chevron-down"></i></a>
                                        <ul>  
                                        <li>
                                            <a href='/Docenteestudiantelista'><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista De Estudiante</a>
                                        </li>
                                        <li>
                                            <a href='/Docentebuscarestudiante'><i class="fas fa-search fa-fw"></i> &nbsp; Buscar Estudiante</a>
                                        </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>
                    <section className="full-box page-content">
                        <nav className="full-box navbar-info">
                            <a href=' ' className="float-left show-nav-lateral">
                                <i className="fas fa-exchange-alt"></i>
                            </a>
                            <a href='/Docenteuserupdate'>
                                <i className="fas fa-user-cog"></i>
                            </a>
                            <a href=' ' className="btn-exit-system">
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
                            <a href="/Docenteelegircurso" className="tile">
                                <div className="tile-tittle">Elegir Curso</div>
                                <div className="tile-icon">
                                    <i className="fas fa-layer-group fa-fw"></i>
                                    <p>3 Registrados</p>
                                </div>
                            </a>
                            <a href="/Docenteestudiantelista" className="tile">
                                <div className="tile-tittle">Estudiantes</div>
                                <div className="tile-icon">
                                    <i className="fas fa-users fa-fw"></i>
                                    <p>100 Registrados</p>
                                </div>
                            </a>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
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
            </React.Fragment>
    )
}