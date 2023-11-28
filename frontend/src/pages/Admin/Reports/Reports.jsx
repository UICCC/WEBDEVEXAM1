import React, { useState } from 'react';
import './Reports.css'

function Report() {

 

    

    

    
    

    return (
        <>

<h1 className='feebacktitle'>Feedback</h1>
<table class="custom-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Equipment</th>
            <th>Rating</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Luke</td>
            <td>BSIT-4a</td>
            <td>Audio Cord</td>
            <td>5</td>
            <td>Worked fine</td>
        </tr>
        <tr>
            <td>Emma</td>
            <td>Engineering-3b</td>
            <td>Projector</td>
            <td>4</td>
            <td>Good quality</td>
        </tr>
        <tr>
            <td>Michael</td>
            <td>Business-2c</td>
            <td>Laptop</td>
            <td>3</td>
            <td>Slow performance</td>
        </tr>
        <tr>
            <td>Sophia</td>
            <td>Medicine-1d</td>
            <td>Microscope</td>
            <td>5</td>
            <td>Excellent clarity</td>
        </tr>
        <tr>
            <td>William</td>
            <td>Arts-5e</td>
            <td>Easel</td>
            <td>4</td>
            <td>Sturdy and reliable</td>
        </tr>
        <tr>
            <td>Ava</td>
            <td>Science-2f</td>
            <td>Lab Coat</td>
            <td>4</td>
            <td>Comfortable and durable</td>
        </tr>
    </tbody>
</table>
      
          
            
            
            </>

    );
}

export default Report;
