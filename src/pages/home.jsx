import { useState,useEffect } from "react";
import Header from "../components/Header";
import ListJobs from "../components/ListJobs";
import Pagination from "../components/Pagination";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
 const [trabajos,setTrabajos]=useState([]);
 const [search, setSearch] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage, setPostsPerPage] = useState(6);

//funcion de busqueda 
const searcher=(e)=>{
  setSearch(e.target.value)

}

const result= !search? trabajos : trabajos.filter((dato)=>
  dato.detalle.toLowerCase().includes(search.toLowerCase()) 
)

 const showData= async()=>{
  let url =`http://localhost:5026/api/Trabajos/GetTrabajos`
 const response= await fetch(url);
 const data = await response.json();
 setTrabajos(data.data);
 }
 


  useEffect(()=>{
   showData();

 },[]);



 const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
     const resulpagination = result.slice(firstPostIndex, lastPostIndex);




  return (
    
  <>
<ToastContainer />
<Header searcher={searcher} />
<ListJobs trabajos={resulpagination}/>
<Pagination  totalPosts={result.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}/> 
  </>
  )
}
 
export default Home;