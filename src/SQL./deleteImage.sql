DELIMITER //
DROP PROCEDURE IF EXISTS deleteImage //

CREATE PROCEDURE deleteImage(IN id VARCHAR(55))
BEGIN
  DELETE
    FROM pets
    WHERE id=ImageId;
END //
DELIMITER ;