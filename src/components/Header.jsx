const Header = ({searcher}) => {
    return ( 
 <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="/"><span className="badge bg-light text-dark fs-4">TodoEmpleo.pe</span></a>

  
      <div className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" onChange={searcher} />
        <button className="btn btn-success" type="submit">Buscar</button>
      </div>

  </div>
</nav>
     );
}
 
export default Header;