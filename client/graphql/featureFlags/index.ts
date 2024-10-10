import { gql } from '@apollo/client';

export const CREATE_FEATURE_FLAG_MUTATION = gql`
  mutation CreateFeatureFlag($input: CreateFeatureFlagInput!) {
    createFeatureFlag(createFeatureFlagInput: $input) {
      id
      name
      isEnabled
    }
  }
`;
