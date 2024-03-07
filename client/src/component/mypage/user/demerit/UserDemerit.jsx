import styles from "../../MyPage.module.css";
import styled from "styled-components";
import ModaluserDemerit from "../../modal/ModalUserDemerit";

export default function UserDemerit(props) {
    return (
      <div>
        <ModaluserDemerit />
        <Title>
          현재 누적 벌점은 {props.userDemerit}점
        </Title>
        <h1></h1>
      </div>
    );
  }

const Title = styled.div`
  position: relative;
  font-size: 3vmin;
  padding-bottom: 0.9vh;
  width: 95%;
  bottom: 3vh;
  border-bottom: 0.1vh solid  #c0c0c0;
`;