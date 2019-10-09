import datetime from 'node-datetime';
import Entity from '../models/crudQueries';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import ResponseHandler from '../helpers/responseHandler';
import {
  RESOURCE_CREATED, SERVER_ERROR,
} from '../helpers/statusCode';

class CommentController {
  static commentModel() {
    return new Entity('comments');
  }

 static commentOnArticle = async (req, res) => {
   try {
     const employeeToken = req.header('x-auth-token').trim();
     let { articleId } = req.params;
     const currentDate = datetime.create().format('m/d/Y H:M:S');
     const authorId = grabEmployeeIdFromToken(employeeToken, res);
     const attributes = 'authorid,articleid,comment,created_on,updated_on';
     const selectors = `'${authorId}', '${articleId}', '${req.body.comment}', '${currentDate}', '${currentDate}'`;
     const createdComment = await this.commentModel().insert(attributes, selectors);
     let {
       id,
       authorid,
       articleid,
       comment,
       created_on,
       updated_on,
     } = createdComment[0];
     let response = {
       id,
       authorId: authorid,
       articleId: articleid,
       comment,
       createdOn: created_on,
       updatedOn: updated_on,
     };
     return ResponseHandler.success(RESOURCE_CREATED, 'comment successfully added', response, res);
   } catch (e) {
     return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
   }
 };
}

export default CommentController;
