import { gql } from '@apollo/client';

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(forgotPasswordData: { email: $email }) {
      success
      message
    }
  }
`;



export const SIGNUP_MUTATION = gql`
  mutation RegisterUser($name: String!, $password: String!, $confirmPassword: String!, $email: String!, $role: String!, $phoneNumber: String!) {
    registerUser(registerData: {
      name: $name
      password: $password
      confirmPassword: $confirmPassword
      email: $email
      role: $role
      phoneNumber: $phoneNumber
    }) {
      id
      name
      email
      role
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginData: { email: $email, password: $password }) {
      user {
        id
        name
        email
        role
      }
      message
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(forgotPasswordData: { email: $email }) {
      success
      message
    }
  }
`;
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      email
      role
    }
  }
`;
export const CONFIRM_EMAIL_MUTATION = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token) {
      success
      message
    }
  }
`;

export const RESEND_CONFIRM_EMAIL_MUTATION = gql`
  mutation ResendConfirmationEmail {
    resendConfirmationEmail {
      success
      message
    }
  }
`;
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($resetPasswordData: ResetPasswordDto!) {
    resetPassword(resetPasswordData: $resetPasswordData) {
      success
      message
      error
    }
  }
`;
