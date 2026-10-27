-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 25, 2026 at 04:33 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_recipe_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `prep_time_minutes` int NOT NULL DEFAULT '0',
  `servings` int NOT NULL DEFAULT '1',
  `calories` float DEFAULT NULL,
  `protein` float DEFAULT NULL,
  `carbs` float DEFAULT NULL,
  `fat` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `user_id`, `title`, `prep_time_minutes`, `servings`, `calories`, `protein`, `carbs`, `fat`, `created_at`) VALUES
(1, 1, 'Orak Arik Telur Tomat', 15, 2, 210, 12.5, 4.2, 16.8, '2026-10-25 04:33:11'),
(2, 1, 'Nasi Goreng Ayam Simple', 20, 1, 450, 22, 55, 15, '2026-10-25 04:33:11'),
(3, 2, 'Sup Sayur Bening', 25, 3, 120, 4, 20, 2, '2026-10-25 04:33:11'),
(4, 3, 'Dada Ayam Panggang Herb', 30, 2, 320, 40, 2, 12, '2026-10-25 04:33:11'),
(5, 4, 'Smoothie Banana Oat', 10, 1, 280, 8, 48, 5, '2026-10-25 04:33:11');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_filters`
--

CREATE TABLE `recipe_filters` (
  `filter_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `max_cooking_time` int DEFAULT NULL,
  `diet_type` varchar(100) DEFAULT NULL,
  `allergies` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recipe_filters`
--

INSERT INTO `recipe_filters` (`filter_id`, `recipe_id`, `max_cooking_time`, `diet_type`, `allergies`) VALUES
(1, 1, 20, 'Rendah Karbohidrat', 'Tidak ada'),
(2, 2, 30, 'Tinggi Protein', 'Tidak ada'),
(3, 3, 25, 'Vegetarian', 'Alergi Kacang'),
(4, 4, 30, 'Keto', 'Alergi Seafood'),
(5, 5, 10, 'Rendah Lemak', 'Toleransi Laktosa Rendah');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `ingredient_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `category` enum('MAIN','PANTRY') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`ingredient_id`, `recipe_id`, `ingredient_name`, `category`) VALUES
(1, 1, 'Telur Ayam', 'MAIN'),
(2, 1, 'Tomat Segar', 'MAIN'),
(3, 1, 'Minyak Goreng', 'PANTRY'),
(4, 2, 'Nasi Putih', 'MAIN'),
(5, 2, 'Dada Ayam Fillet', 'MAIN');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_instructions`
--

CREATE TABLE `recipe_instructions` (
  `instruction_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `step_number` int NOT NULL,
  `instruction_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recipe_instructions`
--

INSERT INTO `recipe_instructions` (`instruction_id`, `recipe_id`, `step_number`, `instruction_text`) VALUES
(1, 1, 1, 'Kocok telur dalam wadah dan beri sedikit garam.'),
(2, 1, 2, 'Tumis tomat dan bawang hingga harum lalu masukkan kocokan telur.'),
(3, 2, 1, 'Panaskan minyak, tumis bumbu halus hingga wangi.'),
(4, 2, 2, 'Masukkan potongan ayam, masak hingga berubah warna lalu tambahkan nasi.'),
(5, 3, 1, 'Rebus air hingga mendidih, masukkan wortel dan kentang terlebih dahulu.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `picture_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `google_id`, `email`, `nama`, `picture_url`, `created_at`, `updated_at`) VALUES
(1, 'gid_101', 'ibad@example.com', 'Ibad', 'https://lh3.googleusercontent.com/a/photo1.jpg', '2026-10-25 04:33:11', '2026-10-25 04:33:11'),
(2, 'gid_102', 'grace@example.com', 'Grace', 'https://lh3.googleusercontent.com/a/photo2.jpg', '2026-10-25 04:33:11', '2026-10-25 04:33:11'),
(3, 'gid_103', 'zaki@example.com', 'Zaki', 'https://lh3.googleusercontent.com/a/photo3.jpg', '2026-10-25 04:33:11', '2026-10-25 04:33:11'),
(4, 'gid_104', 'rafif@example.com', 'Rafif', 'https://lh3.googleusercontent.com/a/photo4.jpg', '2026-10-25 04:33:11', '2026-10-25 04:33:11'),
(5, 'gid_105', 'habhindra@example.com', 'Habhindra', 'https://lh3.googleusercontent.com/a/photo5.jpg', '2026-10-25 04:33:11', '2026-10-25 04:33:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `idx_user_recipes` (`user_id`);

--
-- Indexes for table `recipe_filters`
--
ALTER TABLE `recipe_filters`
  ADD PRIMARY KEY (`filter_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD KEY `idx_recipe_ingredients` (`recipe_id`);

--
-- Indexes for table `recipe_instructions`
--
ALTER TABLE `recipe_instructions`
  ADD PRIMARY KEY (`instruction_id`),
  ADD KEY `idx_recipe_instructions` (`recipe_id`,`step_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recipe_filters`
--
ALTER TABLE `recipe_filters`
  MODIFY `filter_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  MODIFY `ingredient_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recipe_instructions`
--
ALTER TABLE `recipe_instructions`
  MODIFY `instruction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `recipe_filters`
--
ALTER TABLE `recipe_filters`
  ADD CONSTRAINT `recipe_filters_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;

--
-- Constraints for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;

--
-- Constraints for table `recipe_instructions`
--
ALTER TABLE `recipe_instructions`
  ADD CONSTRAINT `recipe_instructions_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
