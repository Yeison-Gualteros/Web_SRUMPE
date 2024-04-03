import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Secretariadocentebuscar() {
    const [searchTerm, setSearchTerm] = useState('');
    const url = 'https://localhost:7284/api/Docente'
    const [docente, setDocente] = useState([]);
    const [docenteId, setDocenteId] = useState('');
    const [nombreNumero, setNombreNumero] = useState('');
    const [cursosAsignados, setcursosAsignados]=useState('');
    const [horarioclase, setHorarioclase] = useState('');
   const [adjuntardocumentos, setadjuntardocumentos] = useState('');
    const [tipoPersona, setTipoPersona] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [tituloAcademico, setTituloAcademico] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('');
  const [estadoLaboral, setEstadoLaboral] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [comentariosNotas, setComentariosNotas] = useState('');
  const [nivelExperiencia, setNivelExperiencia] = useState('');
  const [numeroIdentificacionOriginal, setNumeroIdentificacionOriginal] = useState('');
  const [, setError] = useState('');
    const [, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    //const url4 = 'https://localhost:7284/api/aula';
    //const [aulas, setAula] = useState([]);
    //const [aulaId, setAulaId] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');
    const url2 = 'https://localhost:7284/api/cursos';
  const [curso, setCursos] = useState([]);
const [cursoId, setCursoId] = useState('');
  const url3 = 'https://localhost:7284/api/materia'
  const [materia, setMateria] = useState([]);
const [MateriaId, setMateriaId] = useState('');
  useEffect(() => {
        getDocente();
    }, []);
    const getDocente = async () => {
        const respuesta = await axios.get(url);
        setDocente(respuesta.data);
        getCursos(respuesta.data);
        getMateria(respuesta.data);
        //getAula(respuesta.data);
    }
  useEffect(() => {
    fetch(url2)
      .then((response) => response.json())
      .then((data) => setCursos(data))
      .catch((error) => console.error('Error fetching cursos:', error));
  }, []);

  {/*useEffect(() => {
    fetch(url4)
      .then((response) => response.json())
      .then((data) => setAula(data))
      .catch((error) => console.error('Error fetching cursos:', error));
  }, []);*/}
  useEffect(() => {
    fetch(url3)
      .then((response) => response.json())
      .then((data) => setMateria(data))
      .catch((error) => console.error('Error fetching materias:', error));
  }, []);
    
    const getCursos = async () => {
        const response = await axios.get('https://localhost:7284/api/cursos');
        setCursos(response.data);
    }
    const getMateria = async () => {
        const response = await axios.get('https://localhost:7284/api/materia');
        setMateria(response.data);
    }
    {/*const getAula = async () => {
        const response = await axios.get('https://localhost:7284/api/aula');
        setAula(response.data);
    }*/}
    const cerrarModal = () => {
        const modal = document.getElementById('ModalDocente');
        modal.classList.remove('show'); // Eliminar la clase 'show' para ocultar el modal
        modal.setAttribute('aria-hidden', 'true'); // Asegurarse de que el modal esté marcado como oculto para accesibilidad
        document.body.classList.remove('modal-open'); // Eliminar la clase 'modal-open' del body para permitir el scroll nuevamente
        const modalBackdrop = document.querySelector('.modal-backdrop'); // Eliminar el backdrop del modal si existe
        if (modalBackdrop) {
            document.body.removeChild(modalBackdrop);
        }
        setShowModal(false);
    };
    
    const openModal = (op, docente) => {
        setOperation(op);
        if (op === 1) {
            setTitle('Registrar Docente');
            setDocenteId('');
            setNombres('');
            setApellidos('');
            setNumeroTelefono('');
            setcursosAsignados('');
            setNumeroIdentificacion('');
            setGenero('');
            setFechaNacimiento('');
            setDireccion('');
            setCorreoElectronico('');
            setFechaContratacion('');
            setEstadoLaboral('');
            setNivelExperiencia('');
            setHorarioclase('');
            setComentariosNotas('');
            setTipoPersona('');
            //setAulaId('');
            setCursoId('');
            setMateriaId('');
            setadjuntardocumentos('');
            setTipoDocumento('');
            setNombreNumero('');
            setTituloAcademico('');
        }
        if (op === 2) {
            setTitle('Editar Docente');
            setDocenteId(docente.docenteId);
            setNombres(docente.nombres);
            setApellidos(docente.apellidos);
            setNumeroTelefono(docente.numeroTelefono);
            setcursosAsignados(docente.cursosAsignados);
            setNumeroIdentificacion(docente.numeroIdentificacion);
            setGenero(docente.genero);
            setFechaNacimiento(docente.fechaNacimiento);
            setDireccion(docente.direccion);
            setCorreoElectronico(docente.correoElectronico);
            setFechaContratacion(docente.fechaContratacion);
            setEstadoLaboral(docente.estadoLaboral);
            setNivelExperiencia(docente.nivelExperiencia);
            setHorarioclase(docente.horarioclase);
            setComentariosNotas(docente.comentariosNotas);
            setTipoPersona(docente.tipoPersona);
            //setAulaId(docente.aulaId);
            setCursoId(docente.cursoId);
            setMateriaId(docente.MateriaId);
            setadjuntardocumentos(docente.adjuntardocumentos);
            setTipoDocumento(docente.tipoDocumento);
            setNombreNumero(docente.nombreNumero);
            setTituloAcademico(docente.tituloAcademico);
            setNumeroIdentificacionOriginal(docente.numeroIdentificacionOriginal);
        }
        window.setTimeout(function () {
            document.getElementById('Nombre').focus();
        }, 500);
        setShowModal(true);
        
    };
    
    
    const validar = () => {
        

        if ( nombres === '') {
            show_alert('porfavor escribe el nombre del docente', 'error');
        }
        if (apellidos === '') {
            show_alert('porfavor escribe el apellido del docente', 'error');
        }
        if (!fechaNacimiento) {
            setError('Por favor, seleccione la fecha de nacimiento del docente.');
        } else {
            const fechaSeleccionada = new Date(fechaNacimiento);
            const fechaHace18Anios = new Date();
            fechaHace18Anios.setFullYear(fechaHace18Anios.getFullYear() - 18);

            if (fechaSeleccionada > fechaHace18Anios) {
                setError('El docente debe ser mayor de 18 años.');
            } else {
                setError('');
                // Aquí puedes realizar cualquier otra acción de envío o procesamiento
            }
        }
        if (numeroTelefono === '') {
            show_alert('porfavor escribe el numero de telefono del docente', 'error');
        }
        if (direccion === '') {
            show_alert('porfavor escribe la direccion del docente', 'error');
        }
        if (tituloAcademico === '' ) {
            show_alert('porfavor escribe el titulo académico del docente', 'error');
        }
        if (correoElectronico === '') {
            show_alert('porfavor escribe el correo electronico del docente', 'error');
        }
        if (tipoPersona === '') {
            show_alert('porfavor escribe el tipo de persona del docente', 'error');
        }
        if (fechaContratacion === '0') {
            show_alert('porfavor seleccione la fecha de contratacion del docente', 'error');
        }  
        if (cursosAsignados === '') { 
            show_alert('porfavor seleccione al menos un curso del docente', 'error');           
        }
        if (genero === '') {
            show_alert('porfavor seleccione el genero del docente', 'error');
        }
        if (nivelExperiencia === '') {
            show_alert('porfavor seleccione el nivel de experiencia del docente', 'error');
        }
        if (estadoLaboral === '') {
            show_alert('porfavor seleccione el estado laboral del docente', 'error');
        }
        if (comentariosNotas === ''){
            show_alert('porfavor escribe un comentario sobre el docente', 'error');
        }
        if (numeroIdentificacion === '') { 
          show_alert('Por favor escribe el numero de identificacion del docente', 'error');
      } 
      else if (operation === 2 && numeroIdentificacion !== numeroIdentificacionOriginal) {
          show_alert('El número de identificación no se puede cambiar', 'error');
      }
        
    else{
            let parametros;
            let metodo;
    
            if (operation === 1) {
                parametros = { 
                    nombres: nombres, 
                    numeroTelefono: numeroTelefono, 
                    cursosAsignados: cursosAsignados, 
                    numeroIdentificacion: numeroIdentificacion,
                    genero: genero,
                    direccion: direccion,
                    estadoLaboral: estadoLaboral,
                    horarioClases: horarioclase,
                    comentariosNotas: comentariosNotas,
                    nivelExperiencia: nivelExperiencia,
                    correoElectronico: correoElectronico,
                    apellidos: apellidos,
                    tipoDocumento: tipoDocumento,
                    tipoPersona: tipoPersona,
                    fechaContratacion: fechaContratacion,
                    adjuntardocumentos: adjuntardocumentos,
                    nombreNumero: nombreNumero,
                    tituloAcademico: tituloAcademico,
                    
                };
                metodo = "POST";
            } else {
                parametros = { 
                    nombres: nombres, 
                    numeroTelefono: numeroTelefono, 
                    cursosAsignados: cursosAsignados, 
                    numeroIdentificacion: numeroIdentificacion,
                    genero: genero,
                    direccion: direccion,
                    estadoLaboral: estadoLaboral,
                    horarioClases: horarioclase,
                    comentariosNotas: comentariosNotas,
                    nivelExperiencia: nivelExperiencia,
                    correoElectronico: correoElectronico,
                    apellidos: apellidos,
                    tipoDocumento: tipoDocumento,
                    tipoPersona: tipoPersona,
                    fechaContratacion: fechaContratacion,
                    adjuntardocumentos: adjuntardocumentos,
                    nombreNumero: nombreNumero,
                    tituloAcademico: tituloAcademico,
                    numeroIdentificacionOriginal: numeroIdentificacionOriginal, 
                    
                };
                metodo = "PUT";
            }
            enviarSolicitud(metodo, parametros);
            cerrarModal();
    }
        
    };
    const handleDelete = async (docenteId) => {
        try {
          await axios.delete(`https://localhost:7284/api/docente/${docenteId}`);
          setDocente((prevDocentes) => prevDocentes.filter((d) => d.docenteId !== docenteId));
        } catch (error) {
          console.error('Error al eliminar docente', error);
        }
      };
    const enviarSolicitud = async (metodo, parametros) => {
        try{
        let respuesta;
        if (metodo === "POST") {
            respuesta = await axios.post(url, parametros);
        }else if (metodo === "PUT") {
            respuesta = await axios.put(`${url}/${docenteId}`, parametros);
        }
        console.log(`Solicitud ${metodo.toUpperCase()} exitosa:`, respuesta.data);
      const mensajeExito = operation === 1 ? 'Docente añadido exitosamente' : 'Docente editado con éxito';
      show_alert(mensajeExito, 'success');
      document.getElementById('btnCerrar').click();
      getDocente();
        }catch (error) {
            show_alert('Error de solicitud', 'error');
            console.error(error);
    }}
    
    const deleteDocente = (docenteId, nombre) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: '¿Está seguro que desea eliminar el Docente?',
          text: `No se podra dar marcha atras`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await axios.delete(`${url}/${docenteId}`);
              show_alert("Docente eliminado con éxito", "success");
              document.getElementById("btnCerrar").click();
              getDocente();
            }catch (error){
              show_alert("Error de solucitud", "error");
              console.log(error);
            }
          }else {
            show_alert("el Docente no fue eliminado", "info");
          }
        });
      };

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const filteredDocente = docente.filter((docente) => {
        const fullName = `${docente.nombres} ${docente.apellidos} ${docente.numeroTelefono} ${docente.numeroIdentificacion}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });
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
                    <i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR PROFESOR/A
                </h3>
                <p className="text-justify">
                </p>
            </div>
            <div className="container-fluid">
                <ul className="full-box list-unstyled page-nav-tabs">
                    
                    <li>
                        <a style={{color: 'black'}} href="/secretariadocentelista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE PROFESEORES</a>
                    </li>
                    <li>
                        <a className="active" href="/Secretariadocentelista"><i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR PROFESOR/A</a>
                    </li>
                </ul>
            </div>
            
            
            <div className="container-fluid">
                <form className="form-neon" onSubmit={(e) => e.preventDefault()}>
                    <div className="container-fluid">
                        <div className="row justify-content-md-center">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="inputSearch" className="frome bmd-label-floating">¿Qué Profesor/a estas buscando?</label>
                                    <input type="text" className="form-control" name="busqueda-" id="inputSearch" maxLength="30" value={searchTerm} onChange={handleSearchChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <p className="text-center" style={{marginTop: "40px"}}>
                                    <button type="submit" className="btn btn-raised btn-info" onClick={getDocente}><i className="fas fa-search"></i> &nbsp; BUSCAR</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            
            


            <div className="container-fluid">
				<div className="table-responsive">
					<table className="table table-dark table-sm">
						<thead>
							<tr className="text-center roboto-medium">
								<th>#</th>
								<th>NOMBRE</th>
                                <th>APELLIDOS</th>
								<th>NUMERO TELEFONO</th>
								<th>NUMERO IDENTIFICACION</th>
                                <th>GENERO</th>
								<th>ELIMINAR / ACTUALIZAR</th>
							</tr>
						</thead>
						<tbody className="table-group-divider">
							{filteredDocente.map((docente, i) =>( 
							<tr className="text-center"  key={docente.DocenteId}>
								<td>{i+1}</td>
								<td>{docente.nombres}</td>
                                <td>{docente.apellidos}</td>
								<td>{docente.numeroTelefono}</td>
								<td>{docente.numeroIdentificacion}</td>
                                <td>{docente.genero}</td>
								<td>
								<button onClick={() => openModal(2, docente)} className="btn btn-success" data-toggle='modal' data-target='#ModalDocente'>
                          <i className="fas fa-edit"></i>
                        </button>
									 / &nbsp;
									<button onPress={() => handleDelete(docente.docenteId)} onClick={() => deleteDocente(docente.docenteId, docente.nombres, docente.numeroTelefono, docente.cursosAsignados, docente.numeroIdentificacion, docente.apellidos)} className="btn btn-danger">
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
    <div id="ModalDocente"  className="modal fade " aria-hidden="true">
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
                        placeholder="NOMBRE"
                        value={nombres}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const regex = /^[a-zA-Z\s]*$/; // Expresión regular para letras y espacios
                            if (regex.test(inputValue)) {
                              setNombres(inputValue);
                            }
                          }}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-signature"></i></span>
                      <input
                        type="text"
                        id="Apellidos"
                        className="form-control"
                        placeholder="APELLIDO"
                        value={apellidos}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const regex = /^[a-zA-Z\s]*$/; // Expresión regular para letras y espacios
                            if (regex.test(inputValue)) {
                              setApellidos(inputValue);
                            }
                          }}
                      />
                    </div>
                    <div className="input-group mb-3">
                    <div className="form-group">
                        <span className="input-group-text"><i className="far fa-calendar-alt center"></i>Fecha de nacimiento: </span>
                        <input 
                        type="date" 
                        id="fecha" 
                        name="fecha" 
                        className="form-control" 
                        value={fechaNacimiento} 
                        max={(new Date()).toISOString().split("T")[0]} // Establecer la fecha máxima como la fecha actual
                        min={(new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())).toISOString().split("T")[0]} // Establecer la fecha mínima como hace 18 años
                        onChange={(e)=>setFechaNacimiento(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-phone-alt"></i></span>
                      <input
                        type="number"
                        id="numeroTelefono"
                        className="form-control"
                        placeholder="Numero de Telefono"
                        value={numeroTelefono}
                        onChange={(e) => setNumeroTelefono(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                      <input
                        type="text"
                        id="Direccion"
                        className="form-control"
                        placeholder="DIRECCION"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                    {/*<div className="input-group mb-3">
                        <span ><i className="far fa-id-card"></i> Tipo Documento</span>
                            <select className="form-select" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                                <option value="">Seleccione Tipo Documento</option>
                                <option value="cedula">C.C</option>
                                <option value="Targeta de Identidad">T.I</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>*/}
                        <div className="input-group mb-3">
                      <span className="input-group-text"><i className="far fa-id-card"></i></span>
                      <input
                        type="number"
                        id="numeroIdentificacion"
                        className="form-control"
                        placeholder="Numero de identificacion"
                        value={numeroIdentificacion}
                        onChange={(e) => setNumeroIdentificacion(e.target.value)}
                      />
                        </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-scroll"></i></span>
                      <input
                        type="text"
                        id="tituloacademico"
                        className="form-control"
                        placeholder="Titulo academico"
                        value={tituloAcademico}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            const regex = /^[a-zA-Z\s]*$/; // Expresión regular para letras y espacios
                            if (regex.test(inputValue)) {
                              setTituloAcademico(inputValue);
                            }
                          }}
                      />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    <input type="email"
                     className="form-control"
                      id="correoElectronico" 
                      placeholder="Dirección de Electrónico"
                      value={correoElectronico}
                      onChange={ (e) => setCorreoElectronico (e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                            <select className="form-select" value={tipoPersona} onChange={(e) => setTipoPersona(e.target.value)}>
                                <option value="">Seleccione Docente:</option>
                                <option value="Docente Nuevo">Docente Nuevo</option>
                                <option value="Docente Antiguo">Docente Antiguo</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                        <div className="form-group">
                            <span className="input-group-text"><i className="far fa-calendar-alt center"></i>Fecha de contratación: </span>
                            <input 
                            type="date" 
                            id="fecha" 
                            name="fecha" 
                            className="form-control" 
                            value={fechaContratacion} 
                            max={(new Date()).toISOString().split("T")[0]} // Establecer la fecha máxima como la fecha actual
                            onChange={(e)=>setFechaContratacion(e.target.value)}
                            />
                        </div>
                        </div>
                     
                <div className="input-group mb-3"> 
                    <div className="form-group">
                    <span className="input-group-text"><i className="fas fa-clipboard-list fa-fw"></i> <span> </span> Cursos</span>
                    <select
  className="form-control"
  name="item_estado"
  id="item_estado"
  value={cursoId} // Aquí debes utilizar selectedCursoID en lugar de descripcion
  onChange={(e) => setCursoId(e.target.value)}
>
  <option value="" disabled>
    Seleccione un Curso
  </option>
  {curso.map((curso) => (
    <option key={curso.cursoId} value={curso.cursoId}>
      {curso.descripcion}
    </option>
  ))}
</select>
                    </div>
  </div>
                
                
                {/*} <div className="input-group mb-3"> 
                    <div className="form-group">
                    <span className="input-group-text"><i className="fas fa-chalkboard"></i> <span> </span> Aulas</span>
                    <select
                        className="form-control"
                        name="item_estado"
                        id="item_estado"
                        value={aulaId} // Aquí debes utilizar selectedCursoID en lugar de descripcion
                        onChange={(e) => setAulaId(e.target.value)}
                        >
                        <option value="" disabled>
                            Seleccione una Aulas 
                        </option>
                        {aulas.map((aulas) => (
                            <option key={aulas.aulaId} value={aulas.aulaId}>
                            {aulas.nombreNumero}
                            </option>
                        ))}
                        </select>
                    </div>
                        </div>*/}
                
                    
                    <div className="input-group mb-3">
                          <span > <i className="fas fa-venus-mars"></i> Genero</span>
                            <select className="form-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                                <option value="">Seleccione Genero</option>
                                <option value="Maculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                          <span > <i className="fas fa-chalkboard-teacher"></i> Nivel de Experiencia</span>
                          <select 
                                className="form-select" 
                                value={nivelExperiencia} 
                                onChange={(e) => setNivelExperiencia(e.target.value)}
                            >
                                <option value="">Seleccione nivel</option>
                                <option value="Grado 1">Grado 1</option>
                                <option value="Grado 2">Grado 2</option>
                                <option value="Grado 3">Grado 3</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                          <span > <i className="fas fa-chalkboard-teacher"></i> Estado Laboral</span>
                            <select className="form-select" value={estadoLaboral} onChange={(e) => setEstadoLaboral(e.target.value)}>
                                <option value="">Seleccione Estado</option>
                                <option value="Active">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    
                  <div className=" input-group mb-3">
                  <span className="input-group-text"><i className="far fa-comment-dots"></i></span>
                        <input
                        type="text"
                        id="cargadaDocumento"
                        className="form-control"
                        placeholder="Comentarios"
                        value={comentariosNotas}
                        onChange={(e) => setComentariosNotas(e.target.value)}
                      />
                      </div>
                      <div className="input-group mb-3">
                        
                        <input
                        type="text"
                        id="cargadaDocumento"
                        className="form-control"
                        placeholder="Inserto documento (SI O NO)"
                        value={adjuntardocumentos}
                        onChange={(e) => setadjuntardocumentos(e.target.value)}
                      />
</div>
                 <div className="input-group mb-3"> 
                    <div className="form-group">
                    <span className="input-group-text"><i className="fas fa-school"></i> <span> </span> Materia </span>
                    <select
                        className="form-control"
                        name="item_estado"
                        id="item_estado"
                        value={MateriaId} // Aquí debes utilizar selectedCursoID en lugar de descripcion
                        onChange={(e) => setMateriaId(e.target.value)}
                        >
                        <option value="" disabled>
                            Seleccione un Curso
                        </option>
                        {materia.map((materia) => (
                            <option key={materia.MateriaId} value={materia.MateriaId}>
                            {materia.nombre}
                            </option>
                        ))}
                        </select>
                    </div>
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