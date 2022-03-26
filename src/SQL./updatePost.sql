DELIMITER //
DROP PROCEDURE IF EXISTS updatePost //
CREATE PROCEDURE updatePost(IN id INT, IN caption VARCHAR(55))
BEGIN
    UPDATE images 
        SET PostCaption = caption
        WHERE PostId = id;
END //
DELIMITER ;