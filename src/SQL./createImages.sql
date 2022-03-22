DROP TABLE IF EXISTS images;
CREATE TABLE images (
    IdImage INT NOT NULL AUTO_INCREMENT,
    ImageFileExtension VarChar(50),
    ImageFileName VarChar(50),
    ImagePath VarChar(50),
    PetId Int,
    FOREIGN KEY(PetId) REFERENCES pets(PetId)
);