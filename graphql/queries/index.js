import gql from 'graphql-tag';

export const GET_ALL_PROJECTS = gql`
  query getProjects {
    jobs {
      id
      name
      deadline_at
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query getProjects($id: ID!) {
    job(id: $id) {
      name
      deadline_at
      steps {
        id
        name
        status
      }
    }
  }
`;
