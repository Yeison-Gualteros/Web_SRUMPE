import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function Secretariabuscaracudiente() {
  const url = 'https://localhost:7284/api/Acudiente';

  const [acudiente, setAcudiente] = useState([]);
  const [acudienteId, setAcudienteId] = useState('');
  const [nombres, setNombre] = useState('');
  const [apellidos, setApellido] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [edad, setEdad] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [relacionConEstudiante, setRelacionConEstudiante] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [searchTerm, setSearchTerm] = useState('');
  
  
  useEffect(() => {
    getAcudiente();
  }, []);
  
  const getAcudiente = async () => {
    try {
      const response = await axios.get(url);
      setAcudiente(response.data);
    } catch (error) {
      console.error('Error fetching acudiente:', error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};
const filteredAcudiente = acudiente.filter((acudiente) => {
	const fullName = `${acudiente.nombres} ${acudiente.apellidos}  `.toLowerCase();
	return fullName.includes(searchTerm.toLowerCase());
});


  const cerrarModal = () => {
    const modal = document.getElementById('ModalAcudiente');
    modal.classList.remove('show'); // Eliminar la clase 'show' para ocultar el modal
    modal.setAttribute('aria-hidden', 'true'); // Asegurarse de que el modal esté marcado como oculto para accesibilidad
    document.body.classList.remove('modal-open'); // Eliminar la clase 'modal-open' del body para permitir el scroll nuevamente
    const modalBackdrop = document.querySelector('.modal-backdrop'); // Eliminar el backdrop del modal si existe
    if (modalBackdrop) {
        document.body.removeChild(modalBackdrop);
    }
    setShowModal(false);
};
  const openModal = (op, Acudiente) => {
    setOperation(op);
    if (op === 1) {
      setTitle('Registrar Acudiente');
      // Restablecer los valores de los campos al abrir el modal para registrar
      setAcudienteId('');
      setNombre('');
      setApellido('');
      setCorreoElectronico('');
      setNumeroIdentificacion('');
      setEdad('');
      setRelacionConEstudiante('');
      setEstadoCivil('');
      setOcupacion('');
      setFechaRegistro('');
    } else if (op === 2) {
      setTitle('Editar Acudiente');
      // Establecer los valores de los campos al abrir el modal para editar
      setAcudienteId(Acudiente.acudienteId);
      setNombre(Acudiente.nombres);
      setApellido(Acudiente.apellidos);
      setCorreoElectronico(Acudiente.correoElectronico);
      setNumeroIdentificacion(Acudiente.numeroIdentificacion);
      setEdad(Acudiente.edad);
      setRelacionConEstudiante(Acudiente.relacionConEstudiante);
      setEstadoCivil(Acudiente.estadoCivil);
      setOcupacion(Acudiente.ocupacion);
      setFechaRegistro(Acudiente.fechaRegistro);
    }
    // Enfocar el primer campo después de un breve retraso para asegurar que el enfoque ocurra después de que el modal esté completamente abierto
    window.setTimeout(function () {
      document.getElementById('Nombre').focus();
    }, 500);
    setShowModal(true);
  };
  
  const validar = () => {
    if (nombres === '' ) {
      show_alert('El campo Nombre es obligatorio', 'info');
      
    }if (apellidos === ''){
      show_alert('El campo Apellido es obligatorio', 'info');
    }if (correoElectronico === '') {
      show_alert('El campo de correo electronico es obligatorio', 'info');
    }
    if (numeroIdentificacion === '') 
    {
      show_alert('El campo de numero de identificacion es obligatorio', 'info');
    }if (edad === '') 
    {
      show_alert('El campo de edad es obligatorio', 'info');
    }
    if (relacionConEstudiante === '') {
      show_alert('El campo de relacion con el estudiante es obligatorio', 'info');
    }
    if (estadoCivil === '') { 
      show_alert('El campo de estado civil es obligatorio', 'info');
    }
    if (ocupacion === '') {
      show_alert('El campo de ocupacion es obligatorio', 'info');
    }
    if (fechaRegistro === '') {
      show_alert('El campo de fecha de registro es obligatoria', 'info');
    }
    else {
      let parametros;
      let metodo;
      if (operation === 1) {
        parametros = {
        acudienteId: acudienteId,
          nombres: nombres,
          apellidos: apellidos,
          correoElectronico: correoElectronico,
          numeroIdentificacion: numeroIdentificacion,
          edad: edad,
          relacionConEstudiante : relacionConEstudiante,
          estadoCivil : estadoCivil,
          ocupacion  : ocupacion,
          fechaRegistro: fechaRegistro
        };
        metodo = 'post';
      }else{
        parametros = {
          nombre: nombres,
          apellido: apellidos,
          correoElectronico: correoElectronico,
          numeroIdentificacion: numeroIdentificacion,
          edad: edad,
          relacionConEstudiante: relacionConEstudiante,
          estadoCivil: estadoCivil,
          ocupacion: ocupacion,
          fechaRegistro: fechaRegistro,
          candidatoEstudianteId: acudienteId
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
        respuesta = await axios.put(`${url}/${acudienteId}`, parametros);
      }
      console.log(`Solicitud ${metodo.toUpperCase()} exitosa:`, respuesta.data);
      const mensajeExito = operation === 1 ? 'Acudiente añadido exitosamente' : 'Acudiente editado con éxito';
      show_alert(mensajeExito, 'success');
      document.getElementById('btnCerrar').click();
      getAcudiente();
    } catch (error) {
      show_alert('Error de solicitud', 'error');
      console.error(error);
    }
  };
    
    const deleteAcudiente = (acudienteId) => {
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
            await axios.delete(`${url}/${acudienteId}`);
            show_alert("Acudiente eliminado con éxito", "success");
            document.getElementById("btnCerrar").click();
            getAcudiente();
          }catch (error){
            show_alert("Error de solucitud", "error");
            console.log(error);
          }
        }else {
          show_alert("el acudiente no fue eliminado", "info");
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
					<i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE ACUDIENTES
				</h3>
				<p className="text-justify">
				</p>
			</div>
			<div className="container-fluid">
				<ul className="full-box list-unstyled page-nav-tabs">
					<li
         >
          <div>
          <a  onClick={() => openModal(1)}
          className=""
          data-toggle="modal"
          data-target="#ModalAcudiente" ><i className="fas fa-plus fa-fw"></i> Añadir Acudiente nuevo</a>
          </div>
          </li>
					<li>
						<a className="active" href="/Secretariaestudiantelista"><i className="fas fa-clipboard-list fa-fw"></i> &nbsp; LISTA DE ACUDIENTES</a>
					</li>
					<li>
						<a style={{color: 'black'}} href="/Secretariabuscarestudiante"><i className="fas fa-search fa-fw"></i> &nbsp; BUSCAR ACUDIENTES</a>
					</li>
				</ul> 
			</div>
      <div className="container-fluid">
      <form className="form-neon" onSubmit={(e) => e.preventDefault()}>
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="inputSearch" className="frome bmd-label-floating">¿Qué acudiente estás buscando?</label>
                            <input type="text" className="form-control" name="busqueda-" id="inputSearch" maxLength="30" value={searchTerm} onChange={handleSearchChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <p className="text-center" style={{ marginTop: "40px" }}>
                            <button type="submit" className="btn btn-raised btn-info" onClick={getAcudiente}><i className="fas fa-search"></i> &nbsp; BUSCAR</button>
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
								<th>CORREO ELECTRONICO</th>
								<th>NUMERO IDENTIFICACION</th>
                <th>EDAD</th>
                <th>RELACION CON ESTUDIANTE</th>
                <th>ESTADO CIVIL</th>
                <th>OCUPACION</th>
                <th>FECHA DE REGISTRO</th>
								<th>ACTUALIZAR/ELIMINAR</th>
							</tr>
						</thead>
						<tbody className="table-group-divider text-center" >
							{filteredAcudiente.map((acudiente, i) =>( 
							<tr   key={acudiente.candidatoEstudianteId}>
								<td>{i+1}</td>
								<td>{acudiente.nombres}</td>
								<td>{acudiente.apellidos}</td>
                <td>{acudiente.correoElectronico}</td>
                <td>{acudiente.numeroIdentificacion}</td>
								<td>{acudiente.edad}</td>
								<td>{acudiente.relacionConEstudiante}</td>
                <td>{acudiente.estadoCivil}</td>
                <td>{acudiente.ocupacion}</td>
                <td>{acudiente.fechaRegistro}</td>
								<td>
								<button onClick={() => openModal(2, acudiente)} className="btn btn-success" data-toggle='modal' data-target='#ModalAcudiente'>
                          <i className="fas fa-edit"></i>
                        </button>
									/&nbsp;
									<button onClick={() => deleteAcudiente(acudiente.acudienteId, acudiente.nombres, )} className="btn btn-danger">
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
<div id="ModalAcudiente" className="modal fade " aria-hidden="true">
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
                        value={apellidos}
                        onChange={(e) => setApellido(e.target.value)}
                      />
                    </div>
                        <div className="input-group mb-3">
                            <div className="form-group">
                              <span className="input-group-text"><i className="far fa-calendar-alt center"></i>fecha de nacimiento: </span>
                            <input type="date" id="fecha" name="fecha" className="form-control" value={fechaRegistro} onChange={(e)=>setFechaRegistro(e.target.value)}/>
                          </div>
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
                      <span className="input-group-text"><i className="far fa-id-card"></i></span>
                      <input
                        type="number"
                        id="NumeroContacto"
                        className="form-control"
                        placeholder="Numero Documento"
                        value={numeroIdentificacion} 
                        onChange={(e) => setNumeroIdentificacion(e.target.value)}
                      />
                    </div>
                        <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-phone-alt"></i></span>
                      <input
                        type="number"
                        id="edad"
                        className="form-control"
                        placeholder="Numero Contacto"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                      <input
                        type="text"
                        id="relacionconestudiante"
                        className="form-control"
                        placeholder="DIRECCION"
                        value={relacionConEstudiante}
                        onChange={(e) => setRelacionConEstudiante(e.target.value)}
                      />
                    </div>
                        <div className="input-group mb-3">
                          <span > <i className="fas fa-venus-mars"></i> Estado Civil</span>
                            <select className="form-select" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)}>
                                <option value="">Seleccione Estado Civil</option>
                                <option value="casado/a">casado/a</option>
                                <option value="soltero/a">soltero/a</option>
                                <option value="viudo/a">viudo/a</option>
                                <option value="divorciado/a">divorciado/a</option>
                                <option value="unión libre">unión libre</option>
                                <option value="separado/a">separado/a</option>
                            </select>
                        </div>
                        <div className="mb-3">
                        <input
                        type="text"
                        id="cargadaDocumento"
                        className="form-control"
                        placeholder="Inserto documento (SI O NO)"
                        value={ocupacion}
                        onChange={(e) => setOcupacion(e.target.value)}
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