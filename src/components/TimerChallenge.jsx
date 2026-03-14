import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

const TimerChallenge = ({title, targetTime}) => {
  
  const timer = useRef();
  const dialog = useRef()

  const [timeRemaining, setRemainingTime] = useState(targetTime*1000)

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000

  
  const handleStart = () => {
    timer.current = setInterval(() => {
        setRemainingTime(prevRemainingTime => {
          if(prevRemainingTime <= 10) {
            clearInterval(timer.current)
            dialog.current.open()
            return 0
          }        
          return prevRemainingTime - 10
        })
    }, 10)
  }

  const handleReset = () => {
    setRemainingTime(targetTime*1000)
  }

  const handleStop = () => {
    dialog.current.open()
    clearInterval(timer.current )
  }

  return (
    <>
        <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset}/>
        <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
            {targetTime} second{targetTime > 1? 's' : '' }
        </p>
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
                Start Challenge
            </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
            {timerIsActive ? 'Time is running' : 'Timer is inactive'}
        </p>
        </section>
    </>
  )
}

export default TimerChallenge
