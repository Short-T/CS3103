DELIMITER //
DROP PROCEDURE IF EXISTS putUser //
CREATE PROCEDURE putUser(IN  userName VARCHAR(50))
BEGIN   
    INSERT INTO users(UserName) VALUE
        (userName);
    IF(ROW_COUNT()=0) THEN
        SIGNAL SQLSTATE '52700'
        SET MESSAGE_TEXT = 'Unable to create the user';
    END IF;
    SELECT LAST_INSERT_ID();
END //
DELIMITER ;
