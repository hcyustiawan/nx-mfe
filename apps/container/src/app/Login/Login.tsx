import { gql, useMutation } from '@apollo/client';
import { FormEvent } from 'react';
import styled from 'styled-components';

const LOGIN_MUTATION = gql`
  mutation login($input: LoginRequest!) {
    login(input: $input) {
      userProfile {
        id
        email
      }
      securityProfile {
        permissions
        groups
      }
    }
  }
`;

const Login = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  console.log(JSON.stringify(error));
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { username, password } = e.target;
    console.log(username.value, password.value);
    login({
      variables: {
        input: {
          email: username.value,
          password: password.value,
        },
      },
    });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" />
        </FieldGroup>
        <FieldGroup>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </FieldGroup>
        <button
          style={{
            float: 'right',
            marginTop: '8px',
          }}
        >
          login
        </button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
  label {
    padding-bottom: 4px;
  }
`;
export default Login;
