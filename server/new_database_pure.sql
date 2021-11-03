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