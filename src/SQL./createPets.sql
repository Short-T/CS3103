DROP TABLE IF EXISTS pets;
CREATE Table pets (
    PetId INT NOT NULL AUTO_INCREMENT,
    PetSpecies VarChar(50) DEFAULT NULL,
    PetBreed VarChar(50) DEFAULT NULL,
    PetName VarChar(50) DEFAULT NULL,
    PetAge VarChar(50) DEFAULT NULL,
    UserId INT,
    PRIMARY KEY(PetId),
    FOREIGN KEY (UserId) REFERENCES users(UserId)
);