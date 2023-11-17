import React, { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, PencilSquareIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import {BACKEND_URL} from '../../constants.js';

export function InstrumentTable({isOwnPage, displayedUserId}) {
    const [instrumentsList, setInstrumentsList] = useState([])
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [newInstrument, setNewInstrument] = useState ({
        name: "",
        instrumentExperience: ""
    })

    useEffect(() => {
        const getInstrumentInfo = async () => {
            const instrumentInfo = await axios.get(`${BACKEND_URL}/users/${displayedUserId}/instruments`)
            setInstrumentsList(instrumentInfo.data.playedInstruments);
        }
        getInstrumentInfo();
    }, [])

    const writeData = () => {
        setIsBeingEdited(false);
        alert('insert code to write current state to database')
    }

  const revertData = async () => {
    const instrumentInfo = await axios.get(`${BACKEND_URL}/users/${displayedUserId}/instruments`)
    setIsBeingEdited(false);
    setInstrumentsList(instrumentInfo.data.playedInstruments);
  }

  const addRow = () => {
    setInstrumentsList((prevState)=>{
        prevState.push(Object.values(newInstrument))
        console.log(prevState)
        prevState.sort((a,b)=>b[1]-a[1])
        console.log(prevState)
        return [...prevState]
        //may need to do some sorting
    })
    setNewInstrument({
        name: "",
        instrumentExperience: ""
    })
  }

  const removeRow = (index) => {
    console.log(index)
    setInstrumentsList((prevState)=>{
        prevState.splice(index,1)
        console.log(prevState)
        return [...prevState]
    })
  }

  const inputChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setNewInstrument((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

    const instrumentRows = instrumentsList.map((instrument, index) => {
        return (
          <tr key={index} id={instrument}>
            <td className="inline pr-[.5em]">
              {instrument[0].toUpperCase()}
            </td>
            <td>{instrument[1]}</td>
            <td>{isBeingEdited ? 
                <div>
                <label for={`deleteRow-instruments-${index}`} >
                    <TrashIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
                </label>
                <button onClick={() => removeRow(index)} id={`deleteRow-instruments-${index}`} style={{ display: "none" }} />
            </div>
            : null}</td>
          </tr>
        );
      })

      const newEntryRow =
        <tr key='newEntry' id='newEntry'>
            <td className="inline pr-[.5em] text-lg">
            <input
                placeholder="Instrument"
                type="text"
                name="instrument"
                id="name"
                size="10"
                value={newInstrument.name}
                onChange={(e) => {
                    inputChange(e);
                }}
            />
            </td>
            <td className = 'text-lg'>
            <input
                placeholder="Experience(y)"
                type="text"
                name="experience(y)"
                id="instrumentExperience"
                size="10"
                value={newInstrument.instrumentExperience}
                onChange={(e) => {
                    inputChange(e);
                }}
            />
            </td>
            <td>               
                <label for={`addRow-instruments`} >
                    <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
                </label>
                <button onClick={() => addRow()} id={`addRow-instruments`} style={{ display: "none" }} />
            </td>
          </tr>

      
    return (
        <div>
        {console.log(instrumentsList)}
            <div className='flex flex-row'>
                <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left mx-2">
                    INSTRUMENTS/EXPERIENCE
                </h1>
                {isBeingEdited ?
                    <div className='flex flex-row'>
                        <label for={`confirmButton-instruments`} >
                            <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
                        </label>
                        <button
                            id={`confirmButton-instruments`}
                            style={{ display: "none" }}
                            onClick={() => {
                                writeData();
                            }}
                        />
                        <label for={`rejectButton-instruments`} >
                            <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                        </label>
                        <button
                            id={`rejectButton-instruments`}
                            style={{ display: "none" }}
                            onClick={() => {
                                revertData();
                            }}
                        />
                    </div>
                    : null}
                <label for={`editButton-instruments`} >
                    {(isOwnPage && !isBeingEdited) ? <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" /> : null}
                </label>
                <button onClick={() => setIsBeingEdited(true)} id={`editButton-instruments`} style={{ display: "none" }} />
            </div>
            <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em]">
                <table>
                    <tbody>
                        {instrumentRows}
                        {isBeingEdited ? newEntryRow : null}
                    </tbody>
                </table>
            </div>
        </div>
        
    )

}