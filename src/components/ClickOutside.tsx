import { useRef, useEffect } from 'react';

export default function ClickOutside({ children, exceptionRef, onClick, className }: { children: any; exceptionRef: any, onClick:any, className:string }) {
  const wrapperRef:any = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickListener);
    
    return () => {
      document.removeEventListener('mousedown', handleClickListener);
    };
  }, []);

  const handleClickListener = (event:any) => {
    let clickedInside;
    if(exceptionRef) {
      clickedInside = (wrapperRef && wrapperRef.current.contains(event.target)) || exceptionRef.current === event.target || exceptionRef.current.contains(event.target);
    }
    else {
      clickedInside = (wrapperRef && wrapperRef.current.contains(event.target));
    }

    if (clickedInside) return;
    else onClick();
  }
  
  return (
    <div ref={wrapperRef} className={`${className || ''}`}>
      {children}
    </div>
  );
};