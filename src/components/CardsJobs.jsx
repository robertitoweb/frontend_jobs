import { Link } from "react-router-dom";
import "../assets/css/CardsJobs.css";

const CardsJobs =({cargo,detalle,empresa,salario,id}) => {
    return ( 
      <div className="col">
      <div className="card" style={{minHeight:"23rem", maxHeight:"23rem"}}>
          
          <div className="card-body">
              <h4 className="card-title">{cargo}</h4>
              <p className="card-text">{detalle.slice(0,300)}</p>
              <p className="card-text">Empresa : {empresa}</p>
          </div>
          <div className="mb-5 d-flex justify-content-around">
              <h5>Salario : S/. {salario}</h5>
              <Link to={`/postulate/${id}`} className="btn btn-primary" >Aplicar</Link>
          </div>
      </div>
  </div>
     );
}
 
export default CardsJobs;