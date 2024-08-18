import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to connect to the Apollo Server
const httpLink = createHttpLink({
  uri: '/graphql', // This assumes your GraphQL endpoint is at /graphql
});

// Set up the auth link to include the token in every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); // Replace 'id_token' with the key you're using to store the JWT
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
