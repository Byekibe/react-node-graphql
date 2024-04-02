import { GraphQLScalarType } from "graphql";

const DeleteBookResultScalar = new GraphQLScalarType({
  name: "DeleteBookResult",
  description: "Result of deleteBook mutation",
  parseValue(value) {
    // Convert the received value into the appropriate format (if needed)
    return value;
  },
  serialize(value) {
    // Convert the value into a representation that can be sent over the network
    return value;
  },
});

export { DeleteBookResultScalar };
