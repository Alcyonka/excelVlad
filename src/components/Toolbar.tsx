import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCurrentStyle, setStyle } from '../store/features/cellSlice';
import Dropdown from "./Dropdown";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Toolbar() {
  const { currentCell, currentStyle } = useAppSelector((state) => state.cellReducer);
  const { group } = useAppSelector((state) => state.groupSelectReducer);
  const dispatch = useAppDispatch();

  const [styles] = useState({
    fontWeight: false,
    fontStyle: false,
    textDecoration: false,
    fontSize: false,
  });

  const clickHandler = (style: string, value: string) => {
    console.log(style + value);
    return () => {
      console.log(style + value);
      const updateStyle = (style: any, value: any) => {
        const updatedStyle = { ...currentStyle, [style]: value };
        dispatch(setCurrentStyle({ style: updatedStyle }));
console.log(style + value);
        const targetCell = group.length ? group : [currentCell];
        targetCell.forEach((cell) => {
          console.log(style + value);
          dispatch(setStyle({ styleObj: { cell, style, value } }));
        });
      };

      if (currentStyle[style as keyof typeof styles]) {
        updateStyle(style, '');
      } else {
        updateStyle(style, value);
      }
    };
  };

 
const SIZE_LIST:string[] = ['24px', '20px', '16px', '12px', '8px'];

const [size, setSize] = useState('');

 const handleSize:any = (value: any) => {
    setSize(value);
    //console.log("11")
    //clickHandler('fontSize', value);
    return value;
  };

  return (
    <>
    <div className="[&>*]:ml-3 [&>*]:p-1 [&>*]:cursor-pointer [&>*]:rounded hover:[&>*]:bg-slate-200">
      <FontAwesomeIcon
        data-testid="bold"
        style={currentStyle?.fontWeight ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('fontWeight', 'bold')}
        icon={faBold as IconProp}
      />
      <FontAwesomeIcon
        data-testid="italic"
        style={currentStyle?.fontStyle ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('fontStyle', 'italic')}
        icon={faItalic as IconProp}
      />
      <FontAwesomeIcon
        data-testid="underline"
        style={currentStyle?.textDecoration ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('textDecoration', 'underline')}
        icon={faUnderline as IconProp}
      />
    </div>
    <div className='dropdown-container size-menu'>
        <Dropdown 
          listItems={SIZE_LIST}
          selectedValue={size}
          onClick={handleSize}
        />
      </div>
    </>
  );
}

export default Toolbar;
