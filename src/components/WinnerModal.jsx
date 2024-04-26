import { Square } from "./Square";
import styled from "styled-components";

const Winner = styled.section`
  position: fixed;
  width: 98.8vw;
  height: 110vh;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`

const Text = styled.div`
  background: #111;
  height: 300px;
  width: 320px;
  border: 2px solid #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const Win = styled.header`
    margin: 0 auto;
  width: fit-content;
  border: 2px solid #eee;
  border-radius: 10px;
  display: flex;
  gap: 15px;
`

const BotonReset = styled.button`
    padding: 8px 12px;
  margin: 25px;
  background: transparent;
  border: 2px solid #eee;
  color: #eee;
  width: 100px;
  border-radius: 5px;
  transition: 0.2s;
  font-weight: bold;
  cursor: pointer;

  &:hover{
    background: #eee;
    color: #222;
  }
`

export const WinnerModal = ({winner, resetGame}) => {
    if (winner === null) return null

    return (
      <Winner>
        <Text>
          {
            winner === false ? 'Empate' : 'Ganó:'
          }
          {
          winner && <Win>
            <Square isSelected={false}>{winner}</Square>
          </Win>
          }
          <footer>
            <BotonReset onClick={resetGame}>Empezar de nuevo</BotonReset>
          </footer>
        </Text>
      </Winner>
    )
}