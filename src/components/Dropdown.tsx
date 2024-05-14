import { useState, useRef } from 'react';

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ClickOutside from './ClickOutside';
import './Dropdown.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function Dropdown({ 
  listItems,
  selectedValue,
  onClick
}:{listItems:any, selectedValue:any, onClick:any}) {
  const exceptionRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleValueClickEvent = (value:Event) => {
    setIsOpen(false);
    onClick(value);
  };

  const handleOpenStyle = !isOpen ?
          {
            header: {
              borderRadius: '3px',
              border: '1px solid rgb(225, 225, 225)'
            }
          } : 
          {
            header: {
              fontWeight: '900',
              borderRadius: '3px 3px 0 0',
              borderTop: '1px solid #4da7d4',
              borderLeft: '1px solid #4da7d4',
              borderRight: '1px solid #4da7d4',
              borderBottom: '1px solid #f0f8ff'
            },
            ul: {
              borderRadius: '0 0 3px 3px',
              borderBottom: '1px solid #4da7d4',
              borderLeft: '1px solid #4da7d4',
              borderRight: '1px solid #4da7d4'
            },
            li: {
              borderBottom: '1px solid #f0f8ff'
            }
          }

  return (
    <div className='custom-dropdown-container'>
      <div
        tabIndex={-1}
        className='custom-dropdown-header'
        style={handleOpenStyle.header} 
        onClick={toggleDropdown}
        ref={exceptionRef}
      >
        <div className='selected-value'>
          { selectedValue }
        </div>
        { isOpen ? <FontAwesomeIcon icon={faCaretUp as IconProp} /> : <FontAwesomeIcon icon={faCaretDown as IconProp} /> }
      </div>
      {
        isOpen && (
            <ClickOutside
              className={'dropdown-list-container'}
              onClick={() => setIsOpen(false)}
              exceptionRef={exceptionRef}
            >
              <ul 
                className='dropdown-list'
                tabIndex={-1}
                style={handleOpenStyle.ul} 
              >
                {
                  listItems.map((item:any, index:any) => (
                    <li 
                      className='dropdown-list-item'
                      style={handleOpenStyle.li}
                      key={`dropdown-list-${index}`}
                      onClick={() => handleValueClickEvent(item)}
                      value={item}
                    >
                      {item}
                    </li>
                  ))
                }
              </ul>
            </ClickOutside>
          )
        }
    </div>
  );
};