import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@mikemor-ticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
