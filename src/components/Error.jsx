
function Error() {
  return(
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <img src={"/404.gif"} alt="404 error"/>
    </div>
  )
}


//TODO: Figure out what to do with navigation and search area as they are rendered also when error is encountered. Error at the moment simply just means attempt to access some random resource eg. "/fooo/baaaar"

export default Error;