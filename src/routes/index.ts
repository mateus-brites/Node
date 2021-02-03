// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointment.routes';
import usersRoute from './users.routes';
import sessionsRoute from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
