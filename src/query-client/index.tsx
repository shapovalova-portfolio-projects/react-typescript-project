import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

export const ProjectQueryClientProvider = ({ children }: { children: ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient} >
      {children}
    </QueryClientProvider>
  );
}