const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello Jhon";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 8800;

server.listen().then(({ url }) => {
  console.log(`Server is running on port ${url}`);
});
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
