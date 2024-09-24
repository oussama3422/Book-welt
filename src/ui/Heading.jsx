import styled from "styled-components";

const Heading = styled.h1`
  ${(props) => props.type === "h1" && `font-size:3rem`}
  ${(props) => props.type === "h2" && `font-size:2rem`}
  ${(props) => props.type === "h3" && `font-size:1rem`}
  font-size: 25px;
`;

export default Heading;
