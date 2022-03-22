DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    PostId INT NOT NULL AUTO_INCREMENT,
    PostCaption VarChar(50),
    PetId INT,
    ImageId Int,
    FOREIGN KEY(PetId) REFERENCES pets(PetId),
    FOREIGN KEY(ImageId) REFERENCES images(ImageId)
);