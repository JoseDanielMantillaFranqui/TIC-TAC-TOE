import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  border-top: 3px solid #ffffff8f;
  
`

const LogoFooter = styled.img`
    width: 25%;
    border-radius: 25px;
    box-shadow: 0 0 20px #ffffff15;

    @media screen and (max-width: 600px) {
        width: 70%;
    }
`

const Footer = ({ src }) => {
    return (<StyledFooter>
        <LogoFooter src={src} alt='Logo de Daniel Franqui'/>
    </StyledFooter>);
}

export default Footer;