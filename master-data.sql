-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 17, 2022 at 04:20 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `0SdWcubgQ9`
--

-- --------------------------------------------------------

--
-- Table structure for table `vaccinationappointment`
--

CREATE TABLE `vaccinationappointment` (
  `appointmentid` bigint(20) NOT NULL,
  `slotid` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `icnumber` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vaccinationcenters`
--

CREATE TABLE `vaccinationcenters` (
  `centerid` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(1000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vaccinationcenters`
--

INSERT INTO `vaccinationcenters` (`centerid`, `location`) VALUES
('BUKIT-BATOK-CC', 'Bukit Batok CC'),
('BUKIT-PANJANG-CC', 'Bukit Panjang CC'),
('BUKIT-TIMAH-CC', 'Bukit Timah CC'),
('OUTRAM-PARK-POLYCLINIC', 'Outram Park Polyclinic');

-- --------------------------------------------------------

--
-- Table structure for table `vaccinationslots`
--

CREATE TABLE `vaccinationslots` (
  `slotid` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slotsavailable` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `centerid` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vaccinationslots`
--

INSERT INTO `vaccinationslots` (`slotid`, `slotsavailable`, `start`, `end`, `centerid`) VALUES
('BUKIT-BATOK-CC-202204170900', 10, '2022-04-17 09:00:00', '2022-04-17 10:00:00', 'BUKIT-BATOK-CC'),
('BUKIT-BATOK-CC-202204171000', 10, '2022-04-17 10:00:00', '2022-04-17 11:00:00', 'BUKIT-BATOK-CC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vaccinationappointment`
--
ALTER TABLE `vaccinationappointment`
  ADD PRIMARY KEY (`appointmentid`),
  ADD UNIQUE KEY `icnumber` (`icnumber`),
  ADD KEY `slotid` (`slotid`);

--
-- Indexes for table `vaccinationcenters`
--
ALTER TABLE `vaccinationcenters`
  ADD PRIMARY KEY (`centerid`);

--
-- Indexes for table `vaccinationslots`
--
ALTER TABLE `vaccinationslots`
  ADD PRIMARY KEY (`slotid`),
  ADD KEY `centerid` (`centerid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vaccinationappointment`
--
ALTER TABLE `vaccinationappointment`
  ADD CONSTRAINT `fk_slotid` FOREIGN KEY (`slotid`) REFERENCES `vaccinationslots` (`slotid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `vaccinationslots`
--
ALTER TABLE `vaccinationslots`
  ADD CONSTRAINT `fk_centerid` FOREIGN KEY (`centerid`) REFERENCES `vaccinationcenters` (`centerid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
