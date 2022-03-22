DELIMITER //
DROP PROCEDURE IF EXISTS getUser //

CREATE PROCEDURE getUser(IN user VARCHAR(55))
BEGIN
    SELECT *
        FROM schools
            WHERE UserName = user;
END //
DELIMITER ;