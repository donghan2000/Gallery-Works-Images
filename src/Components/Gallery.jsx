import React , {useState , useEffect} from 'react'
import { a } from '@react-spring/web'
import { Slider } from './Slider'
import { items } from './items'

import styles from './styles.module.css'

export default function Gallery(){

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeHovered , setHovered] = useState(0)

  const onEnter = (i) => {
    setIsHovering(true);
    setHovered(i);
  }

  
  const onLeave = (event)=>{
    setIsHovering(false)
  }

  return <>

    <div className="flex fill center container">
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
               ></div>

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