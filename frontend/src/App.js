import './App.css';
import './components/FontAwesomeIcons'
import React from 'react';
import UserBox from './components/page/UserBox';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <UserBox />
    </ApolloProvider>
  );
}

export default App;
