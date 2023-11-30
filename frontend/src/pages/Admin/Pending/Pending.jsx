import React, { useState } from 'react';
import './Pending.css'

function Pending() {

 

    const handleAccept = (name) => {
        // Implement your logic for accepting feedback here
        console.log(`Accepted feedback from ${name}`);
      };
    
      // Function to handle decline action
      const handleDecline = (name) => {
        // Implement your logic for declining feedback here
        console.log(`Declined feedback from ${name}`);
      };
    

    

    
    

    return (
        <>

<h1 className='pendingtitle'>Pending Requests</h1>
      <table className="custom-table-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Equipment</th>
            <th>Time</th>
            <th>Room</th>
            <th>Action</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Luke</td>
            <td>BSIT-4a</td>
            <td>Audio Cord</td>
            <td>5:30</td>
            <td>Room 1</td>
            <td>
              {/* Accept and Decline buttons */}
              <button onClick={() => handleAccept('Luke')}>Accept</button>
              <button onClick={() => handleDecline('Luke')}>Decline</button>
            </td>
          </tr>
          <tr>
            <td>Emma</td>
            <td>Engineering-3b</td>
            <td>Projector</td>
            <td>8:00</td>
            <td>Room 2</td>
            <td>
              <button onClick={() => handleAccept('Emma')}>Accept</button>
              <button onClick={() => handleDecline('Emma')}>Decline</button>
            </td>
          </tr>
          <tr>
            <td>Michael</td>
            <td>Business-2c</td>
            <td>Laptop</td>
            <td>3:00</td>
            <td>None</td>
            <td>
              <button onClick={() => handleAccept('Michael')}>Accept</button>
              <button onClick={() => handleDecline('Michael')}>Decline</button>
            </td>
          </tr>
          <tr>
            <td>Sophia</td>
            <td>Medicine-1d</td>
            <td>Microscope</td>
            <td>5:00</td>
            <td>Room 1</td>
            <td>
              <button onClick={() => handleAccept('Sophia')}>Accept</button>
              <button onClick={() => handleDecline('Sophia')}>Decline</button>
            </td>
          </tr>
          <tr>
            <td>William</td>
            <td>Arts-5e</td>
            <td>Easel</td>
            <td>4:00</td>
            <td>Room 1</td>
            <td>
              <button onClick={() => handleAccept('William')}>Accept</button>
              <button onClick={() => handleDecline('William')}>Decline</button>
            </td>
          </tr>
        </tbody>
      </table>
          
            
            
            </>

    );
}

export default Pending;
