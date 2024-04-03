import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEstudiantes } from './EstudianteContext';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function Docenteestudiantelista() {
  
  const url = 'https://localhost:7284/api/notas'
  const [notas, setNotas] = useState([]);
  const [notaId, setNotaId] = useState('');
  const [estudiante, setEstudiante] = useState('');//
  const [curso, setCurso] = useState('');//
  const [periodoAcademico, setPeriodoAcademico] = useState('');//
  const [fechaCreacion, setFechaCreacion] = useState('');//
  const [materia, setMateria] = useState('');//
  const [valorNota, setValorNota] = useState('');//
  const [tipoNota, setTipoNota] = useState('');//
  const [descripcionNota, setDescripcionNota] = useState('')//
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  const [notasSeleccionadas, setNotasSeleccionadas] = useState([]);
  const [promedio, setPromedio] = useState(null); // Estado para almacenar el promedio de las notas seleccionadas


  const getnotas = async () => {
    try {
        const respuesta = await axios.get(url);
        setNotas(respuesta.data);
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
    }
  };
  
  useEffect(() =>{
    getnotas();
  }, []);

useEffect(() => {
  if (showModal) {
    const inputElement = document.getElementById('cursos');
    if (inputElement) {
      inputElement.focus();
    }
  }
}, [showModal]);

const openModal = (op, nota) => {
  setOperation(op);
  setShowModal(true);
  if (op === 1) {
    setTitle('Registrar nota');
    // Restablecer todos los campos del formulario para una nueva entrada
    setNotaId('');
    setEstudiante('');
    setCurso('');
    setPeriodoAcademico('');
    setFechaCreacion('');
    setMateria('');
    setValorNota('');
    setTipoNota('');
    setDescripcionNota('');
  }
  if (op === 2) {
    setTitle('Editar Nota');
    // Establecer los valores de los campos del formulario con los valores de la nota seleccionada
    setNotaId(nota.notaId);
    setEstudiante(nota.estudiante);
    setCurso(nota.curso);
    setPeriodoAcademico(nota.periodoAcademico);
    // Establecer el valor de la fecha con el formato correcto
    setFechaCreacion(new Date(nota.fechaCreacion).toISOString().slice(0, 16));
    setMateria(nota.materia);
    setValorNota(nota.valorNota);
    setTipoNota(nota.tipoNota);
    setDescripcionNota(nota.descripcionNota);
  }
  setShowModal(true);
};

const validar = () => {
  // Verificar que los campos obligatorios estén llenos
  if (!estudiante || estudiante.trim() === "") {
    show_alert('Escribe el nombre completo del estudiante', 'error');
    return;
  }
  if (!curso) {
    show_alert('Escribe el curso', 'error');
    return;
  }
  if (!periodoAcademico) {
    show_alert('Selecciona el periodo academico', 'error');
    return;
  }
  if (!fechaCreacion) {
    show_alert('Selecciona la fecha de creacion', 'error');
    return;
  }
  if (!materia) {
    show_alert('escribe la materia', 'error');
    return;
  }
  if (!valorNota) {
    show_alert('Escribe el valor de la nota', 'error');
    return;
  }
  if (!tipoNota) {
    show_alert('Selecciona el tipo de nota', 'error');
    return;
  }
  if (!descripcionNota) {
    show_alert('describe detalladamente la nota', 'error');
    return;
  }

  let parametros;
  let metodo;

  if (operation === 1) {
    parametros = {
      estudiante: estudiante,
      curso: curso,
      periodoAcademico: periodoAcademico,
      fechaCreacion: fechaCreacion,
      materia: materia,
      valorNota: valorNota,
      tipoNota: tipoNota,
      descripcionNota: descripcionNota,
      notaId: [notaId]
    };
    metodo = "POST";
    cerrarModal();
  } else {
    parametros = {
      estudiante: estudiante,
      curso: curso,
      periodoAcademico: periodoAcademico,
      fechaCreacion: fechaCreacion,
      materia: materia,
      valorNota: valorNota,
      tipoNota: tipoNota,
      descripcionNota: descripcionNota,
      notaId: [notaId]
    };
    metodo = "PUT";
    cerrarModal();
  }
  enviarSolicitud(metodo, parametros);
};
const cerrarModal = () => {
  const modal = document.getElementById('modalnotas');
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
    show_alert('Nota Registrada', 'success');
  }
  if (metodo === "PUT") {
    await axios.put(url + '/' + notaId, parametros);
    show_alert('Nota Editada', 'success');
  }
  // Obtener nuevamente los datos de todas las materias después de la operación
  getnotas();
};

const deletecursos = (notaId, estudiante) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: '¿Estás seguro de eliminar la nota de '+ estudiante + '?',
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
        await axios.delete(`${url}/${notaId}`);
        show_alert("Nota eliminada exitosamente", "success");
        getnotas();
      }catch (error){
        show_alert("No se pudo eliminar el alumno", "error");
      }
    }else {
      show_alert("El alumno no fue elimino", "info")
    }
  })
};

const handleCheckboxChange = (e, nota) => {
  if (e.target.checked) {
    // Agregar la nota seleccionada al estado de notas seleccionadas
    setNotasSeleccionadas([...notasSeleccionadas, nota]);
  } else {
    // Eliminar la nota de las notas seleccionadas si se desmarca la casilla de verificación
    setNotasSeleccionadas(notasSeleccionadas.filter(item => item !== nota));
  }
};

// Función para calcular el promedio de las notas seleccionadas
const calcularPromedio = () => {
  // Verificar si hay notas seleccionadas
  if (notasSeleccionadas.length === 0) {
    show_alert('Selecciona al menos una nota para calcular el promedio', 'error');
    return;
  }

  // Calcular el promedio sumando los valores de las notas y dividiendo entre el número de notas
  const totalNotas = notasSeleccionadas.reduce((acc, nota) => acc + nota.valorNota, 0);
  const promedio = totalNotas / notasSeleccionadas.length;

  // Actualizar el estado del promedio
  setPromedio(promedio.toFixed(2)); // Redondear el promedio a dos decimales
};


  return (
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
                                        <a href=" " className="nav-btn-submenu"><i className="fas fa-layer-group fa-fw"></i> &nbsp; Cursos <i className="fas fa-chevron-down"></i></a>
                                        <ul>	
                                            <li>
                                                <a href='/Docenteelegircurso'>
                                                <i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Elegir Cursos
                                                </a>	
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
            </a >
            <a href='/Docenteuserupdate'>
                                <i className="fas fa-user-cog"></i>
                            </a>
            <a href=' ' className="btn-exit-system">
              <i className="fas fa-power-off"></i>
            </a>
          </nav>
          <div className="full-box page-header">
                <h3 className="text-left">
                    <i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE ESTUDIANTES
                </h3>
                <p className="text-justify">
                  {/* Resto del JSX del componente */}
      <button onClick={calcularPromedio} className="btn btn-primary">
        Calcular Promedio
      </button>
      {/* Mostrar el resultado del promedio si está disponible */}
      {promedio !== null && (
        <p>Promedio de las notas seleccionadas: {promedio}</p>
      )}
                </p>
            </div>
            <div className="container-fluid">
                <ul className="full-box list-unstyled page-nav-tabs">
                    <li>
                      <div
                        onClick={() => openModal(1)}
                        data-toggle="modal"
                        data-target="#modalnotas" // Corregido el target
                    >
                        <a><i className="fas fa-plus fa-fw"></i>&nbsp;  Añadir nota/alumno nuevo</a>
                    </div>
                    </li>
                    <li>
                        <a style={{color: 'black'}} href="/Docentebuscarestudiante"><i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR NOTA/ALUMNO </a>
                    </li>
                </ul>
            </div>
          <div className="container-fluid">
            <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
              <table className="table table-dark table-sm">
                <thead>
                  <tr className="text-center roboto-medium">
                    <th>#</th>
                    <th>NOMBRE</th>
                    <th>CURSO</th>
                    <th>PERIODO ACADEMICO</th>
                    <th>FECHA DE CREACION</th>
                    <th>MATERIA</th>
                    <th>VALOR DE LA NOTA</th>
                    <th>TIPO DE NOTA</th>
                    <th>DESCRIPCION NOTA</th>
                    <th>ACTUALIZAR/ELIMINAR</th>
                    <th>SELECCIONAR</th> {/* Agregar columna para seleccionar la fila */}
                  </tr>
                </thead>
                <tbody className="table-group-divider">
              {notas.map((notas, i) => (
                  <tr className="text-center" key={notas.notaId}> 
                      <td><span className="table-index">{i + 1}</span></td>
                      <td><span className="table-estudiante">{notas.estudiante}</span></td>
                      <td><span className="table-curso">{notas.curso}</span></td>
                      <td><span className="table-periodo">{notas.periodoAcademico}</span></td>
                      <td><span className="table-fechac">{notas.fechaCreacion}</span></td>
                      <td><span className="table-materia">{notas.materia}</span></td>
                      <td><span className="table-valorn">{notas.valorNota}</span></td>
                      <td><span className="table-tipon">{notas.tipoNota}</span></td>
                      <td><span className="table-descripcion">{notas.descripcionNota}</span></td>
                      <td>
                          <button onClick={() => openModal(2, notas)} className="btn btn-success" data-toggle='modal' data-target='#modalnotas'>
                              <i className="fas fa-edit"></i>
                          </button>
                          / &nbsp;
                          <button onClick={() => deletecursos(notas.notaId, notas.estudiante,notas.curso,notas.periodoAcademico,notas.fechaCreacion,notas.materia,notas.valorNota,notas.tipoNota,notas.descripcionNota)} className="btn btn-danger">
                              <i className="far fa-trash-alt"></i>
                          </button>
                      </td>
                      <td><input type="checkbox" onChange={(e) => handleCheckboxChange(e, notas)} /></td>
                  </tr>
              ))}
          </tbody>
              </table>
            </div>
            
          </div>
          <div id="modalnotas" className="modal fade" aria-hidden="true">
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
                        id="estudiante"
                        className="form-control"
                        placeholder="Nombre"
                        value={estudiante} 
                        onChange={(e) => setEstudiante(e.target.value)}
                      />
                    </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-sort-numeric-up-alt"></i>
                    </span>
                    <input
                      type="text"
                      id="curso"
                      className="form-control"
                      placeholder="Curso"
                      value={curso}
                      onChange={(e) => setCurso(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-sort-numeric-up-alt"></i>
                    </span>
                    <select
                      id="periodoa"
                      className="form-select"
                      value={periodoAcademico}
                      onChange={(e) => setPeriodoAcademico(e.target.value)}
                    >
                      <option value="">Selecciona el período académico</option>
                      <option value="Periodo uno">Periodo uno</option>
                      <option value="Periodo dos">Periodo dos</option>
                      <option value="Periodo tres">Periodo tres</option>
                      <option value="Periodo cuatro">Periodo cuatro</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-sort-numeric-up-alt"></i>
                    </span>
                    <input
                      type="datetime-local"
                      id="fechac"
                      className="form-control"
                      placeholder="Fecha de creacion"
                      value={fechaCreacion}
                      onChange={(e) => setFechaCreacion(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-sort-numeric-up-alt"></i>
                    </span>
                    <input
                      type="text"
                      id="materia"
                      className="form-control"
                      placeholder="Materia"
                      value={materia}
                      onChange={(e) => setMateria(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-sort-numeric-up-alt"></i>
                    </span>
                    <input
                      type="number"
                      id="valorn"
                      className="form-control"
                      placeholder="Valor de la nota"
                      value={valorNota}
                      onChange={(e) => setValorNota(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-sort-numeric-up-alt"></i>
                    </span>
                    <select
                      id="tipon"
                      className="form-select"
                      value={tipoNota}
                      onChange={(e) => setTipoNota(e.target.value)}
                    >
                      <option value="">Selecciona el tipo de nota</option>
                      <option value="Periodo uno">Examen</option>
                      <option value="Periodo dos">Trabajo practico</option>
                      <option value="Periodo tres">Exposicion</option>
                      <option value="Periodo cuatro">Ensayo</option>
                      <option value="Periodo cuatro">Examen final</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-sort-numeric-up-alt"></i>
                    </span>
                    <input
                      type="text"
                      id="descripcionn"
                      className="form-control"
                      placeholder="Descripcion de nota..."
                      value={descripcionNota}
                      onChange={(e) => setDescripcionNota(e.target.value)}
                    />
                  </div>
                  <div className="d-grid col-6 mx-auto">
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <button onClick={() => validar()} className="btn btn-success">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <button
                      type="button"
                      id="btnCerrar"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}