DROP TABLE IF EXISTS images;
CREATE TABLE images (
    IdImage INT NOT NULL AUTO_INCREMENT,
    ImageFileName VarChar(50),
    PetId Int,
    ImageTitle VarChar(50),
    ImageDescription VarChar(255),
    PRIMARY KEY (IdImage),
    FOREIGN KEY(PetId) REFERENCES pets(PetId)
);
