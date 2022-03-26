DELIMITER //
DROP PROCEDURE IF EXISTS putImage //
CREATE PROCEDURE putImage(IN fileExtension VARCHAR(55), IN fName VARCHAR(50), IN fPath VARCHAR(50))
BEGIN   
    INSERT INTO images(ImageFileExtension, ImageFileName, ImagePath) VALUE
        (fileExtension, fName, fPath);
END //
DELIMITER ;