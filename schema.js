import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    job: Job
  }

  type Job {
    jobId: ID!
    organisation: String!
    years: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    jobs: [Job!]!
    job(jobId: ID!): Job
  }

  type Mutation {
    createUser(id: ID!, name: String!, age: Int!, jobId: ID): User!
    createJob(jobId: ID!, organisation: String!, years: Int!): Job!
  }
`;
