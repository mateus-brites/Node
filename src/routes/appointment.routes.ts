import { request, Router } from 'express';
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../models/repository/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})


appointmentsRouter.post('/', async (request, response) => {

    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider
    });


    return response.json(appointment);
    });

export default appointmentsRouter;
