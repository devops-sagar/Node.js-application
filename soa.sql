-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 08, 2019 at 07:18 PM
-- Server version: 5.5.58-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `soa`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_user_id` int(11) NOT NULL,
  `media_type` varchar(20) NOT NULL,
  `media_url` text NOT NULL,
  `title` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_user_id` (`fk_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `fk_user_id`, `media_type`, `media_url`, `title`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 'Image', '/home/sotsys-221/Documents/SVN/demo_soa/server/uploads/posts/media-1549629284710.jpg', 'fgfgjfj', 'hjfjfgjgfj', 1, '2019-02-08 12:34:44', '2019-02-08 12:34:44'),
(2, 4, 'Video', '/home/sotsys-221/Documents/SVN/demo_soa/server/uploads/posts/media-1549629365027.ogv', 'dfgdfg', 'dfgdfgdfg', 1, '2019-02-08 12:36:05', '2019-02-08 12:36:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `status` int(11) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `access_token` text NOT NULL,
  `login_at` datetime NOT NULL,
  `salt` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `phone`, `status`, `user_type`, `access_token`, `login_at`, `salt`, `created_at`, `updated_at`) VALUES
(4, 'haresh1520@gmail.com', 'Haresh Rabari', '$2a$10$FQbkTOau3eNEmPRrKhe//ewr78tl3gS6ixRpOEfRbw.AlJlI7aHgi', '123456789', 1, 'user', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIwOC0wMi0yMDE5IDM6NDA6NTAgcG0ifQ.8VDTp-fNuSTyNyHIFUy4uhGsjDrRadV9W7IvQVbb18g', '2019-02-08 10:05:51', '$2a$10$FQbkTOau3eNEmPRrKhe//e', '2019-02-08 07:27:01', '2019-02-08 07:27:01');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
