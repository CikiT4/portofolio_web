import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const move = (e) => {
      dot.style.left = `${e.clientX - 3}px`;
      dot.style.top = `${e.clientY - 3}px`;
    };

    const enter = () => { dot.style.transform = 'scale(2.5)'; };
    const leave = () => { dot.style.transform = 'scale(1)'; };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return <div ref={dotRef} className="cursor-glow" aria-hidden="true" />;
}
