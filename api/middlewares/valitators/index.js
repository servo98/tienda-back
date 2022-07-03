import j2s from 'joi-to-swagger';
import * as pagoValidator from './pagoValitador.js';
import * as actividadValidator from './actividadValidator.js';
import * as authValidator from './authValidation.js';
import * as personaValidator from './personaValidators.js';

const createPagoBodySwagger = j2s(pagoValidator.createPagoBodySchema);
const getAllPagosQuerySwagger = j2s(pagoValidator.getAllPagosQuerySchema);
const updatePagoBodySwagger = j2s(pagoValidator.updatePagoBodySchema);

const createActividadBodySwagger = j2s(
  actividadValidator.createActividadBodySchema
);
const inscribirActividadBodySwagger = j2s(
  actividadValidator.inscribirActividadBodySchema
);
const updateActividadBodySwagger = j2s(
  actividadValidator.updateActividadBodySchema
);

const loginBodySwagger = j2s(authValidator.loginBodySchema);

const createPersonaBodySwagger = j2s(personaValidator.createPersonaBodySchema);
const getAllPersonasQuerySwagger = j2s(
  personaValidator.getAllPersonasQuerySchema
);
const updatePersonaBodySwagger = j2s(personaValidator.updatePersonaBodySchema);

export {
  pagoValidator,
  actividadValidator,
  authValidator,
  personaValidator,
  createPagoBodySwagger,
  getAllPagosQuerySwagger,
  updatePagoBodySwagger,
  createActividadBodySwagger,
  inscribirActividadBodySwagger,
  updateActividadBodySwagger,
  loginBodySwagger,
  createPersonaBodySwagger,
  getAllPersonasQuerySwagger,
  updatePersonaBodySwagger,
};
