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

export const UPDATE_TASK = gql`
  mutation updateTask($step_id: Int!, $name: String!, $status: Int!) {
    updateStep(step_id: $step_id, name: $name, status: $status) {
      id
      name
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTaskMutation($step_id: Int!) {
    deleteStep(step_id: $step_id)
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
    $current_password: String!
    $profilePicture: Upload
  ) {
    profile(
      name: $name
      email: $email
      password: $password
      current_password: $current_password
      profilePicture: $profilePicture
    ) {
      id
      name
      profilePicture
    }
  }
`;
