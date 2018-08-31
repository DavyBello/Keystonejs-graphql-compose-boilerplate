const chai = require('chai');
const { graphql } = require('graphql');
const keystone = require('keystone');

const Candidate = keystone.list('Candidate').model;

const schema = require('../../../../../graphql/schema');

// const { decodeToken } = require('../../../../modelMethods/user');
const getContext = require('../../../../../graphql/lib/getContext');
const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows,
} = require('../../../../helper');

const { expect } = chai;

// language=GraphQL
const CREATE_CANDIDATE_ACCOUNT_MUTATION = `
mutation M(
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $password: String!,
  $phone: String!
) {
  candidateCreateAccount(input: {
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    password: $password,
    phone: $phone
  }) {
    token
    name
  }
}
`;

before(connectMongoose);

beforeEach(clearDbAndRestartCounters);

after(disconnectMongoose);

describe('createAccount Mutation', () => {
  it('should not create an account with an existing phone', async () => {
    const user = await createRows.createCandidate();

    const query = CREATE_CANDIDATE_ACCOUNT_MUTATION;

    const rootValue = {};
    const context = getContext();
    const variables = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@email.com',
      password: 'testpass',
      phone: user.phone,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.candidateCreateAccount).to.equal(null);
    expect(result.errors[0].message).to.equal('phone already exists');
  });

  it.skip('should not create an account with an existing email', async () => {
    const user = await createRows.createCandidate();

    const query = CREATE_CANDIDATE_ACCOUNT_MUTATION;

    const rootValue = {};
    const context = getContext();
    const variables = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: user.email,
      password: 'testpass',
      phone: '08188555911',
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    // console.log(result);
    // const candidates = await Candidate.find();
    // console.log(candidates);

    expect(result.data.candidateCreateAccount).to.equal(null);
    expect(result.errors[0].message).to.equal('email already exists');
  });

  it('should create a new user when parameters are valid', async () => {
    const firstName = 'firstName';
    const lastName = 'lastName';
    const email = 'test@email.com';
    const password = 'testpass';
    const phone = '08188555611';

    const query = CREATE_CANDIDATE_ACCOUNT_MUTATION;

    const rootValue = {};
    const context = getContext();
    const variables = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    const result = await graphql(schema, query, rootValue, context, variables);

    expect(result.data.candidateCreateAccount.name).to.exist;
    expect(result.data.candidateCreateAccount.token).to.exist;
    expect(result.errors).to.be.undefined;

    const candidate = await Candidate.findOne({ phone });
    expect(candidate).to.exist;
  });
});
