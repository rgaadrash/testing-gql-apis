const users = [
  { id: "1", name: "Aadarsh", age: 30, jobId: "101" }
];

const jobs = [
  { jobId: "101", organisation: "OpenAI", years: 2 }
];

export const resolvers = {
  User: {
    job: (parent) => jobs.find(j => j.jobId === parent.jobId),
  },

  Query: {
    users: () => users,
    user: (_, { id }) => users.find(u => u.id === id),
    jobs: () => jobs,
    job: (_, { jobId }) => jobs.find(j => j.jobId === jobId),
  },

  Mutation: {
    createUser: (_, { id, name, age, jobId }) => {
      const newUser = { id, name, age, jobId };
      users.push(newUser);
      return newUser;
    },
    createJob: (_, { jobId, organisation, years }) => {
      const newJob = { jobId, organisation, years };
      jobs.push(newJob);
      return newJob;
    },
  },
};
