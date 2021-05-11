import * as express from 'express';
import { VoicePatternController } from './controller/hackathon-data.controller';
import { UserController } from './controller/user-controller';
var expressJWT      = require('express-jwt');
export class ApiRouting {
        public static ConfigureRouters(app: express.Router) {
                app.use(expressJWT({ secret: 'Hashit#1278', algorithms: ['HS256']})
                .unless( // This allows access to /token/sign without token authentication
               { path: [
                   '/api/hackathon/signup',
                   '/api/hackathon/login'
               ]}
           ));
                app.use(VoicePatternController.route, new VoicePatternController().router);
                app.use(UserController.route, new UserController().router);

        }
}
