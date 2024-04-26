import './App.css'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import Footer from './components/Footer';
import LogoDaniel from './assets/logo-footer.jpg'
import { TURNS, WINNER_COMBOS } from './constants';
import { WinnerModal } from './components/WinnerModal';
import toast, { Toaster } from 'react-hot-toast';



const Tablero = styled.main`
  width: fit-content;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media screen and (min-width:600px) and (max-width:1000px){
    height: max-content;
  }
` 

const Titulo = styled.h1`
  color: #eee;
  font-family: 'Syncopate', sans-serif;
  padding: 2rem 1rem;
  background-color: #24242440;
  border-radius: 20px;
  font-size: 4rem;
  text-shadow: 5px 5px 10px black;
  position: relative;
  

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(2px);
    z-index: -1;
  }

  @media screen and (max-width: 480px){
    font-size: 2.5rem;
    padding: 1.2rem 1rem;
  }
`

const Game = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

const Turn = styled.section`
  display: flex;
  justify-content: center;
  margin: 0 auto 15px auto;
  width: fit-content;
  position: relative;
  border-radius: 10px;
  gap: 15px;
`
const BotonReset = styled.button`
  padding: 8px 12px;
  background-color: #24242474;
  border: 2px solid #eeeeee4b;
  color: #eee;
  backdrop-filter: blur(2px);
  width: 100px;
  border-radius: 5px;
  transition: 0.2s;
  font-weight: bold;
  animation: showResetButton 1s ease-in-out;
  cursor: pointer;

  &:hover{
    background: #eee;
    color: #222;
  }

  @keyframes showResetButton {
    0% {
      transform: rotateZ(165deg);
      opacity: 0;
    }

    100% {
      transform: rotateZ(0deg);
      opacity: 1;
    }
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

  const resetGameNotify = () => toast('El tablero se ha reiniciado correctamente', {
    icon: '✅',
    style: {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Syncopate, sans-serif',
      fontSize: '0.7rem'
    }
  })

  return (
    <>
    <Tablero>
      <Titulo style={{ marginBottom: board.every(elemento => elemento === null) ? '4.1rem' : '0'}} >Tic Tac Toe</Titulo>
      <BotonReset style={{ display: board.every(elemento => elemento === null) ? 'none' : 'inline-block'}} onClick={() => {resetGame(); resetGameNotify();}}>Empezar de nuevo</BotonReset>
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
      <Toaster />
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
