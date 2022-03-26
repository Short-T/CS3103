DELIMITER //
DROP PROCEDURE IF EXISTS getPosts //

CREATE PROCEDURE getPosts(IN id VARCHAR(55))
BEGIN
  SELECT *
    FROM posts
    WHERE PostId = id;
END //
DELIMITER ;