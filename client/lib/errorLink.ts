import { onError } from '@apollo/client/link/error';
import { fromPromise } from '@apollo/client';

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors && graphQLErrors[0]?.extensions?.code === 'Unauthorized') {
    // Perform the refresh token logic using a regular fetch to your refresh endpoint
    return fromPromise(
      fetch('http://localhost:3001/auth/refresh-token', {
        method: 'GET',
        credentials: 'include', // Important to include cookies
      })
        .then((res) => res.json())
        .then(({ success }) => {
          if (success) {
            // Token refreshed successfully; retry the original operation
            return forward(operation); // Retry original GraphQL request
          } else {
            // If refresh fails, redirect to login
            window.location.href = '/auth';
          }
        })
        .catch((error) => {
          console.error('Error refreshing token', error);
          // In case of error, redirect to login
          window.location.href = '/auth';
        })
    ).flatMap(() => forward(operation)); // Continue retrying the original request
  }
});
