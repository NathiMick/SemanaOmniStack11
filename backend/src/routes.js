const express = require('express');
const OngController = require('./controllers/OngController'); //import OngController para usar migration
const IncidentController = require('./controllers/IncidentController'); //import OngController para usar migration
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
routes.get('/profile', ProfileController.index);

module.exports = routes;