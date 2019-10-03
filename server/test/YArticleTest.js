import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../index';
import ArticleModel from '../models/articleModel';
import {
  NOT_FOUND,
  BAD_REQUEST, RESOURCE_CREATED,
  REQUEST_SUCCEDED, UNAUTHORIZED, FORBIDDEN,
} from '../helpers/statusCode';

import article from '../models/fakerData/article';
import generateAuthToken from '../helpers/tokenEncoder';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

ArticleModel.articles.push({
  id: 1,
  authorId: 2,
  title: 'My journey in software development industry',
  article: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  createdOn: '09/03/2019 12:04:59',
  updatedOn: '09/03/2019 12:04:59',
},
{
  id: 2,
  authorId: 2,
  title: 'My journey in software development industry',
  article: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  createdOn: '09/03/2019 12:04:59',
  updatedOn: '09/03/2019 12:04:59',
});
const validToken = generateAuthToken(1);
const ownerToken = generateAuthToken(2);
const noToken = ' ';
const noUserWithToken = generateAuthToken(89);

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
      .set('x-auth-token', process.env.INVALID_TOKEN)
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

describe('PATCH api/v1/articles/:articleId title is missing', () => {
  it('should return title is required', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
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


describe('PATCH api/v1/articles/:articleId some fileds in payload are empty', () => {
  it('should return request has empty fields', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
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


describe('PATCH api/v1/articles/:articleId title and article can not be numbers!', () => {
  it('should return request has some unallowed data', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
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


describe('PATCH api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param can not be a string', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/mm')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('articleId can\'t be a string!');
        done();
      });
  });
});


describe('PATCH api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param is not found', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/900')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body.status).to.equal(NOT_FOUND);
        expect(res.body.error).to.equal('Such article is not found!');
        done();
      });
  });
});


describe('PATCH api/v1/articles/:articleId article ownership', () => {
  it('should return you are not owner of an article', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(FORBIDDEN);
        expect(res.body.status).to.equal(FORBIDDEN);
        expect(res.body.error).to.equal('Aww snap!.. you are not the owner of an article');
        done();
      });
  });
});


describe('PATCH api/v1/articles/:articleId article ', () => {
  it('should return article successfully edited', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .send(article[3])
      .set('x-auth-token', ownerToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.message).to.equal('article successfully edited');
        done();
      });
  });
});

describe('DELETE api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param can not be a string', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/mm')
      .set('Accept', 'application/json')
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('articleId can\'t be a string!');
        done();
      });
  });
});


describe('DELETE api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/900')
      .set('Accept', 'application/json')
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body.status).to.equal(NOT_FOUND);
        expect(res.body.error).to.equal('Such article is not found!');
        done();
      });
  });
});

describe('DELETE api/v1/articles/:articleId article ownership', () => {
  it('should return you are not owner of an article', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .set('x-auth-token', validToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(FORBIDDEN);
        expect(res.body.status).to.equal(FORBIDDEN);
        expect(res.body.error).to.equal('Aww snap!.. you are not the owner of an article');
        done();
      });
  });
});


describe('DELETE api/v1/articles/:articleId article ', () => {
  it('should return article successfully deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .set('x-auth-token', ownerToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.message).to.equal('article successfully deleted');
        done();
      });
  });
});

describe('GET api/v1/feeds Get all articles ', () => {
  it('should return an array of All artiles ', (done) => {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
});

describe('GET api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param can not be a string', (done) => {
    chai.request(app)
      .get('/api/v1/articles/mm')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(BAD_REQUEST);
        expect(res.body.status).to.equal(BAD_REQUEST);
        expect(res.body.error).to.equal('articleId can\'t be a string!');
        done();
      });
  });
});

describe('GET api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param is not found', (done) => {
    chai.request(app)
      .get('/api/v1/articles/900')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body.status).to.equal(NOT_FOUND);
        expect(res.body.error).to.equal('Such article is not found!');
        done();
      });
  });
});


describe('GET api/v1/articles/:articleId Get article by Id', () => {
  it('should return acertain article', (done) => {
    chai.request(app)
      .get('/api/v1/articles/2')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(REQUEST_SUCCEDED);
        done();
      });
  });
});
