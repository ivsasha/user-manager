import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserList from './components/UserList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>User Manager</h1>
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
