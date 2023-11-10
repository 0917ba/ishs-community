import { useNavigate } from "react-router-dom";

function MainMy() {
      const navigate = useNavigate();
  
    const goTomain = () => {
      navigate("/");    // 메인페이지를 개발해서 추가해야 합니다
    }
  
    const goTomy = () => {
      navigate("/about");   // 마이페이지를 개발해서 추가해야 합니다
    }
  
  return(
        <div>
        <button onClick={goTomain}>메인페이지로 이동</button>   
        <h1> | </h1>
        <button onClick={goTomy}>마이페이지</button> 
    </div>
    )
}
  
// 메인페이지, 마이페이지로 가도록 하는 기능을 추가해야 함

export default MainMy;
