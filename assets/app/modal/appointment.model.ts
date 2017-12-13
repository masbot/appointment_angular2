export class Appointment {
    constructor(
        public barber: string,
        public appointment: Date,
        public date: Date,
        public appointmentId?: string,
        public userId?: string
    ){}
}