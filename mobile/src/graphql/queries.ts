import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    allPosts {
      id
      content
      image
      createdAt
      author {
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