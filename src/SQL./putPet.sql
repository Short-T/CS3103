DELIMITER //
DROP PROCEDURE IF EXISTS putPet //
CREATE PROCEDURE putPet(IN species VARCHAR(55), IN breed VARCHAR(50), IN pName VARCHAR(50), IN age INT)
BEGIN   
    INSERT INTO pets(PetSpecies, PetBreed, PetName, PetAge) VALUE
        (species, breed, pName, age);
    
    IF(ROW_COUNT() = 0) THEN
      SIGNAL SQLSTATE '52712'
        SET MESSAGE_TEXT = 'Unable to create the pet';
    END IF;

    SELECT LAST_INSERT_ID();
END //
DELIMITER ;
