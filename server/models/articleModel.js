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
}
export default new Article();
