import AOS from 'aos'
import 'aos/dist/aos.css'

export function initAOS(){
  // Evita animaciones si el usuario prefiere menos movimiento
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  AOS.init({
    duration: 500,
    easing: 'ease-out',
    once: true,
    offset: 12,
    anchorPlacement: 'top-bottom'
  })
}
