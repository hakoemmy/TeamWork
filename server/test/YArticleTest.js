import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import {
  NOT_FOUND,
  BAD_REQUEST, RESOURCE_CREATED,
  REQUEST_SUCCEDED, UNAUTHORIZED, FORBIDDEN,
} from '../helpers/statusCode';

import article from '../models/fakerData/article';
import generateAuthToken from '../helpers/tokenEncoder';

const { expect } = chai;

chai.use(chaiHttp);

const validToken = generateAuthToken(1);
const ownerToken = generateAuthToken(2);
const noToken = ' ';
const noUserWithToken = generateAuthToken(89);


const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5mcCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTY3ODU2NTczfQ.WqwWVxxt9J8EN03toJM7K1QQBbTCJKe3lV-32axH';

describe('POST api/v1/articles title is missing', () => {
  it('should return title is required', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .set('x-auth-token', validToken)
      .send(article[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('"title" is required');
        done();
      });
  });
});


describe('POST api/v1/articles some fileds in payload are empty', () => {
  it('should return request has empty fields', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .set('x-auth-token', validToken)
      .send(article[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('title or article can\'t be empty');
        done();
      });
  });
});

describe('POST api/v1/articles title and article can not be numbers!', () => {
  it('should return request has some unallowed data', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(article[2])
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('title or article can\'t be a number!');
        done();
      });
  });
});

describe('POST api/v1/articles creating an article', () => {
  it('should return an article is created successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(RESOURCE_CREATED);
        expect(res.body.status).to.equal(RESOURCE_CREATED);
        expect(res.body.message).to.equal('article successfully created');
        done();
      });
  });
});


describe('POST api/v1/articles creating an article with Invalid token', () => {
  it('should return an article failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        done();
      });
  });
});


describe('POST api/v1/articles creating an article with no token', () => {
  it('should return creating an article failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', noToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(UNAUTHORIZED);
        expect(res.body.status).to.equal(UNAUTHORIZED);
        expect(res.body.error).to.equal('System rejected. No access token found!');
        done();
      });
  });
});


describe('POST api/v1/articles creating an article with invalid token', () => {
  it('should return creating an article failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', noUserWithToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body.status).to.equal(NOT_FOUND);
        expect(res.body.error).to.equal('Awww, Snap!..Such kind of access token does not match any employee!');
        done();
      });
  });
});
