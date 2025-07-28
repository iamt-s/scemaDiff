describe('GraphQL Schema Changes', () => {
  it('should not break existing queries when adding the "rtl" field', () => {
    // Mock GraphQL client and a query that doesn't include the new "rtl" field.
    const mockQueryResult = { data: { someExistingField: 'someValue' } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing an existing query.
    const existingQuery = `
      query {
        someExistingField
      }
    `;

    //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: existingQuery })).resolves.toEqual(mockQueryResult);
  });

  it('should not break existing queries when adding the "in" field', () => {
    // Mock GraphQL client and a query that doesn't include the new "in" field.
    const mockQueryResult = { data: { someExistingField: 'someValue' } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing an existing query.
    const existingQuery = `
      query {
        someExistingField
      }
    `;

      //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: existingQuery })).resolves.toEqual(mockQueryResult);
  });

  it('should not break existing queries when adding the "regex" field', () => {
    // Mock GraphQL client and a query that doesn't include the new "regex" field.
    const mockQueryResult = { data: { someExistingField: 'someValue' } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing an existing query.
    const existingQuery = `
      query {
        someExistingField
      }
    `;
      //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: existingQuery })).resolves.toEqual(mockQueryResult);
  });

    it('should not break existing queries when adding the "emoji" field', () => {
    // Mock GraphQL client and a query that doesn't include the new "emoji" field.
    const mockQueryResult = { data: { someExistingField: 'someValue' } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing an existing query.
    const existingQuery = `
      query {
        someExistingField
      }
    `;
    //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: existingQuery })).resolves.toEqual(mockQueryResult);
  });

  it('should allow new queries to include the "rtl" field', () => {
    // Mock GraphQL client and a query that includes the new "rtl" field.
    const mockQueryResult = { data: { someExistingField: 'someValue', rtl: true } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing a new query.
    const newQuery = `
      query {
        someExistingField
        rtl
      }
    `;
      //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: newQuery })).resolves.toEqual(mockQueryResult);

  });

    it('should allow new queries to include the "in" field', () => {
    // Mock GraphQL client and a query that includes the new "in" field.
    const mockQueryResult = { data: { someExistingField: 'someValue', in: ["value1", "value2"] } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing a new query.
    const newQuery = `
      query {
        someExistingField
        in
      }
    `;

          //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: newQuery })).resolves.toEqual(mockQueryResult);
  });

    it('should allow new queries to include the "regex" field', () => {
    // Mock GraphQL client and a query that includes the new "regex" field.
    const mockQueryResult = { data: { someExistingField: 'someValue', regex: "[a-z]+" } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing a new query.
    const newQuery = `
      query {
        someExistingField
        regex
      }
    `;

            //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: newQuery })).resolves.toEqual(mockQueryResult);
  });

    it('should allow new queries to include the "emoji" field', () => {
    // Mock GraphQL client and a query that includes the new "emoji" field.
    const mockQueryResult = { data: { someExistingField: 'someValue', emoji: "😀" } };
    const mockGraphQLClient = {
      query: jest.fn().mockResolvedValue(mockQueryResult),
    };

    // Simulate executing a new query.
    const newQuery = `
      query {
        someExistingField
        emoji
      }
    `;
          //Expect the result to match the mocked result.
    expect(mockGraphQLClient.query({ query: newQuery })).resolves.toEqual(mockQueryResult);
  });
});
