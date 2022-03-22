DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
  CookeId INT NOT NULL AUTO_INCREMENT,
  UserId INT,
  PRIMARY KEY (CookieId)
  FOREIGN KEY (UserId) REFERENCES users(UserId)
);