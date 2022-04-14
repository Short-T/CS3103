DELIMITER //
DROP PROCEDURE IF EXISTS getPosts //

CREATE PROCEDURE getPosts()
BEGIN
  SELECT *
    FROM images
      order by ImageId desc;
END //
DELIMITER ;
