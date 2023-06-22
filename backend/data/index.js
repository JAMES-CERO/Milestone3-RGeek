import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "test",
    lastName: "me",
    email: "abcd@gmail.com",
    password: "abcd1234",
    picturePath: "user0.jpeg",
    friends: [],
    location: "San Fran, CA",
    occupation: "Software Engineer",
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "SRalph@gmail.com",
    password: "abcd5678",
    picturePath: "user1.jpeg",
    friends: [],
    location: "New York, CA",
    occupation: "Degenerate",
  },
  {
    _id: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "abcd1234",
    picturePath: "user2.jpeg",
    friends: [],
    location: "Canada, CA",
    occupation: "Data Scientist Hacker",
  },
  {
    _id: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "abcd5678",
    picturePath: "user3.jpeg",
    friends: [],
    location: "Korea, CA",
    occupation: "Educator",
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    location: "New York, CA",
    description: "NEW POST! review my GWEEK profile",
    picturePath: "post0.jpeg",
    userPicturePath: "user1.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
    ]),
    comments: [
      "random comment",
      "another random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    location: "Korea, CA",
    description:
      "Stretching !",
    picturePath: "post3.jpeg",
    userPicturePath: "user3.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "one more random comment",
      "and another random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    location: "Canada, CA",
    description:
    "Family vacation!!",
    picturePath: "post2.jpeg",
    userPicturePath: "user2.jpeg",
    likes: new Map([
        [userIds[2], true],
        [userIds[3], true],
      ]),
      comments: [
        "one more random comment, no more",
        "I lied, one more random comment",
      ],
  },
];