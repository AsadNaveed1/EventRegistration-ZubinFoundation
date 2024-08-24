import styled from 'styled-components';
import {Outlet} from "react-router-dom"

function Home() {
    return <div>
    Hello
    </div>
        
}
const Wrapper = styled.div`
  padding: 20px;
  margin-top: 100px;
  margin-left: 250px;
`;

export default Home