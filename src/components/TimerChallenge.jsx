import React, { useState, useRef } from 'react'

const TimerChallenge = ({title, targetTime}) => {
  
  const timer = useRef();

  const [timerStarted, setTimerStarted] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)

  const handleStart = () => {
    timer.current = setTimeout(() => {
        setTimerExpired(prevState => {
            return !prevState
        })
    }, targetTime*1000)

    setTimerStarted(prevValue => {
        return !prevValue
    })
  }

  const handleStop = () => {
    clearTimeout(timer.current )
  }


  return (
    <section className='challenge'>
      <h2>{title}</h2>
      {timerExpired ? 'You lost' : ''}
      <p className='challenge-time'>
        {targetTime} second{targetTime > 1? 's' : '' }
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
            Start Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running' : 'Timer is inactive'}
      </p>
    </section>
  )
}

export default TimerChallenge
