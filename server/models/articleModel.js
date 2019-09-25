import lodash from 'lodash';
import datetime from 'node-datetime';
import { RESOURCE_CREATED, REQUEST_SUCCEDED } from '../helpers/statusCode';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';


class Article {
  constructor() {
    this.currentDate = datetime.create().format('m/d/Y H:M:S');
    this.articles = [
      {
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
      },
    ];
  }

    create = (payload, token, res) => {
      const {
        title, article,
      } = payload;
      const currentId = this.articles.length + 1;
      let newArticle = {
        id: currentId,
        authorId: grabEmployeeIdFromToken(token, res),
        title,
        article,
        createdOn: this.currentDate,
        updatedOn: this.currentDate,
      };
      this.articles.push(newArticle);
      newArticle = {
        status: RESOURCE_CREATED,
        message: 'article successfully created',
        data: lodash.pick(newArticle, ['id',
          'authorId', 'title', 'createdOn',
        ]),
      };

      return newArticle;
    };

    isArticleExist = articleId => this.articles.find(a => a.id === parseInt(articleId, 10));

    isOwnerOfArticle = (articleId, token, res) => {
      const employeeId = grabEmployeeIdFromToken(token, res);
      const article = this.articles.find(
        a => a.id === parseInt(articleId, 10)
       && a.authorId === employeeId,
      );
      return article;
    };

    edit = (payload, articleId, token, res) => {
      let article = this.articles.find(a => a.id === parseInt(articleId, 10));
      article.title = payload.title;
      article.article = payload.article;
      article.authorId = grabEmployeeIdFromToken(token, res);
      article.createdOn = article.createdOn;
      article.updatedOn = this.currentDate;

      let editedArticle = {
        status: REQUEST_SUCCEDED,
        message: 'article successfully edited',
        data: lodash.pick(article, ['id',
          'authorId', 'title', 'createdOn', 'updatedOn',
        ]),
      };
      return editedArticle;
    };

    delete = (articleId) => {
      const article = this.articles.find(a => a.id === parseInt(articleId, 10));
      const index = this.articles.indexOf(article);
      this.articles.splice(index, 1);
      return {
        status: REQUEST_SUCCEDED,
        message: 'article successfully deleted',
      };
    };

    getAll = () => {
      const articles = this.articles.sort((a, b) => (new Date(b.createdOn)).getTime()
      - (new Date(a.createdOn)).getTime());
      return {
        status: REQUEST_SUCCEDED,
        message: 'success',
        data: articles,
      };
    }
}
export default new Article();
