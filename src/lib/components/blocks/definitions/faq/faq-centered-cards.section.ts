import { z } from "zod";
import type { BlockDefinition } from "../../types";
import FaqCenteredCards from "../../components/faq/FaqCenteredCards.svelte";

const faqSchema = z.object({
  _id: z.string(),
  question: z.string(),
  answer: z.string(),
});

const propsSchema = z.object({
  title: z.string().optional(),
  faqs: z.array(faqSchema).default([]),
});

export const faqCenteredCardsDefinition: BlockDefinition = {
  type: "faq.centered-cards",
  displayName: "FAQ Centered Cards",
  version: 1,
  defaults: {
    title: "Frequently Asked Questions",
    faqs: [
      {
        _id: "_id1",
        question: "Can I cancel at anytime?",
        answer:
          "Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.",
      },
      {
        _id: "_id2",
        question: "My team has credits. How do we use them?",
        answer:
          "Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.",
      },
      {
        _id: "_id3",
        question: "How does mindhyv's pricing work?",
        answer:
          "Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.",
      },
      {
        _id: "_id4",
        question: "How secure is mindhyv?",
        answer:
          "Protecting the data you trust to mindhyv is our first priority. This part is really crucial in keeping the project in line to completion.",
      },
      {
        _id: "_id5",
        question: "Do you offer discounts?",
        answer:
          "We've built in discounts at each tier for teams. The time has come to bring those ideas and plans to life.",
      },
      {
        _id: "_id6",
        question: "What is your refund policy?",
        answer:
          "We offer refunds. We aim high at being focused on building relationships with our clients and community.",
      },
    ],
  },
  schema: propsSchema,
  ui: [
    {
      path: "title",
      label: "Title",
      kind: "string",
      required: true,
      placeholder: "Frequently Asked Questions",
    },
    {
      path: "faqs",
      label: "FAQs",
      kind: "array",
      itemSchema: [
        {
          path: "question",
          label: "Question",
          kind: "string",
          required: true,
          placeholder: "Enter question",
        },
        {
          path: "answer",
          label: "Answer",
          kind: "text",
          required: true,
          placeholder: "Enter answer",
        },
      ],
    },
  ],
  migrate: (props, fromVersion) => {
    return props;
  },
};

export { FaqCenteredCards };
