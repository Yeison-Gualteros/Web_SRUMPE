import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Secretariabuscarestudiante() {

    
  const [searchTerm, setSearchTerm] = useState('');
  const url = 'https://localhost:7284/api/candidatoEstudiante';
  const [candidatoEstudiantes, setCandidatoEstudiantes] = useState([]);
  const [candidatoEstudianteId, setCandidatoEstudianteId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoPersona, setTipoPersona] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [adjuntarDocumentos, setAdjuntarDocumentos] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [numeroIdentificacionAcudiente, setNumeroIdentificacionAcudiente] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');
  const [NombreAcudienteRelacionado, setNombreAcudienteRelacionado] = useState('');
  const [, setShowModal] = useState(false); 
  
  useEffect(() => {
    getCandidatoEstudiantes();
  }, []);
  
  const getCandidatoEstudiantes = async () => {
    try {
      const response = await axios.get(url);
      setCandidatoEstudiantes(response.data);
    } catch (error) {
      console.error('Error fetching candidatoEstudiantes:', error);
    }
  };

  const cerrarModal = () => {
    const modal = document.getElementById('ModalCandidatoEstudiante');
    modal.classList.remove('show'); // Eliminar la clase 'show' para ocultar el modal
    modal.setAttribute('aria-hidden', 'true'); // Asegurarse de que el modal esté marcado como oculto para accesibilidad
    document.body.classList.remove('modal-open'); // Eliminar la clase 'modal-open' del body para permitir el scroll nuevamente
    const modalBackdrop = document.querySelector('.modal-backdrop'); // Eliminar el backdrop del modal si existe
    if (modalBackdrop) {
        document.body.removeChild(modalBackdrop);
    }
    setShowModal(false);
};
  const openModal = (op, candidatoEstudiante) => {
    setOperation(op);
    if (op === 1) {
      setTitle('Registrar Estudiante');
      setCandidatoEstudianteId('');
      setNombre('');
      setApellido('');
      setNumeroContacto('');
      setDireccion('');
      setGenero('');
      setTipoPersona('');
      setFechaNacimiento('');
      setTipoDocumento('');
      setNumeroDocumento('');
      setAdjuntarDocumentos('');
      setNumeroIdentificacionAcudiente('');
      setNombreAcudienteRelacionado('');
      
    } else if (op === 2) {
      setTitle('Editar Estudiante');
      setCandidatoEstudianteId(candidatoEstudiante.candidatoEstudianteId);
      setNombre(candidatoEstudiante.nombre);
      setApellido(candidatoEstudiante.apellido);
      setNumeroContacto(candidatoEstudiante.numeroContacto);
      setDireccion(candidatoEstudiante.direccion);
      setGenero(candidatoEstudiante.genero);
      setTipoPersona(candidatoEstudiante.tipoPersona);
      setFechaNacimiento(candidatoEstudiante.fechaNacimiento);
      setTipoDocumento(candidatoEstudiante.tipoDocumento);
      setNumeroDocumento(candidatoEstudiante.numeroDocumento);
      setAdjuntarDocumentos(candidatoEstudiante.adjuntarDocumentos);
      setNumeroIdentificacionAcudiente(candidatoEstudiante.numeroIdentificacionAcudiente);
      setNombreAcudienteRelacionado(candidatoEstudiante.NombreAcudienteRelacionado); 
    }
    window.setTimeout(function () {
      document.getElementById('Nombre').focus();
    }, 500);
    setShowModal(true);
  };
  
  const validar = () => {
    if (nombre.trim() === '' || apellido.trim() === '' ||  direccion.trim() === '' ) {
      show_alert('Todos los campos son obligatorios', 'error');
    }else {
      let parametros;
      let metodo;
      if (operation === 1) {
        parametros = {
          nombre,
          apellido,
          numeroContacto: parseInt(numeroContacto),
          direccion,
          genero,
          tipoPersona,
          fechaNacimiento,
          tipoDocumento,
          numeroDocumento,
          adjuntarDocumentos,
          numeroIdentificacionAcudiente,
          NombreAcudienteRelacionado
        };
        metodo = 'post';
      }else{
        parametros = {
          nombre,
          apellido,
          numeroContacto: parseInt(numeroContacto),
          direccion,
          genero,
          tipoPersona,
          fechaNacimiento,
          tipoDocumento,
          numeroDocumento,
          adjuntarDocumentos,
          numeroIdentificacionAcudiente,
          NombreAcudienteRelacionado
        };
        metodo = 'put';
      }
      enviarSolicitud(metodo, parametros);
    }    
      cerrarModal();
    }
    
  const enviarSolicitud = async (metodo, parametros) => {
    try {
      let respuesta;
      if (metodo === 'post') {
        respuesta = await axios.post(url, parametros);
      } else if (metodo === 'put') {
        respuesta = await axios.put(`${url}/${candidatoEstudianteId}`, parametros);
      }
      console.log(`Solicitud ${metodo.toUpperCase()} exitosa:`, respuesta.data);
      const mensajeExito = operation === 1 ? 'Estudiante añadido exitosamente' : 'Estudiante editado con éxito';
      show_alert(mensajeExito, 'success');
      document.getElementById('btnCerrar').click();
      getCandidatoEstudiantes();
    } catch (error) {
      show_alert('Error de solicitud', 'error');
      console.error(error);
    }
  };

    const deleteCandidatoEstudiante = (candidatoEstudianteId, nombre) => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: '¿Está seguro que desea eliminar el estudiante?',
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
            await axios.delete(`${url}/${candidatoEstudianteId}`);
            show_alert("Estudiante eliminado con éxito", "success");
            document.getElementById("btnCerrar").click();
            getCandidatoEstudiantes();
          }catch (error){
            show_alert("Error de solucitud", "error");
            console.log(error);
          }
        }else {
          show_alert("el estudiante no fue eliminado", "info");
        }
      });
    };
    
  useEffect(() => {
	getCandidatoEstudiante();
}, []);

const getCandidatoEstudiante = async () => {
	try {
		const response = await axios.get(url);
		setCandidatoEstudiantes(response.data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

const handleSearchChange = (event) => {
	setSearchTerm(event.target.value);
};

const filteredCandidatoEstudiante = candidatoEstudiantes.filter((estudiante) => {
	const fullName = `${estudiante.nombre} ${estudiante.apellido} ${estudiante.telefono} ${estudiante.direccion}`.toLowerCase();
	return fullName.includes(searchTerm.toLowerCase());
});

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
          <button  className="float-left show-nav-lateral btn btn-dark">
            <i className="fas fa-exchange-alt"></i>
          </button>
          <a href="/Secretariaactualizar">
            <i className="fas fa-user-cog"></i>
          </a>
          <button  className="btn-exit-system btn btn-dark">
            <i className="fas fa-power-off"></i>
          </button>
        </nav>
			<div className="full-box page-header">
				<h3 className="text-left">
					<i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR ESTUDIANTE
				</h3>
				<p className="text-justify">
				</p>
			</div>
			<div className="container-fluid">
				<ul className="full-box list-unstyled page-nav-tabs">
					<li>
						<a style={{color: 'black'}} href="/Secretariaestudiantelista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE ESTUDIANTES</a>
					</li>
					<li>
						<a className="active" href="/Secretariabuscarestudiante"><i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR ESTUDIANTE</a>
					</li>
				</ul>	
			</div>
			<div className="container-fluid">
            <form className="form-neon" onSubmit={(e) => e.preventDefault()}>
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="inputSearch" className="frome bmd-label-floating">¿Qué estudiante estás buscando?</label>
                            <input type="text" className="form-control" name="busqueda-" id="inputSearch" maxLength="30" value={searchTerm} onChange={handleSearchChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <p className="text-center" style={{ marginTop: "40px" }}>
                            <button type="submit" className="btn btn-raised btn-info" onClick={getCandidatoEstudiante}><i className="fas fa-search"></i> &nbsp; BUSCAR</button>
                        </p> 
                    </div>
                </div>
            </form>
            <div className="container-fluid">
                <div className="table-responsive">
                    <table className="table table-dark table-sm">
                        <thead>
                            <tr className="text-center roboto-medium">
                                <th>#</th>
                                <th>NOMBRE</th>
                                <th>APELLIDO</th>
                                <th>NUMERO DE CONTACTO</th>
                                <th>DIRECCION</th>
                                <th>ACTUALIZAR/ELIMINAR</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
							{filteredCandidatoEstudiante.map((CandidatoEstudiante, i) =>( 
							<tr className="text-center"  key={CandidatoEstudiante.candidatoEstudianteId}>
								<td>{i+1}</td>
								<td>{CandidatoEstudiante.nombre}</td>
								<td>{CandidatoEstudiante.apellido}</td>
								<td>{CandidatoEstudiante.numeroContacto}</td>
								<td>{CandidatoEstudiante.direccion}</td>
								<td>
								<button onClick={() => openModal(2, CandidatoEstudiante)} className="btn btn-success" data-toggle='modal' data-target='#ModalCandidatoEstudiante'>
                          <i className="fas fa-edit"></i>
                        </button>
									/&nbsp;
									<button onClick={() => deleteCandidatoEstudiante(CandidatoEstudiante.candidatoEstudianteId, CandidatoEstudiante.nombre)} className="btn btn-danger">
                  <i className="far fa-trash-alt"></i>
                        </button>
								</td>
							</tr>
							))}
						</tbody>
                    </table>
                </div>
            </div>
        </div>
		</section>
	</main>
	<div id="ModalCandidatoEstudiante" className="modal fade " aria-hidden="true">
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
                        placeholder=" NOMBRE"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-signature"></i></span>
                      <input
                        type="text"
                        id="Apellido"
                        className="form-control"
                        placeholder="APELLIDO"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                      />
                    </div>
                        <div className="input-group mb-3">
                            <div className="form-group">
                              <span className="input-group-text"><i className="far fa-calendar-alt center"></i>fecha de nacimiento: </span>
                            <input type="date" id="fecha" name="fecha" className="form-control" value={fechaNacimiento} onChange={(e)=>setFechaNacimiento(e.target.value)}/>
                          </div>
                        </div>
                        <div className="input-group mb-3">
                            <select className="form-select" value={tipoPersona} onChange={(e) => setTipoPersona(e.target.value)}>
                                <option value="">Seleccione Estudiante:</option>
                                <option value="Estudiante Nuevo">Estudiante Nuevo</option>
                                <option value="Estudiante Antiguo">Estudiante Antiguo</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                        <span ><i className="fas fa-id-card"></i> Tipo Documento</span>
                            <select className="form-select" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                                <option value="">Seleccione Tipo Documento</option>
                                <option value="cedula">C.C</option>
                                <option value="Targeta de Identidad">T.I</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-phone-alt"></i></span>
                      <input
                        type="number"
                        id="NumeroContacto"
                        className="form-control"
                        placeholder="Numero Documento"
                        value={numeroDocumento} 
                        onChange={(e) => setNumeroDocumento(e.target.value)}
                      />
                    </div>
                        <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-phone-alt"></i></span>
                      <input
                        type="number"
                        id="NumeroContacto"
                        className="form-control"
                        placeholder="Numero Contacto"
                        value={numeroContacto}
                        onChange={(e) => setNumeroContacto(e.target.value)}
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
                        <div className="input-group mb-3">
                          <span > <i className="fas fa-venus-mars"></i> Genero</span>
                            <select className="form-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                                <option value="">Seleccione Genero</option>
                                <option value="Maculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="mb-3">
                        <input
                        type="text"
                        id="cargadaDocumento"
                        className="form-control"
                        placeholder="Inserto documento (SI O NO)"
                        value={adjuntarDocumentos}
                        onChange={(e) => setAdjuntarDocumentos(e.target.value)}
                      />
</div>
<div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-phone-alt"></i></span>
                      <input
                        type="number"
                        id="NumeroContacto"
                        className="form-control"
                        placeholder="Numero de identificacion del acudiente"
                        value={numeroIdentificacionAcudiente} 
                        onChange={(e) => setNumeroIdentificacionAcudiente(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fas fa-signature"></i></span>
                    <input
                        type="text"
                        id="Nombre"
                        className="form-control"
                        placeholder="Nombre del Acudiente"
                        value={NombreAcudienteRelacionado}
                        onChange={(e) => setNombreAcudienteRelacionado(e.target.value)}
                      />
                    </div>
                    <div className="modal-footer">
                    <button onClick={() => validar()} className="btn btn-outline-success">Guardar</button>
                    <button onClick={()=> cerrarModal()} type='button' id="btnCerrar" className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
      </div>
</div>
</div>
</div>
</div>
            </React.Fragment>
    )
}