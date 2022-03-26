DELIMITER //
DROP PROCEDURE IF EXISTS getImage //

CREATE PROCEDURE getImage(IN id VARCHAR(55))
BEGIN
    SELECT *
        FROM schools
            WHERE IdImage = id;
END //
DELIMITER ;