DROP DATABASE IF EXISTS NoteHubDB_pure;
CREATE DATABASE NoteHubDB_pure;

USE NoteHubDB_pure;

CREATE TABLE User (
    userId VARCHAR(255) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) DEFAULT "New user",
    email VARCHAR(255) NOT NULL,
    avatarUrl VARCHAR(255),
    UNIQUE(email)
);

CREATE TABLE UserLevel (
  userId VARCHAR(255) NOT NULL PRIMARY KEY,
  noteCount INTEGER DEFAULT 0,
  userLevel INTEGER DEFAULT 1
);


CREATE TABLE Subscription (
    userId VARCHAR(255) NOT NULL,
    followerId VARCHAR(255) NOT NULL,
    PRIMARY KEY(userId, followerId ),
    FOREIGN KEY(userId) REFERENCES User(userId)
  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(followerId) REFERENCES User(userId)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Note (
    noteId INTEGER PRIMARY KEY AUTO_INCREMENT,
    noteTitle VARCHAR(255) NOT NULL,
    dataId VARCHAR(255) NOT NULL,
    createdAt BIGINT(8) NOT NULL,
    likeCount INTEGER DEFAULT 0,
    viewCount INTEGER DEFAULT 0,
    commentCount INTEGER DEFAULT 0,
    ownerId VARCHAR(255),
    FOREIGN KEY (ownerId) REFERENCES User(userId)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NoteAccess (
    noteId INTEGER NOT NULL,
    userId VARCHAR(255) NOT NULL,
    accessStatus ENUM ("owner", "editor", "viewer") DEFAULT "viewer",
    PRIMARY KEY(noteId, userId),
    FOREIGN KEY(noteId) REFERENCES Note(noteId)
  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(userId) REFERENCES User(userId)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Comment (
    commentId INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255),
    noteId INTEGER,
    content VARCHAR(4095) NOT NULL,
    createdAt BIGINT(8) NOT NULL,
    likeCount INTEGER DEFAULT 0,
    parentId INTEGER DEFAULT NULL,
    FOREIGN KEY(noteId) REFERENCES Note(noteId)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(parentId) REFERENCES Comment(commentId)
	ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(userId) REFERENCES User(userId)
    ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Community (
    communityId INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(4095) NOT NULL,
    createdAt BIGINT(8) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    memberCount INTEGER DEFAULT 0,
    ownerId VARCHAR(255),
    FOREIGN KEY (ownerId) REFERENCES User(userId)
  ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Membership (
    communityId INTEGER NOT NULL,
    userId VARCHAR(255) NOT NULL,
    role ENUM ("member", "manager", "owner") DEFAULT "member",
    PRIMARY KEY(communityId, userId),
    FOREIGN KEY(communityId) REFERENCES Community(communityId)
  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(userId) REFERENCES User(userId)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE CommunityNote (
    communityId INTEGER NOT NULL,
    noteId INTEGER NOT NULL,
    PRIMARY KEY(communityId, noteId),
    FOREIGN KEY(communityId) REFERENCES Community(communityId)
  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(noteId) REFERENCES Note(noteId)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Category (
    categoryName VARCHAR(255) PRIMARY KEY
);

CREATE TABLE NoteCategory (
    categoryName VARCHAR(255) NOT NULL,
    noteId INTEGER NOT NULL,
    PRIMARY KEY(categoryName, noteId),
    FOREIGN KEY(categoryName) REFERENCES Category(categoryName)
  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(noteId) REFERENCES Note(noteId)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NoteLike (
    userId VARCHAR(255) NOT NULL,
    noteId INTEGER NOT NULL,
    PRIMARY KEY(userId, noteId),
    FOREIGN KEY(userId) REFERENCES User(userId)
  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(noteId) REFERENCES Note(noteId)
  ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE UserStatistics(
  categoryName VARCHAR(255) NOT NULL, 
  userLevel INTEGER NOT NULL,
  PRIMARY KEY(categoryName, userLevel),
  userLevelCounts INTEGER NOT NULL,
  FOREIGN KEY(categoryName) REFERENCES Category(categoryName)
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NoteStatistics(
    categoryName VARCHAR(255) NOT NULL PRIMARY KEY,
    notesCount INTEGER NOT NULL,
    avgLikeCounts INTEGER NOT NULL,
    avgViewCounts INTEGER NOT NULL,
    avgCommentCounts INTEGER NOT NULL,
    FOREIGN KEY(categoryName) REFERENCES Category(categoryName)
  ON DELETE CASCADE ON UPDATE CASCADE
);



DROP PROCEDURE IF EXISTS NoteHubStats ;
DELIMITER //
CREATE PROCEDURE NoteHubStats()
BEGIN
      DECLARE category VARCHAR(255);
      DECLARE ncount INTEGER;
      DECLARE categoryCur CURSOR FOR (
        SELECT DISTINCT categoryName, COUNT(noteId) AS notesCount
        FROM NoteCategory NATURAL JOIN Note
        GROUP BY categoryName
        ORDER BY notesCount DESC
        LIMIT 100
      );

      OPEN categoryCur;
      BEGIN
		    DECLARE done INTEGER DEFAULT 0;
		    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

        cloop: LOOP
          FETCH categoryCur INTO category, ncount;
          IF category = NULL THEN
            LEAVE cloop;
          ELSEIF done THEN
            LEAVE cloop;
          END IF;
			
          INSERT IGNORE INTO UserStatistics
          SELECT cate.categoryName, lev.userLevel, COUNT(lev.userId)
          FROM userLevel lev JOIN Note n ON(userId = ownerId) JOIN NoteCategory cate USING(noteId)
          WHERE cate.categoryName = category
          GROUP BY cate.categoryName, lev.userLevel
          ORDER BY lev.userLevel;

          INSERT IGNORE INTO NoteStatistics
          SELECT cate.categoryName, COUNT(n.noteId), 
          ROUND(AVG(n.likeCount), 0), ROUND(AVG(n.viewCount), 0), ROUND(AVG(n.commentCount), 0)
          FROM NoteCategory cate NATURAL JOIN Note n
          WHERE cate.categoryName = category
          GROUP BY categoryName;

		    END LOOP cloop;

      END;
      CLOSE categoryCur;

END //

DELIMITER ;



-- A trigger which listens for event when a insertion on note happens, 
-- it counts the current number of notes the user have had, 
-- and calculate the level of the user by the count of notes % 20, capped to 10

DROP TRIGGER IF EXISTS LevelTrig;
DELIMITER //
    CREATE TRIGGER LevelTrig
    AFTER INSERT ON Note
    FOR EACH ROW
	
    BEGIN
    UPDATE UserLevel SET noteCount = noteCount + 1 WHERE userId = NEW.ownerId;
		SET @level = (SELECT userLevel FROM UserLevel WHERE userId = NEW.ownerId);
    SET @numNotes = (SELECT noteCount FROM UserLevel WHERE userId = NEW.ownerId);
		IF @level < 10 AND MOD(@numNotes, 9) = 0 THEN
			UPDATE UserLevel SET userLevel = userLevel + 1 WHERE userId = NEW.ownerId;
		END IF;
    END;
 //
DELIMITER ;





insert into Category (categoryName) values ('Jaguar');
insert into Category (categoryName) values ('Dodge');
insert into Category (categoryName) values ('Mercedes-Benz');
insert into Category (categoryName) values ('Subaru');
insert into Category (categoryName) values ('Cadillac');
insert into Category (categoryName) values ('Lincoln');
insert into Category (categoryName) values ('Chevrolet');
insert into Category (categoryName) values ('Audi');
insert into Category (categoryName) values ('Toyota');
insert into Category (categoryName) values ('Mazda');
insert into Category (categoryName) values ('GMC');
insert into Category (categoryName) values ('Isuzu');
insert into Category (categoryName) values ('Ford');
insert into Category (categoryName) values ('Volvo');
insert into Category (categoryName) values ('Saab');
insert into Category (categoryName) values ('Volkswagen');