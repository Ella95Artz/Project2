-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: imageshare
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comments` (
  `commentID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` int(10) unsigned DEFAULT NULL,
  `imgID` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`commentID`),
  KEY `userID` (`userID`),
  KEY `imgID` (`imgID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Nice','2019-04-20 17:26:24',3,1),(2,'Hm','2019-04-20 17:33:59',4,6),(3,'This is a comment','2019-04-20 17:34:15',4,3),(4,'My pic is better','2019-04-20 17:34:30',4,4),(5,'Nice','2019-04-20 17:34:44',4,5),(6,'This is a comment','2019-04-20 17:35:24',3,8),(7,'Noooo','2019-04-20 17:35:45',3,5),(8,'Show-off','2019-04-20 17:38:18',2,2),(9,'Nice','2019-04-20 17:38:35',2,4),(10,'This is a comment','2019-04-20 17:39:00',2,5),(11,'Buhu','2019-04-20 17:39:57',1,3),(12,'Nice','2019-04-20 17:40:24',1,8),(13,'Home Sweet Home','2019-04-20 17:41:03',1,6),(14,'Nice ','2019-04-20 17:42:46',4,7),(15,'Show-off','2019-04-20 17:49:26',4,3),(16,'Hm','2019-04-20 17:50:04',4,8),(17,'Ne','2019-04-20 18:14:57',4,2),(18,'Test','2019-04-20 18:17:34',4,4),(19,'Haha','2019-04-20 18:34:04',1,2),(20,'A second comment','2019-04-20 18:36:07',2,5),(21,'Comment 2','2019-04-20 18:47:58',4,2),(22,'This is a Comment','2019-04-20 18:56:30',1,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `image` (
  `imgID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `imgTitle` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `filename` varchar(70) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uploadDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `userID` int(10) unsigned DEFAULT NULL,
  `numlikes` int(10) unsigned NOT NULL DEFAULT '0',
  `numComments` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`imgID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'Starling City','1555780976663_4_night.jpg','uploads/','2019-04-20 19:22:56',4,3,2),(2,'City Wlak','1555781224619_3_fun.jpg','uploads/','2019-04-20 19:27:04',3,4,4),(3,'Great Day','1555781319328_3_flashday.png','uploads/','2019-04-20 19:28:39',3,3,3),(4,'Nightlights','1555781361458_1_catco.PNG','uploads/','2019-04-20 19:29:21',1,2,3),(5,'National City','1555781378787_1_nc.jpg','uploads/','2019-04-20 19:29:38',1,2,4),(6,'Home','1555781443702_2_smallville.jpg','uploads/','2019-04-20 19:30:43',2,2,2),(7,'The Daily Planet','1555781464081_2_DailyPlanet.PNG','uploads/','2019-04-20 19:31:04',2,2,1),(8,'Metropolis','1555781482112_2_metropolis.PNG','uploads/','2019-04-20 19:31:22',2,3,3);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes` (
  `imgID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,4),(1,3),(2,3),(3,3),(6,4),(3,4),(4,4),(5,4),(8,3),(5,3),(2,2),(6,2),(4,2),(7,2),(1,2),(3,1),(8,1),(7,4),(2,4),(8,4),(2,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `userID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstname` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `surname` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Supergirl','Kara','Danvers','kdenvers@CatCo.com','krypton123','2019-04-20 18:18:37'),(2,'Smallville','Clark','Kent','ckent@dailyplanet.com','superman','2019-04-20 18:19:26'),(3,'Flash','Barry',' Allen','barry.allen@StarLabs.com','flashpoint1','2019-04-20 18:24:57'),(4,'Arrow','Oliver','Queen','queen@StarlingCity.com','green','2019-04-20 18:29:26');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-20 21:09:00
