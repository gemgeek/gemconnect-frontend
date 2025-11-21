import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
      # If your backend returns a token here, uncomment the next line
      # token 
    }
  }
`;

export const LOGIN_USER = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      # payload  <-- You can ask for payload if you want, but NOT user
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $imageData: String) {
    createPost(content: $content, imageData: $imageData) {
      post {
        id
        content
        image
        author {
          username
        }
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      post {
        id
        likes {
          id
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      comment {
        id
        text
        createdAt
        author {
          username
        }
      }
    }
  }
`;