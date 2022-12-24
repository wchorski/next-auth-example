import React, { useState, useEffect } from 'react'
// import { useTransition, animated } from 'react-spring'
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { GiPartyPopper } from 'react-icons/gi'
import { FaMusic } from 'react-icons/fa'

export const Loading = () => {

  const [isShown, setisShown ] = useState(false)
  // const transpring = useTransition(isShown, {
  //   config: {mass:.1, tension:100, friction:50},
  //   from: {x: 50, y: 0,   opacity: 0.1},
  //   enter: {x: 0,   y: 0,     opacity: 1.0},
  //   leave: {x: 50, y: 0,  opacity: 0.1},
  // })

  const triggerAnim = () => {
    setisShown(prev => !prev)
  }


  useEffect(() => {

    const timer = setInterval(() => {
      triggerAnim();
    }, 3000);

    timer

    return () => clearInterval(timer);
  
  }, [])
  

  return (
    <>
    <div className='loading isLoaded'>

       <span className='label'> Loading </span>

        <span className='isLoaded'>
          {(isShown)  ? <GiPartyPopper /> : <FaMusic />}
          {/* {transpring((style, item) =>
            item 
              ? <animated.span style={style}> <AiFillHeart /> </animated.span>
              : <animated.span style={style}> <AiOutlineHeart /> </animated.span>
          )} */}
        </span>
      
    </div>
    </>
  )
}
