/*
Navicat MySQL Data Transfer

Source Server         : MyLocalDb
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : qp_assessment

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2024-02-25 23:18:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_items`
-- ----------------------------
DROP TABLE IF EXISTS `t_items`;
CREATE TABLE `t_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `inventory` int(11) NOT NULL,
  `status` enum('I','A') NOT NULL DEFAULT 'A',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of t_items
-- ----------------------------
INSERT INTO `t_items` VALUES ('1', 'Apple', '1.99', '100', 'A', '2024-02-24 21:26:20', '2024-02-24 21:26:20');
INSERT INTO `t_items` VALUES ('2', 'Banana', '1.90', '140', 'A', '2024-02-24 21:27:20', '2024-02-25 23:05:18');
INSERT INTO `t_items` VALUES ('3', 'Orange', '2.49', '75', 'A', '2024-02-24 21:27:20', '2024-02-24 21:27:20');
INSERT INTO `t_items` VALUES ('4', 'Milk (1 Gallon)', '3.49', '50', 'A', '2024-02-24 21:27:20', '2024-02-24 21:27:20');
INSERT INTO `t_items` VALUES ('5', 'Bread (Whole Wheat)', '2.29', '80', 'A', '2024-02-24 21:27:20', '2024-02-24 21:27:20');
INSERT INTO `t_items` VALUES ('6', 'Eggs (Dozen)', '2.99', '100', 'A', '2024-02-24 21:27:20', '2024-02-24 21:27:20');
INSERT INTO `t_items` VALUES ('7', 'Chicken Breast (1 lb)', '5.99', '40', 'I', '2024-02-24 21:27:20', '2024-02-25 21:06:18');
INSERT INTO `t_items` VALUES ('8', 'Rice (5 lb bag)', '4.49', '60', 'A', '2024-02-24 21:27:20', '2024-02-24 21:27:20');
INSERT INTO `t_items` VALUES ('9', 'Pasta (1 lb bag)', '1.79', '70', 'A', '2024-02-24 21:27:20', '2024-02-24 21:27:20');
INSERT INTO `t_items` VALUES ('10', 'Tomatoes (1 lb)', '0.79', '120', 'A', '2024-02-24 21:27:20', '2024-02-24 21:27:20');

-- ----------------------------
-- Table structure for `t_orders`
-- ----------------------------
DROP TABLE IF EXISTS `t_orders`;
CREATE TABLE `t_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `t_orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of t_orders
-- ----------------------------
INSERT INTO `t_orders` VALUES ('1', '2', '26.93', '2024-02-25 22:27:05', '2024-02-25 22:27:05', '2024-02-25 22:30:00');
INSERT INTO `t_orders` VALUES ('2', '2', '5.98', '2024-02-25 22:30:36', '2024-02-25 22:30:36', '2024-02-25 22:30:36');

-- ----------------------------
-- Table structure for `t_order_items`
-- ----------------------------
DROP TABLE IF EXISTS `t_order_items`;
CREATE TABLE `t_order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `t_order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `t_orders` (`id`),
  CONSTRAINT `t_order_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `t_items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of t_order_items
-- ----------------------------
INSERT INTO `t_order_items` VALUES ('1', '1', '2', '5', '9.50', '2024-02-25 22:27:05', '2024-02-25 22:27:05');
INSERT INTO `t_order_items` VALUES ('2', '1', '3', '7', '17.43', '2024-02-25 22:27:05', '2024-02-25 22:27:05');
INSERT INTO `t_order_items` VALUES ('3', '2', '6', '2', '5.98', '2024-02-25 22:30:36', '2024-02-25 22:30:36');

-- ----------------------------
-- Table structure for `t_users`
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of t_users
-- ----------------------------
INSERT INTO `t_users` VALUES ('1', 'authorized_user', 'testing@gmail.com', '$2b$15$zTRZmgal4dpsrNLsUOhpBOjhapyc6wBzVAjiI4WwXCTDV8Zje64pK', 'admin', '2024-02-24 15:56:45', '2024-02-24 15:56:45');
INSERT INTO `t_users` VALUES ('2', 'user_one', 'testing_user@gmail.com', '$2b$15$FHPLfALacYUwon/YJkP4S.apdsg6HeYrHDqFr9BctvFBJmzu3qBGK', 'user', '2024-02-24 16:44:03', '2024-02-24 16:44:03');
