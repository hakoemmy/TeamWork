import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../index';
import CommentModel from '../models/commentModel';

import {
  NOT_FOUND,
  BAD_REQUEST, RESOURCE_CREATED,
} from '../helpers/statusCode';

import comment from '../models/fakerData/comment';
import generateAuthToken from '../helpers/tokenEncoder';

const { expect } = chai;

chai.use(chaiHttp);
dotenv.config();
CommentModel.comments.push(
  {
    id: 1,
    authorId: 2,
    articleId: 1,
    comment: 'Informative One!',
    createdOn: '09/03/2019 12:04:59',
    updatedOn: '09/03/2019 12:04:59',
  },
);

const validToken = generateAuthToken(1);

describe('POST api/v1/articles/:articleId with Invalid signature token', () => {
  it('should return Invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/articles/2/comments')
      .set('Accept', 'application/json')
      .set('x-auth-token', process.env.INVALID_TOKEN)
      .send(comment[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        done();
      });
  });
});


describe('POST api/v1/articles comment field is missing', () => {
  it('should return comment is required', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('Accept', 'application/json')
      .set('x-auth-token', validToken)
      .send(comment[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('"comment" is required');
        done();
      });
  });
});


describe('POST /api/v1/articles/:articleId/comments articleId param', () => {
  it('should return articleId param can not be a string', (done) => {
    chai.request(app)
      .post('/api/v1/articles/mm/comments')
      .set('Accept', 'application/json')
      .set('x-auth-token', validToken)
      .send(comment[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('articleId can\'t be a string!');
        done();
      });
  });
});


describe('POST /api/v1/articles/:articleId/comments', () => {
  it('should return comment can not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-auth-token', validToken)
      .send(comment[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('comment can\'t be empty');
        done();
      });
  });
});


describe('POST /api/v1/articles/:articleId/comments artilceId param', () => {
  it('should return article is not found', (done) => {
    chai.request(app)
      .post('/api/v1/articles/900/comments')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-auth-token', validToken)
      .send(comment[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body.status).to.equal(NOT_FOUND);
        expect(res.body.error).to.equal('Such article is not found!');
        done();
      });
  });
});


describe('POST /api/v1/articles/:articleId/comments adding comment', () => {
  it('should return comment successfully added', (done) => {
    chai.request(app)
      .post('/api/v1/articles/2/comments')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-auth-token', validToken)
      .send(comment[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(RESOURCE_CREATED);
        expect(res.body.status).to.equal(RESOURCE_CREATED);
        expect(res.body.message).to.equal('comment successfully added');
        done();
      });
  });
});
