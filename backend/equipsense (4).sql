-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 03:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `equipsense`
--

-- --------------------------------------------------------

--
-- Table structure for table `avr`
--

CREATE TABLE `avr` (
  `roomID` int(11) NOT NULL,
  `roomBorrowStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avr`
--

INSERT INTO `avr` (`roomID`, `roomBorrowStatus`) VALUES
(1, 0),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `borrower`
--

CREATE TABLE `borrower` (
  `borrowerID` int(5) NOT NULL,
  `BorrowerPass` varchar(255) NOT NULL,
  `borrowerName` varchar(30) NOT NULL,
  `borrowerEmail` varchar(80) NOT NULL,
  `course` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrower`
--

INSERT INTO `borrower` (`borrowerID`, `BorrowerPass`, `borrowerName`, `borrowerEmail`, `course`) VALUES
(1, '123', 'Jasmine Patel', 'patel@example.com', 'bscs'),
(2, '123', 'Declan Murphy', 'murphy@example.com', 'bsit'),
(3, '123', 'Maya Johnson', 'johnson@example.com', 'bscs'),
(4, '123', 'Xavier Ramirez', 'ramirez@example.com', 'bsis'),
(5, '123', 'Emily Chang', 'chang@example.com', 'bscs'),
(123, '12345', 'test', 'test', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipmentID` int(5) NOT NULL,
  `equipmentName` varchar(30) NOT NULL,
  `equipmentDesc` varchar(255) NOT NULL,
  `equipmentBorrowStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipmentID`, `equipmentName`, `equipmentDesc`, `equipmentBorrowStatus`) VALUES
(1, 'Audio Cord', 'sample text', 0),
(2, 'Extension Wire', 'sample text', 0),
(3, 'HDMI Connector', 'sample text', 0),
(4, 'Ipad Connector', 'sample text', 0),
(5, 'Projector', 'sample text', 0);

-- --------------------------------------------------------

--
-- Table structure for table `equipmentfeedback`
--

CREATE TABLE `equipmentfeedback` (
  `feedbackDesc` varchar(255) NOT NULL,
  `feedbackID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `equipmentsetid`
--

CREATE TABLE `equipmentsetid` (
  `equipmentID` int(5) NOT NULL,
  `equipmentsetID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipmentsetid`
--

INSERT INTO `equipmentsetid` (`equipmentID`, `equipmentsetID`) VALUES
(1, 1),
(2, 1),
(1, 2),
(3, 2),
(5, 2),
(2, 3),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `monthlyreport`
--

CREATE TABLE `monthlyreport` (
  `reportID` int(5) NOT NULL,
  `ticketID` int(5) DEFAULT NULL,
  `reportDate` date NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monthlyreport`
--

INSERT INTO `monthlyreport` (`reportID`, `ticketID`, `reportDate`, `month`, `year`) VALUES
(1, NULL, '2024-04-29', 3, 2024),
(2, 1, '2024-04-29', 4, 2024),
(4, 2, '2024-05-12', 5, 2024);

-- --------------------------------------------------------

--
-- Table structure for table `monthlyreport_ticket`
--

CREATE TABLE `monthlyreport_ticket` (
  `id` int(11) NOT NULL,
  `monthlyreportsetid` int(5) NOT NULL,
  `ticket_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personnel`
--

CREATE TABLE `personnel` (
  `personnelID` int(5) NOT NULL,
  `PersonnelPass` varchar(255) NOT NULL,
  `personnelName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personnel`
--

INSERT INTO `personnel` (`personnelID`, `PersonnelPass`, `personnelName`) VALUES
(8000, '123', 'Yash'),
(9000, '123', 'Lillian Chen'),
(9001, '123', 'Elijah Rodriguez'),
(9002, '123', 'John Doe');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticketID` int(5) NOT NULL,
  `borrowerID` int(5) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `equipmentsetID` int(5) NOT NULL,
  `roomID` int(11) DEFAULT NULL,
  `requestDate` date NOT NULL,
  `requestStatus` tinyint(1) NOT NULL,
  `returnDate` date DEFAULT NULL,
  `returnStatus` tinyint(1) NOT NULL,
  `feedbackID` int(5) DEFAULT NULL,
  `personnelID` int(5) DEFAULT NULL,
  `reportID` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticketID`, `borrowerID`, `subject`, `equipmentsetID`, `roomID`, `requestDate`, `requestStatus`, `returnDate`, `returnStatus`, `feedbackID`, `personnelID`, `reportID`) VALUES
(1, 2, 'gec009', 1, 1, '2024-04-29', 0, NULL, 0, NULL, NULL, 2),
(2, 4, 'cs000', 3, 1, '2024-05-12', 0, NULL, 0, NULL, NULL, 4),
(3, 3, 'cc221', 3, 1, '2024-04-29', 0, NULL, 0, NULL, NULL, 2),
(4, 3, 'gec009', 1, 1, '2024-04-12', 0, NULL, 0, NULL, NULL, 2),
(6, 3, 'cs000', 2, 2, '2024-05-12', 0, NULL, 0, NULL, NULL, NULL),
(7, 5, 'gec010', 3, 1, '2024-05-12', 0, NULL, 0, NULL, NULL, NULL),
(8, 1, 'test', 2, NULL, '2024-05-12', 0, NULL, 0, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avr`
--
ALTER TABLE `avr`
  ADD PRIMARY KEY (`roomID`);

--
-- Indexes for table `borrower`
--
ALTER TABLE `borrower`
  ADD PRIMARY KEY (`borrowerID`),
  ADD UNIQUE KEY `borrowerID` (`borrowerID`,`borrowerName`,`borrowerEmail`),
  ADD UNIQUE KEY `borrowerID_2` (`borrowerID`,`borrowerName`,`borrowerEmail`),
  ADD UNIQUE KEY `borrowerName` (`borrowerName`),
  ADD UNIQUE KEY `borrowerEmail` (`borrowerEmail`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipmentID`);

--
-- Indexes for table `equipmentfeedback`
--
ALTER TABLE `equipmentfeedback`
  ADD PRIMARY KEY (`feedbackID`);

--
-- Indexes for table `equipmentsetid`
--
ALTER TABLE `equipmentsetid`
  ADD KEY `equipment_to_equipmentset` (`equipmentID`),
  ADD KEY `equipmentsetID` (`equipmentsetID`);

--
-- Indexes for table `monthlyreport`
--
ALTER TABLE `monthlyreport`
  ADD PRIMARY KEY (`reportID`);

--
-- Indexes for table `monthlyreport_ticket`
--
ALTER TABLE `monthlyreport_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_monthlyreportsetid` (`monthlyreportsetid`),
  ADD KEY `fk_ticket_id` (`ticket_id`);

--
-- Indexes for table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`personnelID`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticketID`),
  ADD KEY `equipmentset_to_ticket` (`equipmentsetID`),
  ADD KEY `avr_to_ticket` (`roomID`),
  ADD KEY `feedback_to_ticket` (`feedbackID`),
  ADD KEY `personnel_to_ticket` (`personnelID`),
  ADD KEY `borrower_to_ticket` (`borrowerID`),
  ADD KEY `ticket_to_monthlyreport` (`reportID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borrower`
--
ALTER TABLE `borrower`
  MODIFY `borrowerID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipmentID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `equipmentfeedback`
--
ALTER TABLE `equipmentfeedback`
  MODIFY `feedbackID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `monthlyreport`
--
ALTER TABLE `monthlyreport`
  MODIFY `reportID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `monthlyreport_ticket`
--
ALTER TABLE `monthlyreport_ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `personnelID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9004;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticketID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipmentsetid`
--
ALTER TABLE `equipmentsetid`
  ADD CONSTRAINT `equipment_to_equipmentset` FOREIGN KEY (`equipmentID`) REFERENCES `equipment` (`equipmentID`) ON UPDATE CASCADE;

--
-- Constraints for table `monthlyreport_ticket`
--
ALTER TABLE `monthlyreport_ticket`
  ADD CONSTRAINT `fk_monthlyreportsetid` FOREIGN KEY (`monthlyreportsetid`) REFERENCES `monthlyreport` (`reportID`),
  ADD CONSTRAINT `fk_ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticketID`);

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `avr_to_ticket` FOREIGN KEY (`roomID`) REFERENCES `avr` (`roomID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `borrower_to_ticket` FOREIGN KEY (`borrowerID`) REFERENCES `borrower` (`borrowerID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `equipmentset_to_ticket` FOREIGN KEY (`equipmentsetID`) REFERENCES `equipmentsetid` (`equipmentsetID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_to_ticket` FOREIGN KEY (`feedbackID`) REFERENCES `equipmentfeedback` (`feedbackID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `personnel_to_ticket` FOREIGN KEY (`personnelID`) REFERENCES `personnel` (`personnelID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_to_monthlyreport` FOREIGN KEY (`reportID`) REFERENCES `monthlyreport` (`reportID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
