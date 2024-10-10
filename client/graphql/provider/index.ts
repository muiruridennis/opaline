import { gql } from '@apollo/client';

export const CREATE_PROVIDER_PROFILE_MUTATION = gql`
  mutation CreateProviderProfile($input: CreateProviderInput!) {
    createProviderProfile(createProviderInput: $input) {
      description
      businessName
      bio
      approach
      socialMedia {
        facebook
        instagram
        twitter
      }
      certifications {
        title
        issuingOrganization
        dateIssued
      }
      services {
        name
        description
        price
        duration
        startDate
        endDate
        isActive
        serviceCategory
      }
    }
  }
`;
export const GET_PROVIDER_PROFILE = gql`
  query GetProviderProfile($id: ID!) {
    providerProfile(id: $id) {
      description
      businessName
      bio
      approach
      socialMedia {
        facebook
        instagram
        twitter
      }
      certifications {
        title
        issuingOrganization
        dateIssued
      }
      services {
        id
        name
        description
        price
        duration
        startDate
        endDate
        isActive
        serviceCategory
      }
    }
  }
`;


export const CREATE_PROVIDER_SERVICE = gql`
  mutation CreateProviderService($createServiceInput: CreateServiceInput!) {
    createProviderService(createServiceInput: $createServiceInput) {
      id
      name
      description
      price
      duration
      serviceCategory
      benefits {
        benefit
      }
      tags
      faqs {
        question
        answer
      }
    }
  }
`;

export const UPDATE_PROVIDER_SERVICE = gql`
  mutation UpdateProviderService($id: Int!, $updateServiceInput: UpdateServiceInput!) {
    updateProviderService(id: $id, updateServiceInput: $updateServiceInput) {
      id
      name
      description
      price
      duration
      serviceCategory
      benefits {
        benefit
      }
      tags
      faqs {
        question
        answer
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
query GetUserById($id: Int!) {
  getUserById(id: $id) {
    id
    name
    email
    phoneNumber
    provider {
      businessName
      bio
      description
      approach
      services {
        id
        name
        description
        price
        duration
        serviceCategory
        benefits {
          benefit
        }
        hero{
          filename
          id
        }
        tags
        faqs {
          question
          answer
        }
      }
      certifications {
        title
        issuingOrganization
      }
      socialMedia{
        facebook
        instagram
        twitter
      }
    }
  }
}
`;


export const DELETE_PROVIDER_SERVICE = gql`
  mutation DeleteProviderService($id: Int!) {
    deleteProviderService(id: $id) {
      success
      message
    }
  }
`;