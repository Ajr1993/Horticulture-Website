CREATE DATABASE Horticulture;
GO

USE Horticulture;
GO

-- Drop the table if it exists
IF OBJECT_ID('USERS', 'U') IS NOT NULL
    DROP TABLE USERS;
GO

CREATE TABLE USERS (
    id INT IDENTITY(1,1) PRIMARY KEY,
    Firstname NVARCHAR(50) NOT NULL,
    Secondname NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50) NOT NULL UNIQUE,
    Password NVARCHAR(50) NOT NULL,
    Reset_Token NVARCHAR(30),
    Reset_Expiration DATE
);
GO
