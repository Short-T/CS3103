DELIMITER //
DROP PROCEDURE IF EXISTS putPet //
CREATE PROCEDURE putPet(IN species VARCHAR(55), IN breed VARCHAR(50), IN pName VARCHAR(50), IN age INT)
BEGIN   
    INSERT INTO pets(PetSpecies, PetBreed, PetName, PetAge) VALUE
        (species, breed, pName, age);
END //
DELIMITER ;