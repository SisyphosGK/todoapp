import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      token_type
      expires_in
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation registerMutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      user_id
      access_token
    }
  }
`;

export const SET_TASK_STATUS = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      access_token
      token_type
      expires_in
    }
  }
`;

export const ADD_NEW_TASK = gql`
  mutation addNewTaskMutation($jobs_id: Int!, $name: String!, $status: Int!) {
    createStep(jobs_id: $jobs_id, name: $name, status: $status) {
      id
      name
      status
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProjectMutation($name: String!, $deadline_at: String!, $users: [Int]) {
    createJob(name: $name, deadline_at: $deadline_at, users: $users) {
      id
      name
      deadline_at
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfileMutation(
    $name: String!
    $email: String!
    $password: String
    $profilePicture: Upload
  ) {
    profile(name: $name, email: $email, password: $password, profilePicture: $profilePicture) {
      id
      name
      profile_img
    }
  }
`;
