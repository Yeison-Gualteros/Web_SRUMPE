import React from 'react'
import { Link } from "react-router-dom";

export default function Secretaria() {
    return(
            <React.Fragment>
            <div className="">
	<main className=" main-container">
	<nav className="full-box navbar-info">
            <a href="/Home" className="">
                <p><i class="fas fa-sign-in-alt"></i> Iniciar Sesion</p>
            </a>
        </nav>
		<section className="full-box page-contentt" style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 56px)' }}>
        <div className="scrollable-content" /*style={{backgroundColor:"white", marginLeft:'50px', marginTop:'50px', marginRight:'50px', marginBottom:'50px'}}*/>
			<div className="full-box page-header "  >	
            <img src="/assets/img/logotipo-6.jpeg" alt="Logotipo del colegio" className="logo-img-inicio"/>
				<h4 className="text-center">
					 &nbsp; 
				</h4>
			</div>
            <hr></hr>
			<div className="full-box page-header">	
				<h2 className="text-center">
					<i className="fas fa-feather-alt"></i> &nbsp;Proposito
				</h2>
				<p className="eslogan text-center" style={{marginLeft:'50px', marginTop:'50px', marginRight:'50px', marginBottom:'50px'}}>
                "¡Bienvenido a nuestra plataforma educativa! Nuestro objetivo es facilitar la gestión de datos y automatizar los procesos para una mejor administración en nuestra institución educativa. Tenemos dos roles clave: el administrador, encargado de registrar estudiantes, docentes y asignarles planes de estudios completos, incluyendo aulas, materias, horarios y cursos. Los docentes pueden ingresar y registrar notas por alumno y curso, además de editar y eliminarlas según sea necesario. Por último, los estudiantes pueden acceder para visualizar sus notas y, si lo desean, registrarse y acceder según su rol. ¡Únete a nosotros y simplifica tu experiencia educativa!"				</p>
			</div>
            <hr></hr>
			<div className="full-box page-header">	
				<h2 className="text-center">
					<i className="fas fa-spa"></i> &nbsp;Eslogan
				</h2>
				<p className="eslogan text-center" style={{marginLeft:'50px', marginTop:'50px', marginRight:'50px', marginBottom:'50px'}}>
				"Un camino transparente hacia el éxito académico: Descubre la excelencia con nuestro innovador sistema de registro de usuarios y notas escolares."</p>			</div>
			</div>
			<hr></hr>
		</section>
	</main>
</div>
            </React.Fragment>
    )
}