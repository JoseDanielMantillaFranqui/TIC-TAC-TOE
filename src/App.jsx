import './App.css'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import Footer from './components/Footer';
import LogoDaniel from './assets/logo-footer.jpg'
import { TURNS, WINNER_COMBOS } from './constants';
import { WinnerModal } from './components/WinnerModal';



const Tablero = styled.main`
  width: fit-content;
  height: 100vh;
  margin: 40px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width:600px) and (max-width:1000px){
    height: max-content;
  }
` 

const Titulo = styled.h1`
  color: #eee;
  margin-bottom: 16px;
  font-family: 'Syncopate', sans-serif;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 5px 5px 10px black;
`

const Game = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

const Turn = styled.section`
  display: flex;
  justify-content: center;
  margin: 15px auto;
  width: fit-content;
  position: relative;
  border-radius: 10px;
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


function App() {

  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) //null es que no hay ganador, false es un empate

  useEffect(() => {
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', turn)
  },[board,turn])

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null)
  }

  const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    // si no hay ganador
    return null
  }

  const checkEndGame = (newBoard) => {
    //revisamos si hay un empate si no hay más espacios vacíos en el tablero
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    //no actualizamos esta posición si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <>
    <Tablero>
      <Titulo>Tic Tac Toe</Titulo>
      <BotonReset onClick={resetGame}>Empezar de nuevo</BotonReset>
      <Game>
        {
          board.map((square,index) => {
            return (
              <Square key={index} index={index} isSelected={false} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </Game>
      <Turn>
        <Square isSelected={turn === TURNS.X ? true : false}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O ? true : false}>{TURNS.O}</Square>
      </Turn>
      {
        <WinnerModal winner={winner} resetGame={resetGame}/>
      }
      
    </Tablero>
    <Footer src={LogoDaniel} />
    </>
  )
}

export default App
