import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import Select from "react-select";

export function InstrumentTable({ isOwnPage, displayedUserId }) {
  const [userInstrumentsList, setUserInstrumentsList] = useState([]);
  const [fullInstrumentsList, setFullInstrumentsList] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newInstrument, setNewInstrument] = useState({
    instrument: { value: "", label: "" },
    instrumentExperience: "",
  });

  useEffect(() => {
    const getUserInstrumentsInfo = async () => {
      const userInstrumentsInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/instruments`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setUserInstrumentsList(userInstrumentsInfo.data.playedInstruments);
    };
    const getFullInstrumentsList = async () => {
      const fullInstrumentsInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/instruments/selectable`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setFullInstrumentsList(fullInstrumentsInfo.data);
    };
    getUserInstrumentsInfo();
    getFullInstrumentsList();
  }, []);

  const writeData = async () => {
    setIsBeingEdited(false);
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/instruments`,
      {
        userInstrumentsList,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  };

  const revertData = async () => {
    const instrumentInfo = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/${displayedUserId}/instruments`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    setIsBeingEdited(false);
    setUserInstrumentsList(instrumentInfo.data.playedInstruments);
  };

  const addRow = () => {
    const instrumentNames = new Set(
      userInstrumentsList.map((entry) => entry.instrument.label)
    );
    if (instrumentNames.has(newInstrument.instrument.label)) {
      alert(
        "Instrument is already listed, please delete previous entry and try again"
      );
    } else {
      setUserInstrumentsList((prevState) => {
        prevState.push(newInstrument);
        console.log(prevState);
        prevState.sort(
          (a, b) => b.instrumentExperience - a.instrumentExperience
        );
        console.log(prevState);
        return [...prevState];
      });
      setNewInstrument({
        instrument: { value: "", label: "" },
        instrumentExperience: "",
      });
    }
  };

  const removeRow = (index) => {
    console.log(index);
    setUserInstrumentsList((prevState) => {
      prevState.splice(index, 1);
      console.log(prevState);
      return [...prevState];
    });
  };

  const inputChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setNewInstrument((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSelectChange = (e) => {
    setNewInstrument((prevState) => {
      return { ...prevState, instrument: e };
    });
  };

  const instrumentRows = userInstrumentsList.map((entry, index) => {
    return (
      <tr key={index} id={entry.instrument.label}>
        <td className="inline pr-[.5em]">
          {entry.instrument.label.toUpperCase()}
        </td>
        <td>{entry.instrumentExperience}</td>
        <td>
          {isBeingEdited ? (
            <div>
              <label for={`deleteRow-instruments-${index}`}>
                <TrashIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
              </label>
              <button
                onClick={() => removeRow(index)}
                id={`deleteRow-instruments-${index}`}
                style={{ display: "none" }}
              />
            </div>
          ) : null}
        </td>
      </tr>
    );
  });

  const newEntryRow = (
    <tr key="newEntry" id="newEntry">
      <td className="inline pr-[.5em] text-lg">
        <Select // we need to figure out how to style this...
          defaultValue={{ value: "Instrument", label: "Instrument" }}
          size="10"
          options={fullInstrumentsList}
          value={newInstrument.instrument}
          onChange={(e) => handleSelectChange(e)}
        />
      </td>
      <td className="text-lg">
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
        <label for={`addRow-instruments`}>
          <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
        </label>
        <button
          onClick={() => addRow()}
          id={`addRow-instruments`}
          style={{ display: "none" }}
        />
      </td>
    </tr>
  );

  return (
    <div>
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
          INSTRUMENTS/EXPERIENCE
        </h1>
        {isBeingEdited ? (
          <div className="flex flex-row">
            <label for={`confirmButton-instruments`}>
              <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
            </label>
            <button
              id={`confirmButton-instruments`}
              style={{ display: "none" }}
              onClick={() => {
                writeData();
              }}
            />
            <label for={`rejectButton-instruments`}>
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
        ) : null}
        <label for={`editButton-instruments`}>
          {isOwnPage && !isBeingEdited ? (
            <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          ) : null}
        </label>
        <button
          onClick={() => setIsBeingEdited(true)}
          id={`editButton-instruments`}
          style={{ display: "none" }}
        />
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
  );
}
