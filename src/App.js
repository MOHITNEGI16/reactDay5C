// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [subjectName, setSubjectName] = useState("");
  const [hour, setHour] = useState("");
  const [allSubject, setAllSubject] = useState([]);

  useEffect(()=>{
    const localStoreSubject = localStorage.getItem('subject');
    if(localStoreSubject){
      setAllSubject(JSON.parse(localStoreSubject));
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('subject',JSON.stringify(allSubject));
  },[allSubject]);

  const addSubject = () => {
    if (!subjectName || !hour) {
      alert("User forget to fill either Subject or the Time ");
      return;
    } else {
      const updatedSubjects = [...allSubject, {subject: subjectName, hour: parseInt(hour)}];
      setAllSubject(updatedSubjects);
      setSubjectName("");
      setHour("");

      localStorage.setItem('subject',JSON.stringify(updatedSubjects));
    }
  };
  const changeHour = (index, val) => {
    const hourUpdate = [...allSubject];
    hourUpdate[index].hour += val;
    setAllSubject(hourUpdate);
    localStorage.setItem('subject', JSON.stringify(hourUpdate)); 
  };

 



  return (
    <div className='App'>
      <h2>Geekster Education Planner</h2>
      <div>
        <input
          type="text"
          placeholder="Subject"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hours"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <button onClick={addSubject}>Add Subject</button>
      </div>
      <ul>
        {allSubject.map((subject, index) => (
          <li key={index}>
            <span>
              {subject.subject}: {subject.hour} hours
            </span>
            <button onClick={() => changeHour(index, 1)}>+</button>
            <button onClick={() => changeHour(index, -1)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
