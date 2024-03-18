-- Create syntax for TABLE 'brands'
CREATE TABLE `brands` (
                          `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                          `name` varchar(100) NOT NULL DEFAULT '',
                          `description` text DEFAULT NULL,
                          `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `deleted_at` datetime(3) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `brand.name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'colors'
CREATE TABLE `colors` (
                          `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                          `name` varchar(191) NOT NULL,
                          `hex_code` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                          `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `deleted_at` datetime(3) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `color.name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'contributions'
CREATE TABLE `contributions` (
                                 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                                 `user_id` int(11) unsigned NOT NULL,
                                 `foreign_table` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
                                 `foreign_id` int(11) unsigned NOT NULL,
                                 `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
                                 `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                 `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                                 `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                                 `deleted_at` datetime(3) DEFAULT NULL,
                                 PRIMARY KEY (`id`),
                                 KEY `contribution.user_id` (`user_id`),
                                 KEY `contribution.foreign_table` (`foreign_table`),
                                 KEY `contribution.foreign_id` (`foreign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'images'
CREATE TABLE `images` (
                          `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                          `user_id` int(11) unsigned DEFAULT NULL,
                          `foreign_table` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
                          `foreign_id` int(11) unsigned NOT NULL,
                          `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                          `caption` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                          `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `deleted_at` datetime(3) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `image.user_id` (`user_id`),
                          KEY `image.foreign_table` (`foreign_table`),
                          KEY `image.foreign_id` (`foreign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'models'
CREATE TABLE `models` (
                          `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                          `name` varchar(100) NOT NULL DEFAULT '',
                          `brand_id` int(11) unsigned NOT NULL,
                          `description` varchar(191) DEFAULT NULL,
                          `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                          `deleted_at` datetime(3) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `model.brand_id` (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'sneakers'
CREATE TABLE `sneakers` (
                            `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                            `name` varchar(100) NOT NULL DEFAULT '',
                            `model_id` int(11) unsigned NOT NULL,
                            `release_date` datetime(3) DEFAULT NULL,
                            `colorway` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                            `retail_price` double DEFAULT NULL,
                            `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                            `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                            `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                            `deleted_at` datetime(3) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            KEY `sneaker.model_id` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'sneakers_colors'
CREATE TABLE `sneakers_colors` (
                                   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                                   `sneaker_id` int(11) NOT NULL,
                                   `color_id` int(11) NOT NULL,
                                   PRIMARY KEY (`id`),
                                   UNIQUE KEY `sneaker_color` (`sneaker_id`,`color_id`),
                                   KEY `sneaker_id` (`sneaker_id`),
                                   KEY `color_id` (`color_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create syntax for TABLE 'users'
CREATE TABLE `users` (
                         `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                         `email` varchar(191) NOT NULL,
                         `name` varchar(191) DEFAULT NULL,
                         `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                         `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
                         `deleted_at` datetime(3) DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         KEY `user.email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;