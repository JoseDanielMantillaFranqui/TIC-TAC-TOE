import styled from "styled-components";

const StyledSquare = styled.div`
  font-family: 'Rampart One', sans-serif;
  width: 100px;
  height: 100px;
  border: 2px solid #eee;
  border-radius: 5px;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 48px;
  text-shadow: 0 0 10px ${props => (props.isselected === "true" ? "#2222228e" : '#f2eeee83')};
  color: ${props => (props.isselected === "true" ? "#222" : '#f2eeee')};
  background: ${props => (props.isselected === "true" ? "#fff" : '#242424')};;
`

export const Square = ({children, updateBoard, index, isSelected}) => {

    const handleClick = () => {
      updateBoard(index)
    }
  
    return (<StyledSquare isselected={isSelected.toString()} onClick={handleClick}>
      {children}
    </StyledSquare>);
  }