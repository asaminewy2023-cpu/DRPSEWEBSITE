import { getUpcomingEvents } from "../lib/cms-data";
import UpcomingEventsClient from "./UpcomingEventsClient";

const fallbackEvents = [
  {
    title: "Regional Development Forum",
    date: "Aug 15, 2026",
    type: "Conferences",
  },
  {
    title: "Peace & Reconciliation Workshop",
    date: "Sep 2, 2026",
    type: "Workshops",
  },
  {
    title: "Budget Planning Meeting",
    date: "Sep 10, 2026",
    type: "Meetings",
  },
  {
    title: "Infrastructure Investment Workshop",
    date: "Sep 22, 2026",
    type: "Workshops",
  },
  {
    title: "Quarterly Stakeholder Meeting",
    date: "Oct 5, 2026",
    type: "Meetings",
  },
  {
    title: "Education Summit",
    date: "Oct 18, 2026",
    type: "Conferences",
  },
];

export default async function UpcomingEvents() {
  const events = await getUpcomingEvents();
  const list =
    events.length > 0
      ? events.map((e) => ({
          title: e.title,
          date: e.date,
          type: e.type,
        }))
      : fallbackEvents;

  return <UpcomingEventsClient events={list} />;
}
