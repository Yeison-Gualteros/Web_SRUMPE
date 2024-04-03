import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Secretariahorarioslista() {
    const URL = 'https://localhost:7284/api/horario'
    const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');

  const [horario, setHorario] = useState([]);
  const [horarioId, setHorarioId] = useState('');

  const [diaSemana, setDiaSemana] = useState('');
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFin, setHoraFin] = useState(new Date());
  const [DuracionClaseMinutos, setDuracion] = useState('');
  const [periodoAcademico, setPeriodoAcademico] = useState('');
  const [grupoSeccion, setGrupoSeccion] = useState('');
  const [fechaInicioClases, setFechaInicioClases] = useState(new Date());
  const [fechaFinClases, setFechaFinClases] = useState(new Date());
  const [estadoHorario, setEstadoHorario] = useState('');
  const [notificacionCambioHorario, setNotificacionCambioHorario] = useState('');
  


  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');
    const [contadorHorario, setContadorHorario] = useState(0);


    const url2 = 'https://localhost:7284/api/Docente'
    const [Docente, setDocente] = useState([]);
    const [DocenteId, setDocenteId] = useState('');

  useEffect(() => {
    getHorario();
  }, []);
  useEffect(() => {
    fetch(url2)
    .then(response => response.json())
    .then((data) => setDocente(data))
    
}, [url2]);

  const getHorario = async () => {
    try {
      const response = await axios.get('https://localhost:7284/api/horario');
      console.log('Datos recibidos:', response.data);
      setHorario(response.data);
      setContadorHorario(response.data.length);
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

  const openModal = (op, horario) => {
    setOperation(op);
    if (op === 1) {
        setTitle('Registrar Horario');
        setHorarioId('');
        setDiaSemana('');
        setHoraInicio(new Date());
        setHoraFin(new Date());
        setDuracion('');
        setPeriodoAcademico('');
        setGrupoSeccion('');
        setFechaInicioClases(new Date());
        setFechaFinClases(new Date());
        setEstadoHorario('');
        setNotificacionCambioHorario('');

    }
    if (op === 2) {
        setTitle('Editar Horario');
        setHorarioId(horario.horarioId);
        setDiaSemana(horario.diaSemana);
        setHoraInicio(horario.horaInicio);
        setHoraFin(horario.horaFin);
        setDuracion(horario.DuracionClaseMinutos);
        setPeriodoAcademico(horario.periodoAcademico);
        setGrupoSeccion(horario.grupoSeccion);
        setFechaInicioClases(horario.fechaInicioClases);
        setFechaFinClases(horario.fechaFinClases);
        setEstadoHorario(horario.estadoHorario);
        setNotificacionCambioHorario(horario.notificacionCambioHorario);
        
        
        
    }
    window.setTimeout(function(){
        document.getElementById('Nombre').focus();
    }, 500);
    setShowModal(true);
  };

  const validar = () =>{
    if (diaSemana === '') {
        show_alert('Seleccione el dia de la Semana', 'error');
    }
    if (horaInicio === '') {
        show_alert('seleccione la hora de inicio', 'error');
    }
    if (horaFin === '') {
        show_alert('seleccione la hora de fin', 'error');
    }
    if (DuracionClaseMinutos === '') {
        show_alert('digita la duracion de la clse en minutos', 'error');
    }
    if (periodoAcademico === '') {
        show_alert('seleccione el periodo academico', 'error');
    }
    
    if (grupoSeccion === '') {
        show_alert('Escribe El grupo de seccion', 'error');
    }
    if (fechaInicioClases === '') {
      show_alert('Seleccione la fecha Inicio de la clase', 'error');
  }
  if (fechaFinClases === '') {
    show_alert('Seleccione la fecha fin de la clase', 'error');
}
if (estadoHorario === '') {
  show_alert('seleccione el estado del horario', 'error');
}
    else {
        let parametros;
        let metodo;

        if (operation === 1) {
            parametros = { 
              horarioId: horarioId,
               diaSemana: diaSemana, 
                horaInicio: horaInicio, 
                horaFin: horaFin, 
                duracion: DuracionClaseMinutos, 
                periodoAcademico: periodoAcademico,
                grupoSeccion: grupoSeccion, 
                fechaInicioClases: fechaInicioClases, 
                fechaFinClases: fechaFinClases, 
                estadoHorario: estadoHorario, 
                notificacionCambioHorario: notificacionCambioHorario,
                docenteId: DocenteId
            };
            metodo = "POST";
            
        }else{
            parametros = { 
              horarioId: horarioId,
              diaSemana: diaSemana, 
               horaInicio: horaInicio, 
               horaFin: horaFin, 
               duracion: DuracionClaseMinutos, 
               periodoAcademico: periodoAcademico,
               grupoSeccion: grupoSeccion, 
               fechaInicioClases: fechaInicioClases, 
               fechaFinClases: fechaFinClases, 
               estadoHorario: estadoHorario, 
               notificacionCambioHorario: notificacionCambioHorario,
                docenteId: DocenteId, 
            };
            metodo = "PUT";
        }
        enviarSolicitud(metodo, parametros);
        cerrarModal();
    }
  };
  const handleDelete = async (horarioId) => {
    try {
      await axios.delete(`https://localhost:7284/api/horario/${horarioId}`);
      setHorario((prevHorario) => prevHorario.filter((d) => d.horarioId !== horarioId));
    } catch (error) {
      console.error('Error al eliminar Horario', error);
    }
  };
  const enviarSolicitud = async (metodo, parametros) => {
    try {
        let respuesta;
        if (metodo === "POST") {
            respuesta = await axios.post(URL, parametros)
        }else if (metodo === "PUT") {
            respuesta = await axios.put(`${URL}/${horarioId}`, parametros)
        }
        console.log(`Solicitud ${metodo.toUpperCase()} exitosa:`, respuesta.data);
        const mensajeExito = operation === 1 ? 'Horario Añadido exitasamente' : 'horario editado con exito';
        show_alert(mensajeExito, 'success');
        document.getElementById('btnCerrar').click();
        getHorario();
    }catch (error) {
        show_alert('Eror de Solicitud', 'error');
        console.error('Error al enviar solicitud', error);
    }
  }

  const deleteAula = ( horarioId, nombreNumero) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: '¿Está seguro que desea eliminar el Horario?',
        text: `La Horario será eliminado permanentemente`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed){
            try{
                await axios.delete(`${URL}/${horarioId}`);
                show_alert('Horario eliminado con éxito', 'success')
                document.getElementById('btnCerrar').click();
                getHorario();
                setContadorHorario(contadorHorario - 1);
            }catch (error){
                show_alert('Error al eliminar el horario', 'error');
                console.error('Error al eliminar el horario', error);
            }
        }else {
            show_alert('El horario no fue eliminada', 'info');
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
				<a href="# " className="float-left show-nav-lateral">
					<i className="fas fa-exchange-alt"></i>
				</a>
				<a href="/Secretariaactualizar">
					<i className="fas fa-user-cog"></i>
				</a>
				<a href="# " className="btn-exit-system">
					<i className="fas fa-power-off"></i>
				</a>
			</nav>

			<div className="full-box page-header">
                <h3 className="text-left">
                    <i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE HORARIOS
                </h3>
                <p className="text-justify">
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
                        <a><i className="fas fa-plus fa-fw"></i> Añadir Horario nueva</a>
                    </div>
                    </li>
                    <li>
                        <a className="active" href="/SecretariaHorariosbuscar"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE HORARIO</a>
                    </li>
                    <li>
                        <a style={{color: 'black'}} href="/SecretariaHorariosbuscar"><i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR HORARIO</a>
                    </li>
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
								<th>DIA DE LA SEMANA</th>
                <th>HORA DE INICIO</th>
								<th>HORA DE FIN</th>
								<th>PERIODO ACADEMICO</th>
                <th>GRUPO SECCION</th>
                <th>FECHA DE INICIO DE CLASES</th>
                <th>FECHA DE FIN DE CLASES</th>
                <th>ESTADO DEL HORARIO</th>
                {/*<th>DURACION DE LA CLASE EN MINUTOS</th>*/}
                <th>CAMBIOS EN EL HORARIO</th>
								<th>ELIMINAR / ACTUALIZAR</th>
							</tr>
						</thead>
						<tbody className="table-group-divider">
							{horario.map((horario, i) =>( 
							<tr className="text-center"  key={horario.horarioId}>
								<td>{i+1}</td>
								<td>{horario.diaSemana}</td>
                <td>{horario.horaInicio}</td>
								<td>{horario.horaFin}</td>
								<td>{horario.periodoAcademico}</td>
                <td>{horario.grupoSeccion}</td>
                <td>{horario.fechaInicioClases}</td>
                <td>{horario.fechaFinClases}</td>
                <td>{horario.estadoHorario}</td>
                {/*<td>{horario.duracionclaseminutos}</td>*/}
                <td>{horario.notificacionCambioHorario}</td>
								<td>
								<button onClick={() => openModal(2, horario)} className="btn btn-success" data-toggle='modal' data-target='#ModalAula'>
                          <i className="fas fa-edit"></i>
                        </button>
									 / &nbsp;
									<button onPress={() => handleDelete(horario.horarioId)} onClick={() => deleteAula(horario.horarioId)} className="btn btn-danger">
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
                <span className="input-group-text"><i className="fas fa-calendar-week"></i>Dia de la semana</span>
                            <select className="form-select" value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)}>
                                <option value="">Seleccione dia de la semana:</option>
                                <option value="Lunes">Lunes </option>
                                <option value="Martes">Martes </option>
                                <option value="Miercoles">Miercoles </option>
                                <option value="Jueves">Jueves </option>
                                <option value="Viernes">Viernes </option>

                            </select>
                        </div>
                    {/*<div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-clock"></i>Hora de inicio</span>
                      <input
                        type="time"
                        id="horainicio"
                        className="form-control"
                        placeholder="Hora de inicio"
                        value={horaInicio}
                        onChange={(e) => {setHoraInicio(e.target.value)}}
                      />
                    </div>
                    
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-clock"></i>Hora de fin</span>
                      <input
                        type="time"
                        id="horafin"
                        className="form-control"
                        placeholder="Hora de fin"
                        value={horaFin} 
                        onChange={(e) => {setHoraFin(e.target.value)}}
                        />
                      
              </div>*/}
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-hourglass-half"></i>Duracionde la clase en minutos</span>
                      <input
                        type="text"
                        id="Nombre"
                        className="form-control"
                        placeholder=""
                        value={DuracionClaseMinutos} 
                        onChange={(e) => {setDuracion(e.target.value)}}
                        />
                      
                    </div>
                    <div className="input-group mb-3">
                <span className="input-group-text"><i className="fas fa-sort-numeric-up-alt"></i>Periodo academico</span>
                            <select className="form-select" value={periodoAcademico} onChange={(e) => setPeriodoAcademico(e.target.value)}>
                                <option value="">Seleccione el periodo academico:</option>
                                <option value="periodo uno">periodo uno </option>
                                <option value="periodo dos">periodo dos </option>
                                <option value="periodo tres">periodo tres</option>
                                <option value="periodo cuatro">periodo cuatro</option>
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
                  <span className="input-group-text"><i className="fas fa-layer-group"></i></span>
                        <input
                        type="text"
                        id="notasadicionales"
                        className="form-control"
                        placeholder="Grupo seccion"
                        value={grupoSeccion}
                        onChange={(e) => setGrupoSeccion(e.target.value)}
                      />
                      </div>
                      <div className="input-group mb-3">
                      <span className="input-group"><i className="far fa-calendar-check"></i>Hora de inicio de clase</span>
                      <input
                        type="datetime-local"
                        id="horafin"
                        className="form-control"
                        placeholder="Hora de Inicio de clase"
                        value={fechaInicioClases} 
                        onChange={(e) => {setFechaInicioClases(e.target.value)}}
                        />
                      
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group"><i className="far fa-calendar-times"></i>Hora de fin de clase</span>
                      <input
                        type="datetime-local"
                        id="horafin"
                        className="form-control"
                        placeholder="Hora de fin de clase"
                        value={fechaFinClases} 
                        onChange={(e) => {setFechaFinClases(e.target.value)}}
                        />
                      
                    </div>
                    <div className="input-group mb-3">
                <span className="input-group-text"><i className="fab fa-pushed"></i>Estado del Horario </span>
                            <select className="form-select" value={estadoHorario} onChange={(e) => setEstadoHorario(e.target.value)}>
                                <option value="">Seleccione el estado del horario :</option>
                                <option value="activo">activo </option>
                                <option value="Inactivo">Inactivo  </option>
                                
                            </select>
                        </div>  
                        <div className="input-group mb-3">
                <span className="input-group-text"><i className="fas fa-exchange-alt"></i> ¿realizaste cambios en el horario? </span>
                            <select className="form-select" value={notificacionCambioHorario} onChange={(e) => setNotificacionCambioHorario(e.target.value)}>
                                <option value="">Seleccione si o no :</option>
                                <option value="si">si </option>
                                <option value="no">no  </option>
                                
                            </select>
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
