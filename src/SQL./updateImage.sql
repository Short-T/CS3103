DELIMITER //
DROP PROCEDURE IF EXISTS updateImages //
CREATE PROCEDURE updateImages(IN id INT, IN fileExtension VARCHAR(55), IN fName VARCHAR(50), IN fPath VARCHAR(50))
BEGIN
    UPDATE images 
        SET ImageFileExtension = fileExtension, ImageFileName = fName, ImageFilePath = fPath
        WHERE IdImage = id;
END //
DELIMITER ;