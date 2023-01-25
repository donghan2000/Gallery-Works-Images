import React , {useState , useEffect} from 'react'
import { a, useTransition, useSpring, useChain, config,  animated, useSpringRef } from '@react-spring/web'
import { Slider } from './Slider'
import { items } from './items'

import styles from './styles.module.css'

export default function Gallery(){

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeHovered , setHovered] = useState(0)
  const [open, set] = useState(false);

  const onEnter = (i) => {
    setIsHovering(true);
    setHovered(i);
  }
  
  const onLeave = (event)=>{
    setIsHovering(false)
  }

  const openModal = (i) =>{
    console.log("Index clicked is " + i )
    set((open) => !open)
  }

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { height: "0px", width:"0px", background: "hotpink" , opacity: "0" },
    to: {
      width: open ? "501px" : "0px",
      height: open ? "262px" : "0px",
      background: open ? "white" : "hotpink",
      opacity: open ? "1" : "0"
    }
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? items : [], {
    ref: transApi,
    trail: 400 / items.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 }
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6
  ]);

  return <>

    <div className="flex fill center container">
      <div className='section-titles'>
        <h1>My Works</h1>
      </div>
      <div className="main">
        <Slider items={items} width={700} visible={3} setActiveIndex={setActiveIndex}>
          {({ imageUrl , Title }, i) => (
            <div className="content">
              <div className="marker">{String(i+ 1).padStart(2, '0')}. {Title}</div>
              
              <a.div 
                className="image" 
                style={{ backgroundImage: imageUrl , opacity: i === activeHovered && isHovering ? "0.25" : "1"  } }
                onPointerEnter={() => onEnter(i)}  
                onPointerLeave={(onLeave)} 
              />

              {/* <div className='middle' 
                style={{  display: i === activeHovered && isHovering ? "block" : "none" , opacity: i === activeHovered && isHovering ? "0.8" : "0"  }}
                onPointerEnter={() => onEnter(i)}
                onPointerLeave={(onLeave)} 
              ></div> */}


               <div className='circle'
                  style={{  opacity: i === activeHovered && isHovering ? "1" : "0"  }}
                  onPointerEnter={() => onEnter(i)}
                  onPointerLeave={(onLeave)} 
                  onClick={() => openModal(i)}
               ></div>

               
              <animated.div
                style={{ ...rest}}
                className="pinkDiv"
                onClick={() => set((open) => !open)}
                onPointerEnter={() => onEnter(i)}
                onPointerLeave={(onLeave)} 
              >
              </animated.div>



            </div>
          )}
        </Slider>
      </div>
      <div className="navbar">
        {items.map((item, i) => (
          <div 
            key={i}
            className={`dot ${i === activeIndex ? styles.active : ' '}`}
          />
        ))}
        </div>
     </div>

    </>
    
}