import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@mikemor-ticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
