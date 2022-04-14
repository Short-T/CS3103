DELIMITER //
DROP PROCEDURE IF EXISTS putImage //
CREATE PROCEDURE putImage(IN fName VARCHAR(50), IN pet INT, IN iTitle VARCHAR(50), IN description VARCHAR(255))
BEGIN   
    INSERT INTO images(ImageFileName, PetId, ImageTitle, ImageDescription) VALUE
        (fName, pet, iTitle, description);
    IF(ROW_COUNT() = 0) THEN
      SIGNAL SQLSTATE '52713'
        SET MESSAGE_TEXT = 'Unable to create the image';
    END IF;
    
    SELECT LAST_INSERT_ID();
END //
DELIMITER ;
