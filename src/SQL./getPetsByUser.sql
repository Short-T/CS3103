DELIMITER //
DROP PROCEDURE IF EXISTS getPetsByUser //

CREATE PROCEDURE getPetsByUser(IN id VARCHAR(55))
BEGIN
  SELECT *
    FROM pets
    WHERE id=UserId;
END //
DELIMITER ;