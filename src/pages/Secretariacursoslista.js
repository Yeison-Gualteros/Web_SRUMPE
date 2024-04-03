import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { show_alert } from '../functions';
import withReactContent from 'sweetalert2-react-content';

export default function Secretariacursoslista() {
    const url = 'https://localhost:7284/api/cursos';
    const [cursos, setCursos] = useState([]);
    const [cursoId, setCursoId] = useState('');
    const [codigoCurso, setCodigoCurso] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [departamentoAcademico, setDepartamentoAcademico] = useState('');
    const [año, setAño] = useState('');
    const [cupoMaximo, setCupoMaximo] = useState('');
    const [cupoActual, setCupoActual] = useState('');
    const [metodosEnsenanza, setMetodosEnsenanza] = useState('');
    const [nivel, setNivel] = useState('');
    const [estado, setEstado] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [contadorCursos, setContadorCursos] = useState(0);

    useEffect(() => {
        getcursos();
    }, []);

    const getcursos = async () => {
        try {
            const respuesta = await axios.get(url);
            setCursos(respuesta.data);
            setContadorCursos(respuesta.data.length);
        } catch (error) {
            console.error('Error al obtener cursos:', error);
        }
    };

    const opcionesEstado = ['Activo', 'Inactivo'];
    const opcionesNivel = ['Avanzado', 'Intermedio', 'Básico'];
    const opcionesMetodosEnsenanza = ['Virtual', 'Presencial', 'Híbrido'];
    const opcionesModalidad = ['Virtual', 'Presencial', 'Híbrido'];

    useEffect(() => {
      if (showModal) {
        const inputElement = document.getElementById('cursos');
        if (inputElement) {
          inputElement.focus();
        }
      }
    }, [showModal]);

    const openModal = (op, curso) => {
        setOperation(op);
        if (op === 1) {
            setTitle('Registrar curso');
            // Limpia los campos si se abre para registrar
            setCursoId('');
            setCodigoCurso('');
            setDescripcion('');
            setDepartamentoAcademico('');
            setMetodosEnsenanza('');
            setNivel('');
            setEstado('');
            setModalidad('');
            setFechaInicio('');
            setFechaFinalizacion('');
            setAño('');
            setCupoMaximo('');
            setCupoActual('');
        } else if (op === 2) {
            setTitle('Editar curso');
            // Asigna valores del curso si se abre para editar
            setCursoId(curso.cursoId);
            setCodigoCurso(curso.codigoCurso);
            setDescripcion(curso.descripcion);
            setDepartamentoAcademico(curso.departamentoAcademico);
            setMetodosEnsenanza(curso.metodosEnsenanza);
            setFechaInicio(curso.fechaInicio);
            setFechaFinalizacion(curso.fechaFinalizacion);
            setNivel(curso.nivel);
            setEstado(curso.estado);
            setAño(curso.año);
            setModalidad(curso.modalidad);
            setCupoMaximo(curso.cupoMaximo);
            setCupoActual(curso.cupoActual);
        }
        window.setTimeout(() => {
            document.getElementById('codigo').focus();
        }, 500);
        setShowModal(true);
    };

    const validar = () => {
      // Verificar que los campos obligatorios estén llenos
      if (!codigoCurso || codigoCurso.trim() === "") {
        show_alert('Escribe el codigo del curso', 'error');
        return;
      }
      if (!descripcion) {
        show_alert('Escribe la descripción del curso nuevo', 'error');
        return;
      }
      if (!departamentoAcademico) {
        show_alert('Selecciona el departamento académico', 'error');
        return;
      }
  
      if (!año) {
        show_alert('Selecciona el año', 'error');
        return;
      }
  
      
      if (!cupoMaximo) {
        show_alert('Escribe el cupo maximo', 'error');
        return;
      }
      if (!cupoActual) {
        show_alert('Escribe el cupo actual', 'error');
        return;
      }
      if (!metodosEnsenanza) {
        show_alert('Selecciona el metodo de enseñanza', 'error');
        return;
      }
      if (!nivel) {
        show_alert('Selecciona el nivel', 'error');
        return;
      }
  
      if (!estado) {
        show_alert('Selecciona el estado', 'error');
        return;
      }
  
      if (!modalidad) {
        show_alert('Selecciona la modalidad', 'error');
        return;
      }
  
      if (!fechaInicio) {
        show_alert('Selecciona la fecha de inicio', 'error');
        return;
      }
      if (!fechaFinalizacion) {
        show_alert('Selecciona la fecha de finalizacion', 'error');
        return;
      }
      
      let parametros;
      let metodo;

      if (operation === 1) {
        parametros = {
          codigoCurso: codigoCurso,
          descripcion: descripcion,
          departamentoAcademico: departamentoAcademico,
          año: año,
          cupoMaximo: cupoMaximo,
          cupoActual: cupoActual,
          metodosEnsenanza: metodosEnsenanza,
          nivel: nivel,
          estado: estado,
          modalidad: modalidad,
          fechaInicio: fechaInicio,
          fechaFinalizacion: fechaFinalizacion,
          
          cursoId: [cursoId]
        };
        metodo = "POST";
        cerrarModal();
      } else {
        parametros = {
          cursoId: [cursoId],
          
          codigoCurso: codigoCurso,
          descripcion: descripcion,
          departamentoAcademico: departamentoAcademico,
          año: año,
          cupoMaximo: cupoMaximo,
          cupoActual: cupoActual,
          metodosEnsenanza: metodosEnsenanza,
          nivel: nivel,
          estado: estado,
          modalidad: modalidad,
          fechaInicio: fechaInicio,
          fechaFinalizacion: fechaFinalizacion,
          
        };
        metodo = "PUT";
        cerrarModal();
      }
      enviarSolicitud(metodo, parametros);
    };
    const cerrarModal = () => {
      const modal = document.getElementById('modalcursos');
      modal.classList.remove('show'); // Eliminar la clase 'show' para ocultar el modal
      modal.setAttribute('aria-hidden', 'true'); // Asegurarse de que el modal esté marcado como oculto para accesibilidad
      document.body.classList.remove('modal-open'); // Eliminar la clase 'modal-open' del body para permitir el scroll nuevamente
      const modalBackdrop = document.querySelector('.modal-backdrop'); // Eliminar el backdrop del modal si existe
      if (modalBackdrop) {
        document.body.removeChild(modalBackdrop);
      }
      setShowModal(false);
    };
  
    const enviarSolicitud = async (metodo, parametros) => {
      if (metodo === "POST") {
        await axios.post(url, parametros);
        show_alert('El curso ha sido registrada correctamente', 'success');
      }
      if (metodo === "PUT") {
        await axios.put(url + '/' + cursoId, parametros);
        show_alert('El curso ha sido editado correctamente', 'success');
      }
      
    };
  
    const deletecursos = (cursoId, codigoCurso) => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: '¿Estás seguro de eliminar a '+ codigoCurso + '?',
              text: "¡No podrás revertir esto!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`${url}/${cursoId}`);
            show_alert("Curso eliminada exitosamente", "success");
            getcursos();
            setContadorCursos(contadorCursos - 1);
          }catch (error){
            show_alert("No se pudo eliminar el curso", "error");
          }
        }else {
          show_alert("El curso no fue elimino", "info")
        }
      })
    }
  
    return (
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
                    <i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE CURSOS
                </h3>
                
                <p className="text-justify">
                    
        <p>Total de Cursos registrados: {contadorCursos}</p>
        
      
                </p>
            </div>
            <div className="container-fluid">
                <ul className="full-box list-unstyled page-nav-tabs">
                    <li>
                      <div
                        onClick={() => openModal(1)}
                        data-toggle="modal"
                        data-target="#modalcursos" // Corregido el target
                    >
                        <a href='#'><i className="fas fa-plus fa-fw"></i>&nbsp;  Añadir Curso nuevo</a>
                    </div>
                    </li>
                   
                    
                    <li>
                        <a style={{color: 'black'}} href="/Secretariacursobuscar"><i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR CURSO</a>
                    </li>
                    
                </ul>
            </div>
            
            
            
            
			 <div className="container-fluid">
			 <div className="table-responsive">
					
					<table className="table table-dark table-sm">
						<thead>
							<tr className="text-center roboto-medium">
								<th>#</th>
								<th>CODIGO</th>
								<th>DESCRIPCION</th>
                <th>DEPARTAMENTO ACADEMICO</th>
                <th>NIVEL</th>
                <th>METODO DE ENSEÑANZA</th>
                <th>AÑO</th>
                <th>CUPO MAXIMO</th>
                <th>CUPO ACTUAL</th>
                <th>ESTADO</th>
                <th>MODALIDAD</th>
                <th>FECHA INICIO</th>
                <th>FECAH FINALIZACION</th>
								<th>ACTUALIZAR/ELIMINAR</th>
								 
							</tr>
						</thead>
						<tbody className="table-group-divider">
              {cursos.map((cursos, i) => (
                  <tr className="text-center" key={cursos.cursoId}> 
                      <td><span className="table-index">{i + 1}</span></td>
                      <td><span className="table-codigo">{cursos.codigoCurso}</span></td>
                      <td><span className="table-descripcion">{cursos.descripcion}</span></td>
                      <td><span className="table-departamento">{cursos.departamentoAcademico}</span></td>
                      <td><span className="table-nivel">{cursos.nivel}</span></td>
                      <td><span className="table-metodos">{cursos.metodosEnsenanza}</span></td>
                      <td><span className="table-año">{cursos.año}</span></td>
                      <td><span className="table-cupom">{cursos.cupoMaximo}</span></td>
                      <td><span className="table-cupoa">{cursos.cupoActual}</span></td>
                      <td><span className="table-estado">{cursos.estado}</span></td>
                      <td><span className="table-modalidad">{cursos.modalidad}</span></td>
                      <td><span className="table-fechai">{cursos.fechaInicio}</span></td>
                      <td><span className="table-fechaf">{cursos.fechaFinalizacion}</span></td>
                      <td>
                          <button onClick={() => openModal(2, cursos)} className="btn btn-success" data-toggle='modal' data-target='#modalcursos'>
                              <i className="fas fa-edit"></i>
                          </button>
                          / &nbsp;
                          <button onClick={() => deletecursos(cursos.cursoId, cursos.codigoCurso,cursos.descripcion,cursos.departamentoAcademico,cursos.nivel,cursos.metodosEnsenanza,cursos.año,cursos.cupoMaximo,cursos.cupoActual,cursos.estado,cursos.modalidad,cursos.fechaInicio,cursos.fechaFinalizacion)} className="btn btn-danger">
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
							<a className="page-link" href="# " tabIndex="-1">Anterior</a>
						</li>
						<li className="page-item"><a className="page-link" href="# ">1</a></li>
						<li className="page-item"><a className="page-link" href="# ">2</a></li>
						<li className="page-item"><a className="page-link" href="# ">3</a></li>
						<li className="page-item">
							<a className="page-link" href="# ">Siguiente</a>
						</li>
					</ul>
				</nav>
			</div>
        </section>
    </main>
    
	<div id="modalcursos" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button type="button" className="fas fa-times-circle" aria-label="Close" onClick={cerrarModal}></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="cursos" />
              <div className="input-group mb-3">
                 
              </div>
                    
                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-code-branch"></i></span>
                    <input
                        type="text"
                        id="codigo"
                        className="form-control"
                        placeholder="codigo del curso"
                        value={codigoCurso} 
                        onChange={(e) => setCodigoCurso(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="far fa-newspaper"></i></span>
                    <input
                        type="text"
                        id="descripcion"
                        className="form-control"
                        placeholder="Descripcion del curso"
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-school"></i></span>
                    <input
                        type="text"
                        id="departamento"
                        className="form-control"
                        placeholder="Departamento Academico"
                        value={departamentoAcademico} 
                        onChange={(e) => setDepartamentoAcademico(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-book-open"></i>¿Cual es el nivel?</span>
                    
                    <select
                        id="nivel"
                        className="form-select"
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                        required  
                    >
                        <option value="">Seleccionar Nivel</option> 
                        {opcionesNivel.map((opcion, index) => (
                            <option key={index} value={opcion}>
                                {opcion}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="fas fa-book-open"></i>¿Cual es su estado?</span>
                  
                  <select
                      id="estado"
                      className="form-select"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      required  
                  >
                      <option value="">Seleccionar Estado</option> 
                      {opcionesEstado.map((opcion, index) => (
                          <option key={index} value={opcion}>
                              {opcion}
                          </option>
                      ))}
                  </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fas fa-chalkboard"></i>¿Cual es la modalidad?</span>
                
                <select
                    id="modalidad"
                    className="form-select"
                    value={modalidad}
                    onChange={(e) => setModalidad(e.target.value)}
                    required  
                >
                    <option value="">Seleccionar Modalidad</option> 
                    {opcionesModalidad.map((opcion, index) => (
                        <option key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            </div>
        
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fas fa-chalkboard"></i>¿Cual es el metodo?</span>
               
                <select
                    id="metodos"
                    className="form-select"
                    value={metodosEnsenanza}
                    onChange={(e) => setMetodosEnsenanza(e.target.value)}
                    required 
                >
                    <option value="">Seleccionar Método</option> 
                    {opcionesMetodosEnsenanza.map((opcion, index) => (
                        <option key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-chalkboard"></i></span>
                    <input
                        type="number"
                        id="año"
                        className="form-control"
                        placeholder="Año"
                        value={año}  
                        onChange={(e) => setAño(e.target.value)}
                      />
                    </div>

          

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-chalkboard"></i></span>
                    <input
                        type="number"
                        id="cupom"
                        className="form-control"
                        placeholder="Cupo maximo"
                        value={cupoMaximo}  
                        onChange={(e) => setCupoMaximo(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-chalkboard"></i></span>
                    <input
                        type="number"
                        id="cupoa"
                        className="form-control"
                        placeholder="Cupo actual"
                        value={cupoActual}  
                        onChange={(e) => setCupoActual(e.target.value)}
                      />
                    </div>

                    

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-chalkboard"></i></span>
                    <input
                        type="datetime-local"
                        id="fechai"
                        className="form-control"
                        placeholder="Fecha de inicio"
                        value={fechaInicio}  
                        onChange={(e) => setFechaInicio(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-chalkboard"></i></span>
                    <input
                        type="datetime-local"
                        id="fechaf"
                        className="form-control"
                        placeholder="Fecha de finalizacion"
                        value={fechaFinalizacion}  
                        onChange={(e) => setFechaFinalizacion(e.target.value)}
                      />
                    </div>

                    <div className='d-grid col-6 mx-auto'>
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <button onClick={() => validar()} className='btn btn-success'>Guardar</button>
                    </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                  <div className="d-flex justify-content-center align-items-center h-100">
                  <button onClick={()=> cerrarModal()} type='button' id="btnCerrar" className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                  </div>
                  </div>
                </div>
              </div>
			  
	</div>
    </React.Fragment>

			

        )

}