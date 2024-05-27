import { useEffect,useState } from "react";
import { useParams, Link ,useNavigate } from "react-router-dom";
import axios from "axios";
/** Alertas con React Toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*Importar estilos css */
import "../assets/css/postulate.css"


const Postulate = () => {
const [trabajo,setTrabajo]=useState([]);
const [nombre, setNombre] = useState("");
const [apaterno, setApaterno] = useState("");
const [amaterno, setAmaterno] = useState("");
const [email, setEmail] = useState("");
const [tdoc, setTdoc] = useState(null);
const [tnum, setTnum] = useState("");
const [archivo, setArchivo] = useState("");
const [archivoPdf, setArchivoPdf] = useState(null);
const URL_API ="http://localhost:5026/api/Postulaciones/Postular";
const navigate = useNavigate();



 const params = useParams();
 
 const showData= async()=>{
    let url =`http://localhost:5026/api/Trabajos/GetTrabajosId/${params.id}`
   const response= await fetch(url);
   const data = await response.json();
   setTrabajo(data.data[0]);
   }
 
   const handleSubmit = (e) => {
    e.preventDefault();
    let now = new Date();
    subirArchivo();
    save({
        idJobs: params.id,
        nombre: nombre,
        apaterno: apaterno,
        amaterno: amaterno,
        email: email,
        tipodoc: tdoc,
        ndoc: tnum,
        linkdoc: archivo,
        fechapostulacion: now.toISOString()
    });

   }

   const save = async (postulacion) => {
    console.log(postulacion);
    try {
       const response = await axios.post(URL_API, postulacion);
       console.log(response.data);
    if(response.data.isSuccess){
        toast.success("Se registro la postulación."); 
        setTimeout(() => {
          navigate('/');
        }, 2000);
    }else{
        toast.warning("no se puedo registrar");
    }

    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };
    const subirArchivo =async()=>{
      const f = new FormData();
      for(let index =0; index< archivoPdf.length; index++){
        f.append("files",archivoPdf[index]);
      }
      await axios.post("http://localhost:5026/api/Archivo/SubirArchivo",f)
      .then(response=>{
        setArchivo(response.data.data[0].url);
      }).catch(error=>{
        console.log(error)
      })
    }
   useEffect(()=>{
    showData();
   }
    ,[])
  

    return ( 
<>

<ToastContainer />
<nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="/"><span className="badge bg-light text-dark fs-4">TodoEmpleo.pe</span></a>
  </div>
</nav>

<div className="row p-2">


<div className="col-12 col-sm-4 text-center" > 

<div className="col mt-3 px-3 py-3 border border-primary rounded  bg-body ">

<h4 className="card-title">{trabajo.cargo}</h4>
<p className="text-justify mt-3">{trabajo.detalle}</p>
<h6>Empresa : {trabajo.nombre} </h6>
<h5>Salario : S/. {trabajo.salario}</h5>
  </div>

</div>


<div className="col-12 col-sm-8 px-5 py-5">

<form onSubmit={handleSubmit}>
<div className="row">
<h2 className=" text-center mb-5">Registra tu postulación</h2>
 <div className="col-12 col-sm-4 ">
 <div className="mb-3">
    <label className="form-label">Nombre</label>
    <input type="text" className="form-control" id="nombre" 
    value={nombre} onChange={(e)=>setNombre(e.target.value)} required />
  </div>
 </div>
 <div className="col-12 col-sm-4 ">
 <div className="mb-3">
    <label  className="form-label">Ap.Paterno</label>
    <input type="text" className="form-control"
     id="aparterno" value={apaterno} 
     onChange={(e) => setApaterno(e.target.value)} required/>
  </div>

 </div>
 <div className="col-12 col-sm-4 ">
 <div className="mb-3">
    <label  className="form-label">Ap.Materno</label>
    <input type="text" className="form-control" id="amaterno" 
    value={amaterno} onChange={(e)=>setAmaterno(e.target.value)} required/>
  </div>

 </div>

</div>
          
<div className="row">
 <div className="col-12 col-sm-6 ">
 <div className="mb-3">
    <label className="form-label">Email :</label>
    <input type="email" className="form-control" id="email" 
    value={email} onChange={(e)=>setEmail(e.target.value)} required/>
  </div>
 </div>
 <div className="col-4 col-sm-2 ">
 <div className="mb-3">
    <label  className="form-label">Tipo.Doc</label>
    <div>
    <select
          name="tipo_doc"
          className="form-select"
          value={tdoc}
          onChange={(e) => setTdoc(e.target.value)}
          required>
          <option value="">Seleccione</option>
          <option value="01">D.N.I</option>
          <option value="02">C.E</option>
          <option value="03">OTROS</option>
        </select>
    </div>
  </div>

 </div>

 <div className="col-8 col-sm-4 ">
 <div className="mb-3">
    <label  className="form-label">Nro.Documento</label>
    <input type="text" className="form-control" id="ndoc" required
    value={tnum} onChange={(e)=> setTnum(e.target.value)}
    />
  </div>

 </div>


</div>

 <div className="row">
 <div className="col-12 col-sm-12 ">
 <div className="mb-3">
  <label className="form-label">Adjunte CV (Word/Pdf)</label>
<div className="form-group files color">
<input className="form-control" type="file" id="formFile"
  accept=".pdf,.docx " 
  onChange={(e)=>setArchivoPdf(e.target.files)}
  required
  />
</div>

</div>

 </div>
</div>


<div className="container-fluid"  >
<div className="d-flex flex-row  justify-content-between">
<Link to={"/"} className="btn btn-secondary mt-5"> Regresar</Link>
<button type="submit" className="btn btn-primary mt-5"> Postular</button>
</div>

</div>
</form>
</div>
</div>

</>
        
        



     );
}
 
export default Postulate;