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
  mutation addNewTask($jobs_id: Int!, $name: String!, $status: Int!) {
    createStep(jobs_id: $jobs_id, name: $name, status: $status) {
      id
      name
      status
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation addNewTask($name: Int!, $deadline_at: String!, $users: Int!) {
    createJob(name: $name, deadline_at: $deadline_at, users: $users) {
      id
      name
      deadline_at
    }
  }
`;
