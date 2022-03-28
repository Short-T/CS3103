DELIMITER //
DROP PROCEDURE IF EXISTS getUser //

CREATE PROCEDURE getUser(IN user INT)
BEGIN
    SELECT *
        FROM schools
            WHERE UserId = user;
END //
DELIMITER ;
