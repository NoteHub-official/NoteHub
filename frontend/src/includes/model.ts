interface User {
  userId: number;
  firstName: string;
  lastName: string;
  subtitle: string;
  email: string;
  avatarUrl: string;
}

interface Note {
  noteId: number;
  dataId: string;
  noteTitle: string;
  createdAt: Date;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  accessStatus: string;     //NoteAccess
  ownerId: number;          //NoteAccess one row
  ownerName: string; // full name  //User first+last
  sharedUsers: Array<User>; // add this field if accessStatus == "owner"; otherwise, leave it as []
  categories: Array<Category>;
}

interface Community {
  communityId: number;
  name: string;
  description: string;
  createdAt: Date;
  photo: string;
  memberCount: number;
  owner: User;
}

interface Category {
  categoryName: string;
}
