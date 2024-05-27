import CardsJobs from "./CardsJobs";


const ListJobs = ({trabajos}) => {

return (
<div>
<br/>
<h2 className=" text-center">Lista de trabajos disponibles</h2>

<div className="row row-cols-1 row-cols-md-3 g-4 py-3 px-1">
{
    trabajos.map((news,index)=>{
        return <CardsJobs  
        key={index}
        cargo ={news.cargo}
        detalle={news.detalle}
        empresa={news.nombre}
        salario = {news.salario}
        id={news.id}

        />
    })
}

</div>

</div>

      );
}
 
export default ListJobs;