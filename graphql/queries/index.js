import gql from 'graphql-tag';

export const GET_ALL_PROJECTS = gql`
  query getAllProjects($limit: Int, $page: Int) {
    jobs(limit: $limit, page: $page) {
      total
      last_page
      current_page
      has_more_pages
      data {
        id
        name
        deadline_at
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: ID!) {
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
