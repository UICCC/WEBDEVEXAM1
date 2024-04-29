import React, { useState } from 'react';
import './Personnel.css'

function Personnel() {

 

    

    

    
    

    return (
        <>

<h1 className='feebacktitle'>Monthly Reports</h1>

<h2>November 2023</h2>
<table class="custom-table">
    <thead>
        <tr>
            <th>Ticket ID</th>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Course</th>
            <th>Equipment</th>
            <th>Room ID</th>
            <th>Request Date</th>
            <th>Borrow Time</th>
            <th>Return Date</th>
            <th>Approved by</th>
            <th>Feedback</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2</td>
            <td>220000001500</td>
            <td>John Doe</td>
            <td>Readings in Philippine History</td>
            <td>BSCS-2B</td>
            <td>HDMI Cord, LCD Microphone</td>
            <td>Room 1</td>
            <td>Nov. 29</td>
            <td>8:45 AM</td>
            <td>Nov. 30</td>
            <td>Eleanor</td>
            <td>Worked fine</td>
        </tr>
    </tbody>
</table>
<h2>December 2023</h2>
<table class="custom-table">
    <thead>
        <tr>
            <th>Ticket ID</th>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Course</th>
            <th>Equipment</th>
            <th>Room ID</th>
            <th>Request Date</th>
            <th>Borrow Time</th>
            <th>Return Date</th>
            <th>Approved by</th>
            <th>Feedback</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>4</td>
            <td>220000001501</td>
            <td>Emma Watson</td>
            <td>Web Development</td>
            <td>BSCS-2D</td>
            <td>Type-C HDMI Connector, Portable CD/DVD Player, Portable Wireless Amplifier</td>
            <td>None</td>
            <td>Dec. 1</td>
            <td>11:15 AM</td>
            <td>Dec. 2</td>
            <td>Eleanor</td>
            <td>Broken</td>
        </tr>
        <tr>
            <td>6</td>
            <td>220000001502</td>
            <td>Mia Johnson</td>
            <td>Programming</td>
            <td>BSCS-2F</td>
            <td>Bluetooth Speaker</td>
            <td>Room 2</td>
            <td>Dec. 3</td>
            <td>1:45 PM</td>
            <td>Dec. 4</td>
            <td>Eleanor</td>
            <td>Battery Longevity Issues</td>
        </tr>
    </tbody>
</table>
      
          
            
            
            </>

    );
}

export default Personnel;
