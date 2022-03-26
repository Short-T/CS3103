DELIMITER //
DROP PROCEDURE IF EXISTS updatePets //
CREATE PROCEDURE updatePets(IN id INT, IN species VARCHAR(55), IN breed VARCHAR(50), IN pName VARCHAR(50), IN age INT)
BEGIN
    UPDATE images 
        SET PetSpecies = species, PetBreed = breed, PetName = pName, PetAge = age
        WHERE PetId = id;
END //
DELIMITER ;