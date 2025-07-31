import { graphql } from 'graphql'; // Or import your preferred GraphQL execution method
import { makeExecutableSchema } from '@graphql-tools/schema'; // or your schema building method
import gql from 'graphql-tag'; // Or your preferred way to define GraphQL queries/mutations

describe('Schema Changes', () => {
  let schema: any; // Replace 'any' with your schema type

  beforeAll(() => {
    // Load your schema here.  This is just a placeholder.
    // Replace with your actual schema loading mechanism.
    // For example:
    // schema = buildSchema(fs.readFileSync('schema.graphql', 'utf8'));

    const typeDefs = gql`
      type Query {
        testObject: TestObjectType
      }

      type TestObjectType {
        id: ID!
        existingField: String
        rtl: Boolean!
        in: [String!]
        regex: String
        emoji: String
      }
    `;

    const resolvers = {
      Query: {
        testObject: () => ({
          id: '123',
          existingField: 'test',
          rtl: true,
          in: ['a', 'b'],
          regex: '.*',
          emoji: ':)',
        }),
      },
    };
    schema = makeExecutableSchema({ typeDefs, resolvers });
  });

  it('should have the new rtl field on TestObjectType', async () => {
    const query = gql`
      query {
        testObject {
          rtl
        }
      }
    `;
    const result = await graphql({ schema, source: query.loc?.source.body });

    expect(result).toEqual({
      data: {
        testObject: {
          rtl: true,
        },
      },
    });
    expect(result.errors).toBeUndefined();
  });

  it('should have the new in field on TestObjectType', async () => {
    const query = gql`
      query {
        testObject {
          in
        }
      }
    `;

    const result = await graphql({ schema, source: query.loc?.source.body });

    expect(result).toEqual({
      data: {
        testObject: {
          in: ['a', 'b'],
        },
      },
    });
    expect(result.errors).toBeUndefined();
  });

  it('should have the new regex field on TestObjectType', async () => {
    const query = gql`
      query {
        testObject {
          regex
        }
      }
    `;

    const result = await graphql({ schema, source: query.loc?.source.body });

    expect(result).toEqual({
      data: {
        testObject: {
          regex: '.*',
        },
      },
    });
    expect(result.errors).toBeUndefined();
  });

  it('should have the new emoji field on TestObjectType', async () => {
    const query = gql`
      query {
        testObject {
          emoji
        }
      }
    `;

    const result = await graphql({ schema, source: query.loc?.source.body });

    expect(result).toEqual({
      data: {
        testObject: {
          emoji: ':)',
        },
      },
    });
    expect(result.errors).toBeUndefined();
  });

  it('should not break existing queries when selecting existing fields', async () => {
    const query = gql`
      query {
        testObject {
          id
          existingField
        }
      }
    `;

    const result = await graphql({ schema, source: query.loc?.source.body });

    expect(result).toEqual({
      data: {
        testObject: {
          id: '123',
          existingField: 'test',
        },
      },
    });
    expect(result.errors).toBeUndefined();
  });
});
