select e.title, e.description, s.firstName, s.lastName
from events e
join eventspeakers es on e.id = es.eventId
join speakers s on s.id = es.speakerId
join eventhalls eh on e.id = eh.eventId join halls h on h.id = eh.hallId;

insert into hall

elect e.title, e.description, s.firstName, s.lastName
from events e
join eventspeakers es on e.id = es.eventId
join speakers s on s.id = es.speakerId
join eventhalls eh on e.id = eh.eventId join halls h on h.id = eh.hallId;

select firstName, lastName
from speakers s 
where s.id in  (select es.speakerid from eventSpeakers es WHERE es.eventId = ${id})

select * 
from halls h where h.id IN (select eh.hallId from eventHalls eh where eh.eventId = ${id})

select e.*, eh.date from events e join eventHalls eh on e.id = eh.eventId where e.id = ${id}


select e.title, eh.date
from events e join eventHalls eh on e.id = eh.eventId;