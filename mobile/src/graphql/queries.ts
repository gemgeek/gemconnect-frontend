import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    allPosts {
      id
      content
      image
      createdAt
      author {
        id
        username
        avatar
        isVerified
      }
      likes {
        id
      }
      # UPDATED: Fetch full comment details
      comments {
        id
        text
        createdAt
        author {
          username
          avatar
        }
      }
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    myNotifications {
      id
      notificationType
      isRead
      createdAt
      sender {
        id
        username
        avatar
      }
      post {
        id
        content
        image
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    user(id: $userId) {
      id
      username
      bio
      avatar
      isVerified
      followersCount
      followingCount
      isFollowing
      postSet {
        id
        image
      }
    }
  }
`;