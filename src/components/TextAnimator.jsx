import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React , {useEffect,useRef} from 'react'

gsap.registerPlugin(ScrollTrigger);

const TextAnimator = ({text, animation , className}) => {
  const textContainer = useRef(null)

  useEffect(() => {
    if (textContainer.current == null) return;
    const animatedText = textContainer.current == null ? '.chunck' : textContainer.current.querySelectorAll('.chunck')
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainer.current ,
          start: 'top 70%',
          // markers: true,
          end: 'bottom center',
          onEnter: () => {
            tl.play()
          },
          onLeaveBack: () => {
            tl.reverse()
          }
        }
      })
      switch (animation) {
        case 'downUp':
          tl.from('.text' , { y: '100px' , opacity: 0 } ).to('.text' , { y: '0px' , opacity: 1 , duration: 0.5  } )
          break;
        case 'chuncks':
          tl.to( animatedText , {
            transform: 'translate3d(0,0,0) rotateY(0) rotateX(0)' ,
            stagger:0.01 ,
            y: '0px' ,
            x: '0' ,
            opacity: 1 ,
            duration: 0.5,
            ease: 'power4.out'
          })
          break;
          default:
            tl.to( animatedText , {
              transform: 'translate3d(0,0,0) rotateY(0) rotateX(0)' ,
              stagger:0.01 ,
              y: '0px' ,
              x: '0' ,
              opacity: 1 ,
              duration: 0.5,
              ease: 'power4.out'
            })
          break;
      }
    })
    return () => ctx.revert()
  }, [])
  return (
    <div ref={textContainer} className={`w-full text-container relative !z-[1]`} >
      {
        animation == 'chuncks' ?
        //& Chuncks Animation
          <p className={`text w-fit flex flex-row flex-wrap !z-[1] ${className} `}>
            { text.split(' ').map((chunck,idx) => (
                <span
                style={{
                transform: 'translate3d(10px,51px,-60px) rotateY(60deg) rotateX(-40deg)',
                transformOrigin: '50% 50% -150% !important',
                perspective:'600px',
                willChange: 'opacity, transform'
                  }}
                className='chunck opacity-0 rounded-lg ml-1 p-1'
                key={idx} >
                  {chunck}
                </span>
              ))
            }
          </p> :
        //& downUp Animation
          <p className='text' >{text}</p>
      }
    </div>
  )
}

export default TextAnimator
