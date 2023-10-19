import "../styles/NotFound.css"
import Lottie from "react-lottie";
import animationData from "../assets/404.json"
import {Container} from "react-bootstrap"
function NotFound(){
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return(
    <div  className="notFound" style={{width:"100%", height:"100vh"}}>
      <Container className= "sorryCont" style={{width:"100%", height:"100%"}}>
      <h1>
        Sorry, the page you are looking for does not exist.
      </h1>
      <Lottie options={defaultOptions}
          height={300} width={300}/>
      </Container>
    </div>
  )
}
export default NotFound;