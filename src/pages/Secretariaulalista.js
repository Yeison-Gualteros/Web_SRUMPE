import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Secretariaulalista() {
    const URL = 'https://localhost:7284/api/aula'
    const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');

  const [nombreNumero, setnombreNumero] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [tipoAula, setTipoAula] = useState('');
  const [estadoAula, setEstadoAula] = useState('');
  const [horarioDisponibilidad, setHorarioDisponibilidad] = useState('');
  const [notasAdicionales, setNotasAdicionales] = useState('');
  const [registrosIncidentesProblemas, setRegistrosIncidentesProblemas] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [profesorasignado, setProfesorasignado] = useState('');
  const [aulas, setAulas] = useState([]);
  const [aulaId, setAulaId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');
    const [contadorAulas, setContadorAulas] = useState(0);


    /*const url2 = 'https://localhost:7284/api/Docente'
    const [Docente, setDocente] = useState([]);
    const [DocenteId, setDocenteId] = useState('');*/

  useEffect(() => {
    getAulas();
  }, []);
 /* useEffect(() => {
    fetch(url2)
    .then(response => response.json())
    .then((data) => setDocente(data))
    
}, [url2]);*/

  const getAulas = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/aula');
      console.log('Datos recibidos:', response.data);
      setAulas(response.data);
      setContadorAulas(response.data.length);
    } catch (error) {
      console.error('Error al obtener Aulas', error);
    }
  };

  const cerrarModal = () => {
    const modal = document.getElementById('ModalAula');
    modal.classList.remove('show'); // Eliminar la clase 'show' para ocultar el modal
    modal.setAttribute('aria-hidden', 'true'); // Asegurarse de que el modal esté marcado como oculto para accesibilidad
    document.body.classList.remove('modal-open'); // Eliminar la clase 'modal-open' del body para permitir el scroll nuevamente
    const modalBackdrop = document.querySelector('.modal-backdrop'); // Eliminar el backdrop del modal si existe
    if (modalBackdrop) {
        document.body.removeChild(modalBackdrop);
    }
    setShowModal(false);
};

  const openModal = (op, aula) => {
    setOperation(op);
    if (op === 1) {
        setTitle('Registrar Aula');
        setAulaId('');
        setnombreNumero('');
        setUbicacion('');
        setCapacidad('');
        setTipoAula('');
        setEstadoAula('');
        setHorarioDisponibilidad('');
        setNotasAdicionales('');
        setRegistrosIncidentesProblemas('');
    }
    if (op === 2) {
        setTitle('Editar Aula');
        setAulaId(aula.aulaId);
        setnombreNumero(aula.nombreNumero);
        setUbicacion(aula.ubicacion);
        setCapacidad(aula.capacidad);
        setTipoAula(aula.tipoAula);
        setEstadoAula(aula.estadoAula);
        setHorarioDisponibilidad(aula.horarioDisponibilidad);
        setNotasAdicionales(aula.notasAdicionales);
        setRegistrosIncidentesProblemas(aula.registrosIncidentesProblemas);
    }
    window.setTimeout(function(){
        document.getElementById('Nombre').focus();
    }, 500);
    setShowModal(true);
  };
  const validar = () =>{
    if (nombreNumero === '') {
        show_alert('Escribe el nombre de la Aula', 'error');
    }
    if (ubicacion === '') {
        show_alert('Escribe la ubicación de la Aula', 'error');
    }
    if (capacidad === '') {
        show_alert('Escribe la capacidad de la Aula', 'error');
    }
    if (tipoAula === '') {
        show_alert('Escribe el tipo de aula', 'error');
    }
    if (estadoAula === '') {
        show_alert('Escribe el estado de la Aula', 'error');
    }
    
    if (notasAdicionales === '') {
        show_alert('Escribe las notas adicionales de la Aula', 'error');
    }
    else {
        let parametros;
        let metodo;
        if (operation === 1) {
            parametros = { 
                aulaId: aulaId, 
                nombreNumero: nombreNumero, 
                ubicacion: ubicacion, 
                capacidad: capacidad, 
                tipoAula: tipoAula, 
                estadoAula: estadoAula, 
                horarioDisponibilidad: horarioDisponibilidad, 
                notasAdicionales: notasAdicionales, 
                registrosIncidentesProblemas: registrosIncidentesProblemas,
                //docenteId: DocenteId
            };
            metodo = "POST";
            
        }else{
            parametros = { 
                aulaId: aulaId, 
                nombreNumero: nombreNumero, 
                ubicacion: ubicacion, 
                capacidad: capacidad, 
                tipoAula: tipoAula, 
                estadoAula: estadoAula, 
                horarioDisponibilidad: horarioDisponibilidad, 
                notasAdicionales: notasAdicionales, 
                registrosIncidentesProblemas: registrosIncidentesProblemas, 
                //docenteId: DocenteId, 
            };
            metodo = "PUT";
        }
        enviarSolicitud(metodo, parametros);
        cerrarModal();
    }
  };
  
  const enviarSolicitud = async (metodo, parametros) => {
    try {
        let respuesta;
        if (metodo === "POST") {
            respuesta = await axios.post(URL, parametros)
        }else if (metodo === "PUT") {
            respuesta = await axios.put(`${URL}/${aulaId}`, parametros)
        }
        console.log(`Solicitud ${metodo.toUpperCase()} exitosa:`, respuesta.data);
        const mensajeExito = operation === 1 ? 'Aula Añadida exitasamente' : 'Aula editada con exito';
        show_alert(mensajeExito, 'success');
        document.getElementById('btnCerrar').click();
        getAulas();
    }catch (error) {
        show_alert('Eror de Solicitud', 'error');
        console.error('Error al enviar solicitud', error);
    }
  }

  const deleteAula = ( aulaId,nombreNumero) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: '¿Está seguro que desea eliminar la Aula?',
        text: `La Aula ${nombreNumero} será eliminada permanentemente`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed){
            try{
                await axios.delete(`${URL}/${aulaId}`);
                show_alert('Aula elimidad con éxito', 'success')
                document.getElementById('btnCerrar').click();
                getAulas();
                setContadorAulas(contadorAulas - 1);
            }catch (error){
                show_alert('Error al eliminar aula', 'error');
                console.error('Error al eliminar aula', error);
            }
        }else {
            show_alert('La aula no fue eliminada', 'info');
        }
      });
  };
    return(
        
            <React.Fragment>
            
	
	
            <main className="full-box main-container">
		
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
							<a href="#" className="nav-btn-submenu"><i className="fas fa-users fa-fw"></i> &nbsp;  Estudiantes <i className="fas fa-chevron-down"></i></a>
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
							<a href="#" className="nav-btn-submenu"><i className="fas fa-users fa-fw"></i> &nbsp;  Acudiente <i className="fas fa-chevron-down"></i></a>
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
							<a href="#" className="nav-btn-submenu"><i className="fas fa-chalkboard-user fa-fw"></i> &nbsp; Docentes <i className="fas fa-chevron-down"></i></a>
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
							<a href="#" className="nav-btn-submenu"><i className="fas fa-layer-group fa-fw"></i> &nbsp; Cursos <i className="fas fa-chevron-down"></i></a>
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
							<a href="#" className="nav-btn-submenu"><i className="fas fa-pallet fa-fw"></i> &nbsp; Materias <i className="fas fa-chevron-down"></i></a>
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
          <a href="#" className="float-left show-nav-lateral">
            <i className="fas fa-exchange-alt"></i>
          </a>
          <a href="/Secretariaactualizar">
            <i className="fas fa-user-cog"></i>
          </a>
          <a href="#" className="btn-exit-system">
            <i className="fas fa-power-off"></i>
          </a>
        </nav>

			<div className="full-box page-header">
                <h3 className="text-left">
                    <i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE AULAS
                </h3>
                <p className="text-justify">
                Total de estudiantes registrados: {contadorAulas}
                </p>
            </div>
            <div className="container-fluid">
                <ul className="full-box list-unstyled page-nav-tabs">
                    <li>
                    <div
                        onClick={() => openModal(1)}
                        data-toggle="modal"
                        data-target="#ModalAula" 
                    >
                        <a><i className="fas fa-plus fa-fw"></i> Añadir Aula nueva</a>
                    </div>
                    </li>
                    <li>
                        <a className="active" href="/Secretariaulalista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE AULAS</a>
                    </li>
                    {/*<li>
                        <a style={{color: 'black'}} href="/Secretariaulabuscar"><i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR AULAS</a>
    </li>*/}
                </ul>
            </div>
            <div className="container-fluid">
                            <div className="row mt-3">
                                <div className="col-md-4 offset-4">
                                    <div className="d-gris mx-auto">
                                        <div className="d-flex justify-content-center align-items-center h-100">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
           <div className="container-fluid">
				<div className="table-responsive">
					<table className="table table-dark table-sm">
						<thead>
							<tr className="text-center roboto-medium">
								<th>#</th>
								<th>NOMBRE</th>
                                <th>CAPACIDAD</th>
								<th>TIPO DE AULA</th>
								<th>ESTADO DE LA AULA</th>
								<th>ELIMINAR / ACTUALIZAR</th>
							</tr>
						</thead>
						<tbody className="table-group-divider">
							{aulas.map((aula, i) =>( 
							<tr className="text-center"  key={aula.aulaId}>
								<td>{i+1}</td>
								<td>{aula.nombreNumero}</td>
                                <td>{aula.capacidad}</td>
								<td>{aula.tipoAula}</td>
								<td>{aula.estadoAula}</td>
								<td>
								<button onClick={() => openModal(2, aula)} className="btn btn-success" data-toggle='modal' data-target='#ModalAula'>
                          <i className="fas fa-edit"></i>
                        </button>
									 / &nbsp;
									<button  onClick={() => deleteAula(aula.aulaId, aula.nombres, aula.numeroTelefono, aula.cursosAsignados, aula.numeroIdentificacion, aula.apellidos)} className="btn btn-danger">
                  <i className="far fa-trash-alt"></i>
                        </button>
								</td>
								
							</tr>
							))}
						</tbody>
					</table>
				</div>
				<nav aria-label="Page navigation example">
					<ul className="pagination justify-content-center">
						<li className="page-item disabled">
							<a className="page-link" href="#" tabIndex="-1">Atras</a>
						</li>
						<li className="page-item"><a className="page-link" href="#">1</a></li>
						<li className="page-item"><a className="page-link" href="#">2</a></li>
						<li className="page-item"><a className="page-link" href="#">3</a></li>
						<li className="page-item">
							<a className="page-link" href="#">Siguiente</a>
						</li>
					</ul>
				</nav>
			</div>
        </section>
    </main>
    <div id="ModalAula"  className="modal fade " aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button type="button" className="fas fa-times-circle" aria-label="Close" onClick={cerrarModal}></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="candidatoEstudianteId" />
              <div className="input-group mb-3">
              </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-signature"></i></span>
                    <input
                        type="text"
                        id="Nombre"
                        className="form-control"
                        placeholder="Nombre de la aula..."
                        value={nombreNumero}
                        onChange={(e) => {setnombreNumero(e.target.value)}}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                      <input
                        type="text"
                        id="ubicacion"
                        className="form-control"
                        placeholder="Ubicacion"
                        value={ubicacion}
                        onChange={(e) => {setUbicacion(e.target.value)}}
                      />
                    </div>
                    
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-sort-numeric-up-alt"></i></span>
                      <input
                        type="number"
                        id="capacidad"
                        className="form-control"
                        placeholder="Capacidad del aula..."
                        value={capacidad} 
                        onChange={(e) => {
                            const inputValue = e.target.value;
                             // Expresión regular para letras y espacios
                            if (capacidad >= 0 && capacidad <= 50) {
                              setCapacidad(inputValue);
                            }
                          }}
                        />
                      
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                      <input
                        type="text"
                        id="Tipoaula"
                        className="form-control"
                        placeholder="Tipo de aula"
                        value={tipoAula}
                        onChange={(e) => setTipoAula(e.target.value)}
                      />
                    </div>                        
                        <div className="input-group mb-3">
                          <span > <i className="fas fa-chalkboard-teacher"></i> Estado Aula</span>
                            <select className="form-select" value={estadoAula} onChange={(e) => setEstadoAula(e.target.value)}>
                                <option value="">Seleccione Estado</option>
                                <option value="Disponible">Activo</option>
                                <option value="Ocupado">Inactivo</option>
                            </select>
                        </div>
                        {/*<div className="input-group mb-3">
						<span className="input-group-text"><i className="fas fa-chalkboard-teacher"></i></span>
						<select
							className="form-select"
							value={DocenteId} // Utilizando la variable de estado
							onChange={(e) => setDocenteId(e.target.value)} // Utilizando la función setProfesorasignado para actualizar el estado
						>
							<option value="">Selecciona el profesor asignado</option>
							{Docente.length > 0 ? (
								Docente.map((docente) => (
									<option key={docente.DocenteId} value={docente.DocenteId}>
										{docente.nombres}
									</option>
								))
							) : (
								<option value="" disabled>
									Cargando Docentes...
								</option>
							)}
						</select>
              </div>*/}
                  <div className=" input-group mb-3">
                  <span className="input-group-text"><i className="far fa-comment-dots"></i></span>
                        <input
                        type="text"
                        id="notasadicionales"
                        className="form-control"
                        placeholder="Notas Adicionales"
                        value={notasAdicionales}
                        onChange={(e) => setNotasAdicionales(e.target.value)}
                      />
                      </div>
                    <div className='modal-footer'>
                    <div className='d-grid '>
                    <div className="d-flex justify-content-center  ">
                    <button onClick={validar} className="btn btn-outline-success">Guardar</button>
                    </div>
                    </div>
                  <div className="d-flex justify-content-center ">
                  <button onClick={()=> cerrarModal()} type='button' id="btnCerrar" className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                  </div>
                  </div>
                </div>
              </div>
		</div>
	</div>
        </React.Fragment>
    )
}  
