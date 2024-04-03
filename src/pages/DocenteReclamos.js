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
                                        <a href='/Docente'><i class="fab fa-dashcube fa-fw"></i> &nbsp; Inicio</a>
                                    </li>
                                    <li>
                                        <a href=" " className="nav-btn-submenu"><i className="fas fa-layer-group fa-fw"></i> &nbsp; Cursos <i className="fas fa-chevron-down"></i></a>
                                        <ul>	
                                            <li>
                                                <a href='/Docenteelegircurso'><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Elegir Cursos</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href=" " className="nav-btn-submenu"><i className="fas fa-users fa-fw"></i> &nbsp;  Estudiantes <i className="fas fa-chevron-down"></i></a>
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
            <div class="full-box page-header">
                <h3 class="text-left">
                    <i class="fas fa-building fa-fw"></i> &nbsp; RECLAMOS DE LOS ESTUDIANTES
                </h3>
                <p class="text-justify">
                </p>
            </div>
            <div class="container-fluid">
                <form action="" class="form-neon" autocomplete="off">
                    <fieldset>
                        <legend><i class="far fa-building"></i> &nbsp; Reclamos</legend>
                        <div class="table-responsive">
                            <table class="table table-dark table-sm">
                                <thead>
                                    <tr class="text-center roboto-medium">
                                        <th>T.I/C.C</th>
                                        <th>Nombre</th>
                                        <th>Reclamos</th>
                                        <th>Responder</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-center" >
                                        <td>1234567</td>
                                        <td>Nombre del estudiante</td>
                                        <td>Reclamo del estudiante</td>
                                        <td>
                                            <a href="Docente-responder-reclamos.html" class="btn btn-success">
                                                  <i class="fas fa-sync-alt"></i>	
                                            </a>
                                        </td>
                                    </tr>
                                    <tr class="text-center" >
                                        <td>1234567</td>
                                        <td>Nombre del estudiante</td>
                                        <td>Reclamo del estudiante</td>
                                        <td>
                                            <a href="Docente-responder-reclamos.html" class="btn btn-success">
                                                  <i class="fas fa-sync-alt"></i>	
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                    <br/><br/><br/>
                    <p class="text-center" >
                        <button type="reset" class="btn btn-raised btn-secondary btn-sm"><i class="fas fa-paint-roller"></i> &nbsp; LIMPIAR</button>
                        &nbsp; &nbsp;
                        <button type="submit" class="btn btn-raised btn-info btn-sm"><i class="far fa-save"></i> &nbsp; GUARDAR</button>
                    </p>
                </form>
            </div>
                    </section>
                </main>
            </React.Fragment>
    )
}