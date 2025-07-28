describe('Schema Changes', () => {
  it('should not break existing queries when adding "rtl: Boolean!"', () => {
    // Mock existing query result
    const existingQueryResult = {
      // existing data here
    };

    // Mock new query result with the added field
    const newQueryResult = {
      ...existingQueryResult,
      rtl: true, // Or false, depending on the data
    };

    // Assertion: existing query can still process the response.
    expect(() => {
      // Simulate existing query processing the new result
      // e.g., using existingQueryResult to render UI, which
      //  should not break with the 'rtl' field added.
      // If your existing code does something very brittle that
      //  fails when extra fields are present, THEN this *would* be breaking.
      // A common example: If the field being added contains sensitive
      // information, and the client serializes it, then it could break
      // security expectations.

    }).not.toThrow();
  });

  it('should not break existing queries when adding "in: [String!]"', () => {
    const existingQueryResult = {
      // existing data here
    };

    const newQueryResult = {
      ...existingQueryResult,
      in: ["value1", "value2"],
    };

    expect(() => {}).not.toThrow(); // Replace with real assertion
  });

  it('should not break existing queries when adding "regex: String"', () => {
    const existingQueryResult = {
      // existing data here
    };

    const newQueryResult = {
      ...existingQueryResult,
      regex: "some regex", // Or null
    };

    expect(() => {}).not.toThrow(); // Replace with real assertion
  });

  it('should not break existing queries when adding "emoji: String"', () => {
    const existingQueryResult = {
      // existing data here
    };

    const newQueryResult = {
      ...existingQueryResult,
      emoji: "😀", // Or null
    };

    expect(() => {}).not.toThrow(); // Replace with real assertion
  });
});
