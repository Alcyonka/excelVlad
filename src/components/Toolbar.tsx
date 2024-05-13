import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCurrentStyle, setStyle } from '../store/features/cellSlice';

function Toolbar() {
  const { currentCell, currentStyle } = useAppSelector((state) => state.cellReducer);
  const { group } = useAppSelector((state) => state.groupSelectReducer);
  const dispatch = useAppDispatch();

  const [styles] = useState({
    fontWeight: false,
    fontStyle: false,
    textDecoration: false,
  });

  const clickHandler = (style: string, value: string) => {
    return () => {
      const updateStyle = (style: any, value: any) => {
        const updatedStyle = { ...currentStyle, [style]: value };
        dispatch(setCurrentStyle({ style: updatedStyle }));

        const targetCell = group.length ? group : [currentCell];
        targetCell.forEach((cell) => {
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

  let posButton1 = document.createElement('span');
  posButton1.classList.add(
    'ql-formats'
   );
   posButton1.setAttribute('id', 'butLoad');
let customButton1 = document.createElement('input');
customButton1.type="file"
customButton1.id="customButton1"

customButton1.innerHTML = 'Загрузить';
customButton1.style.width='110px';
customButton1.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files![0];
  if (!file) {
      console.log('Выбор файла отменён. Или что-то другое произошло?');
    }
    else{
      console.log(file.name);
      console.time();
      let reader = new FileReader();
      reader.onloadend = function(event) {
        let arrayBuffer = reader.result;
        // debugger
        let arrayOfStrings = file.name.split(".");
        let fileExtention = arrayOfStrings[arrayOfStrings.length - 1]
        console.log(fileExtention);

if (fileExtention=="xlsx" || fileExtention=="xls"){
          var XLSX = require("xlsx");
  
              var options = { type: 'array' };
      var workbook = XLSX.read(arrayBuffer, options);
      console.timeEnd();
  
      var sheetName = workbook.SheetNames
      var sheet = workbook.Sheets[sheetName]
          console.log(XLSX.utils.sheet_to_html(sheet))
      }
        console.timeEnd();
      };
  
      reader.readAsArrayBuffer(file);
  }
    });

    posButton1.appendChild(customButton1);
    const panel = document.getElementById("FileOpen");
    panel?.appendChild(posButton1);

  return (
    <>
    <div className="[&>*]:ml-3 [&>*]:p-1 [&>*]:cursor-pointer [&>*]:rounded hover:[&>*]:bg-slate-200">
      <FontAwesomeIcon
        data-testid="bold"
        style={currentStyle?.fontWeight ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('fontWeight', 'bold')}
        icon={faBold}
      />
      <FontAwesomeIcon
        data-testid="italic"
        style={currentStyle?.fontStyle ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('fontStyle', 'italic')}
        icon={faItalic}
      />
      <FontAwesomeIcon
        data-testid="underline"
        style={currentStyle?.textDecoration ? { backgroundColor: 'gray' } : {}}
        onClick={clickHandler('textDecoration', 'underline')}
        icon={faUnderline}
      />
    </div>
    <div id="FileOpen"></div>
    </>
  );
}

export default Toolbar;
