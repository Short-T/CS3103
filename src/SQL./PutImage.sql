DELIMITER //
DROP PROCEDURE IF EXISTS putImage //
CREATE PROCEDURE putImage(IN fileExtension VARCHAR(55), IN fName VARCHAR(50), IN fPath VARCHAR(50))
BEGIN   
    INSERT INTO images(ImageFileExtension, ImageFileName, ImagePath) VALUE
        (fileExtension, fName, fPath);
    IF(ROW_COUNT() = 0) THEN
      SIGNAL SQLSTATE '52713'
        SET MESSAGE_TEXT = 'Unable to create the image';
    END IF;
    
    SELECT LAST_INSERT_ID();
END //
DELIMITER ;
