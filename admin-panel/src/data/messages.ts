import { AdminMessage } from "@/types";

export const initialMessages: AdminMessage[] = [
  {
    id: "msg-1",
    senderName: "Rahul Sharma",
    senderEmail: "rahul@example.com",
    subject: "Website project",
    message: "Hi Ankit, I reviewed your portfolio and was impressed by your full-stack engineering work. We are looking to develop a custom data-driven web platform with Next.js and PostgreSQL. Would you be available for a brief introductory call this week?",
    date: "Aug 29",
    status: "Unread",
    updatedAt: "Aug 29",
  },
  {
    id: "msg-2",
    senderName: "Amit Patel",
    senderEmail: "amit.patel@techlab.io",
    subject: "AI integration",
    message: "Hello Ankit, we have an existing customer support platform and need to integrate an intelligent RAG engine with vector search capabilities. Saw your AI Lab experiments and would love to discuss a potential contract role.",
    date: "Aug 28",
    status: "Read",
    updatedAt: "Aug 28",
  },
  {
    id: "msg-3",
    senderName: "Neha Verma",
    senderEmail: "neha.verma@innovate.org",
    subject: "Collaboration",
    message: "Hey Ankit, I am organizing an open-source technical workshop on autonomous agents and backend scalability. We would love to feature one of your engineering case studies as a presentation topic.",
    date: "Aug 26",
    status: "Archived",
    updatedAt: "Aug 26",
  },
];
