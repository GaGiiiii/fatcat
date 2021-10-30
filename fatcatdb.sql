-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2021 at 08:04 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fatcatdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `date`, `createdAt`, `updatedAt`, `UserId`) VALUES
(2, '2021-10-30 14:13:57', '2021-10-29 14:13:57', '2021-10-29 14:13:59', 1),
(3, '2021-10-30 14:14:59', '2021-10-29 14:14:59', '2021-10-29 14:15:07', 1),
(6, '2021-10-30 14:15:46', '2021-10-28 14:15:46', '2021-10-28 14:15:48', 1),
(7, '2021-10-30 14:29:36', '2021-10-27 14:29:36', '2021-10-27 14:29:37', 1),
(8, '2021-10-30 14:29:37', '2021-10-27 14:29:37', '2021-10-27 14:29:42', 1),
(10, '2021-10-30 14:29:47', '2021-10-29 14:29:47', '2021-10-29 14:29:51', 1),
(56, '2021-10-30 19:06:32', '2021-10-30 19:06:32', '2021-10-30 19:08:22', 1),
(57, '2021-10-30 19:09:20', '2021-10-30 19:09:20', '2021-10-30 19:11:00', 1),
(58, '2021-10-30 19:21:35', '2021-10-30 19:21:35', '2021-10-30 19:22:44', 1),
(61, '2021-10-30 19:58:36', '2021-10-30 19:58:36', '2021-10-30 19:58:57', 1),
(62, '2021-10-30 19:59:06', '2021-10-30 19:59:06', '2021-10-30 19:59:10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `createdAt`, `updatedAt`) VALUES
(1, 'gagi@gagi.com', 'gagi', 'gagi', '2021-10-30 14:13:47', '2021-10-30 14:13:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
