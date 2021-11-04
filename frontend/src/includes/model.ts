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
  accessStatus: string; // NoteAccess
  ownerId: number; // User
  ownerName: string; // full name (firstName + ' ' + lastName)
  owner: User;
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

interface CommunityRole {
  role: string; // Owner, Manager, Member
  icon: string; // icon name
  users: Array<User>;
}

interface Comment {
  commentId: number;
  noteId: number;
  user: User;
  content: string;
  parendId: number;
  createdAt: number;
  likeCount: number;
  replies?: Array<Comment>; // do not add this field for now
}

// const members = Array<CommunityRole>;
interface CommunityNote {
  noteId: number;
  dataId: string;
  noteTitle: string;
  createdAt: Date;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  owner: User;
  comments: Array<Comment>;
}

interface SearchUser {
  userId: number;
  name: string; // concat(firstName + ' ' + lastName)
  subtitle: string;
  email: string;
  avatarUrl: string;
  searchFields: Array<string>; // [firstName, lastName, email]
}
