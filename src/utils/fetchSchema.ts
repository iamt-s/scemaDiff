import axios from 'axios';
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';

export async function fetchSchema(endpoint: string): Promise<string> {
  const introspectionQuery = getIntrospectionQuery();

  const response = await axios.post(endpoint, { query: introspectionQuery });
  const introspectionResult = response.data.data;

  const schema = buildClientSchema(introspectionResult);
  return printSchema(schema);
}
