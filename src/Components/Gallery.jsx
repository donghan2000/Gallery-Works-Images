  import React, { useState, useEffect } from 'react'
  import { a } from '@react-spring/web'
  import { Slider } from './Slider'
  import { items } from './items'

  import styles from './styles.module.css'



  export default function Gallery() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [activeHovered, setHovered] = useState(0)
    const [modal, setModal] = useState(false);
    const [openedModal, setOpen] = useState(0)


    const onEnter = (i) => {
      setIsHovering(true);
      setHovered(i);
    }

    const onLeave = (event) => {
      setIsHovering(false)
    }

    const openModal = (i) => {
      console.log("modal " + i + " is open");
      setOpen(i);
      setModal(true);

    }

    const closeModal = (event) =>{
      setModal(false);
    }


    return <>

    <div className="flex fill center container" >
      <div className='section-titles'>
        <h1>My Works</h1>
      </div>
      <div className="main">
        <Slider items={items} width={700} visible={3} setActiveIndex={setActiveIndex} setModal={setModal}>
          {({ imageUrl, Title }, i) => (
            <div className="content">
              <div className="marker">{String(i + 1).padStart(2, '0')}. {Title}</div>

                <a.div
                  className="works-gallery-image"
                  style={{ backgroundImage: imageUrl, 
                          opacity: i === activeHovered && isHovering ? "0.25" : "1" ,
                          backgroundSize: i === activeHovered && isHovering ? "150%" : "100%"
                          }}
                  onPointerEnter={() => onEnter(i)}
                  onPointerLeave={(onLeave)}
                />
        
              <div className='circle'
                style={{ opacity: i === activeHovered && isHovering ? "1" : "0" , 
                          width: i === activeHovered && isHovering ? "70px" : "0" , 
                          height:  i === activeHovered && isHovering ? "70px" : "0",
                          backgroundSize: i === activeHovered && isHovering ? "150%" : "100%"
                        }}
                onPointerEnter={() => onEnter(i)}
                onPointerLeave={(onLeave)}
                onClick={() => openModal(i)}
              ></div>

            </div>
          )}
        </Slider>
      </div>

      <div items={items} className='modal'
        style={{ display: modal ? "block" : "none" }}
      >

        <button onClick={() => closeModal()} className='works-close-button'>
          <span className='close'>x</span>
        </button>

        <div className='work-flex-div'>

            <div className='work-modal-div'>          
              <img className='work-modal-images' src={items[openedModal].workContentImage} />
            </div>

          <div className='works-modal-title'>
            <h1>{items[openedModal].Title}</h1>
          </div>
        </div>

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