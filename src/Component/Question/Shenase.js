import React, {Component} from 'react';
import { faQuestion,faAtom,faInfinity,faFlask,faDna,faThermometerFull,faThermometerHalf,faThermometerEmpty,faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Shenase(props){
    return(
        <div style={{color : 'gray'}}>
         <FontAwesomeIcon icon={faQuestion} size="1x" style={{color: '#ee6c4d'}}/>
         <span>
         {Object.entries(props.category.type).map((types) => {
           return(
             (types[0] === props.q.type ? (<span>&nbsp;{types[1]}&nbsp;</span>): null)
         )})}
         {Object.entries(props.category.course).map((courses) => {
           return(
             (courses[0] === props.q.course ? (<span>&nbsp;{courses[1]}&nbsp;</span>): null)
         )})}
         <span>{props.q.course === "MATH" ? (<FontAwesomeIcon icon={faInfinity} style={{color: 'blue'}}/>) : 
          props.q.course === "PHYSIC" ? (<FontAwesomeIcon icon={faAtom} style={{color: 'blue'}}/>) : 
          props.q.course === "CHEMISTRY" ? (<FontAwesomeIcon icon={faFlask} style={{color: 'blue'}}/>) : 
          props.q.course === "BIOLOGY" ? (<FontAwesomeIcon icon={faDna} style={{color: 'blue'}}/>) : null
         }</span>
         {Object.entries(props.category.hardness).map((hardnesses) => {
           return(
             (hardnesses[0] === props.q.hardness ? (<span>&nbsp;{hardnesses[1]}&nbsp;</span>): null)
         )})}
         <span>{props.q.hardness === "LOW" ? (<FontAwesomeIcon icon={faThermometerEmpty} style={{color: 'green'}}/>) : 
                props.q.hardness === "MEDIUM" ? (<FontAwesomeIcon icon={faThermometerHalf} style={{color: 'orange'}}/>) : 
                props.q.hardness === "HARD" ? (<FontAwesomeIcon icon={faThermometerFull} style={{color: 'red'}}/>) : null
         }</span>
         {Object.entries(props.category.base).map((bases) => {
           return(
             (bases[0] === props.q.base ? (<span>&nbsp;{bases[1]}&nbsp;</span>): null)
         )})}
         {Object.entries(props.category.chapter).map((chapters) => {
           return(
             (chapters[0] === props.q.chapter ? (<span>&nbsp;فصل&nbsp;&nbsp;{chapters[1]}&nbsp;</span>): null)
         )})}
         </span>
         </div>
    )
}

export default Shenase;