DELIMITER //
DROP PROCEDURE IF EXISTS putImage //
CREATE PROCEDURE putImage(IN fileExtension VARCHAR(50), IN fPath VARCHAR(50), IN fName VARCHAR(50), IN pet INT, IN iTitle VARCAHR(50), IN description VARCHAR(255))
BEGIN   
    INSERT INTO images(ImageFileExtension, ImageFileName, ImagePath, PetId, ImageTitle, ImageDescription) VALUE
        (fileExtension, fPath, fName, pet, iTitle, description);
    IF(ROW_COUNT() = 0) THEN
      SIGNAL SQLSTATE '52713'
        SET MESSAGE_TEXT = 'Unable to create the image';
    END IF;
    
    SELECT LAST_INSERT_ID();
END //
DELIMITER ;
