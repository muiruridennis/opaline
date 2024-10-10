import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '@/graphql/provider';
import { useAuth } from '@/providers/AuthProvider';

const useGetMe = () => {
  const { user } = useAuth();
  const userId = user?.id ? parseInt(user.id, 10) : null;

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId || isNaN(userId), 
    fetchPolicy: "network-only", // Ensures fresh data is fetched
  });

  return {
    loading,
    error,
    data,
  };
};

export default useGetMe;
