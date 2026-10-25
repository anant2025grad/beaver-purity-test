
export type Question = {
  id: number;
  text: string;
};

export type QuestionSection = {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
};

const sectionData = [
  {
    id: "academics",
    title: "academic crimes",
    subtitle: "college is all about the degree, right?",
    questions: [
      "Skipped class simply because you didn't feel like going.",
      "Fallen asleep during a lecture.",
      "Submitted an assignment with less than a minute remaining.",
      "Pulled an all-nighter before an exam.",
      "Used AI to finish an assignment you barely understood.",
      "Walked into the wrong classroom and pretended you belonged there.",
      "Been caught on your phone by a professor.",
      "Skipped class and ran into the professor that same day.",
      "Gone to the Library to study and accomplished nothing.",
      "Lied about why you missed an assignment.",
      "Shown up to an exam knowing almost none of the material.",
      "Had a breakdown over a class in the Michael Baker Building.",
      "Taken a class because you heard the professor was easy.",
      "Seriously considered dropping out or transferring.",
      "Shown up to class hungover.",
    ],
  },
  {
    id: "campus",
    title: "beaver campus life",
    subtitle: "with a campus this small, everyone knows everything.",
    questions: [
      "Gone to a campus event exclusively for the free food.",
      "Complained about the Bistro and then eaten there again.",
      "Spent more than three hours doing nothing in the Bistro.",
      "Heard campus gossip before the people involved told you.",
      "Walked across campus to avoid someone.",
      "Had a crush on someone in the General Classroom Building.",
      "Had an awkward encounter in the Lab Classroom Building.",
      "Fallen asleep somewhere in the SUB.",
      "Stayed in the SUB Lodge until you were almost the last person there.",
      "Been caught talking about someone standing nearby.",
      "Had a campus employee know you for an embarrassing reason.",
      "Known about a campus relationship before it became public.",
      "Had a heated argument with another Beaver student.",
      "Pretended not to recognize someone you knew on campus.",
      "Been involved in drama that spread across campus.",
    ],
  },
  {
    id: "harmony",
    title: "harmony hall",
    subtitle: "what happens in harmony hall...",
    questions: [
      "Lived in Harmony Hall.",
      "Stayed awake until sunrise in Harmony Hall.",
      "Had someone sleep over in your dorm room.",
      "Slept in someone else's dorm room.",
      "Had a roommate walk in at the worst possible moment.",
      "Been told to quiet down because you were being too loud.",
      "Snuck around Harmony Hall to avoid being noticed.",
      "Had a romantic encounter in a dorm room.",
      "Had an overnight guest you didn't tell your roommate about.",
      "Been locked out of your room at an embarrassing time.",
      "Had a dorm crush turn into something more.",
      "Had an argument with a roommate over a guest.",
      "Been involved in a dorm prank.",
      "Had a secret situationship involving someone in Harmony Hall.",
      "Done something in Harmony Hall you hoped wouldn't become gossip.",
    ],
  },
  {
    id: "relationships",
    title: "public relations",
    subtitle: "things can get complicated.",
    questions: [
      "Had a crush on someone in your class.",
      "Flirted with someone while pretending to study.",
      "Slid into another Beaver student's DMs.",
      "Gone on a date with someone from Penn State Beaver.",
      "Kissed someone you met on campus.",
      "Kissed someone at a college party.",
      "Had a situationship with another Beaver student.",
      "Been ghosted by someone you still see around campus.",
      "Ghosted someone you still see around campus.",
      "Had a crush on two Beaver students at the same time.",
      "Been involved in a campus love triangle.",
      "Had an ex or former talking stage in one of your classes.",
      "Had a friends-with-benefits arrangement.",
      "Had a relationship you kept secret from your friends.",
      "Hooked up with someone and saw them in class afterward.",
    ],
  },
  {
    id: "parties",
    title: "parties and bad decisions",
    subtitle: "some stories are better left untold.",
    questions: [
      "Attended a college party.",
      "Gone to a party instead of studying for an exam.",
      "Stayed out all night before a morning class.",
      "Had an embarrassing party moment your friends still mention.",
      "Been drunk at a college party.",
      "Played a drinking game.",
      "Had a hangover during class.",
      "Had a night out end somewhere completely unexpected.",
      "Gone to a party knowing almost nobody there.",
      "Kissed someone you had just met at a party.",
      "Sent a risky text late at night.",
      "Sent a text to the wrong person and immediately regretted it.",
      "Made an impulsive decision because of a dare.",
      "Had to be helped home after a night out.",
      "Partied in the Michael Baker Building(ifykyk).",
      "Had a friendship become awkward after a night out.",
      "Woken up regretting something you posted on social media.",
      "Lied to your friends about where you were going.",
      "Had a night out become campus gossip.",
      "Done something at a party you swore you'd never do again.",
    ],
  },
  {
    id: "unholy",
    title: "the unholy beaver",
    subtitle: "you've made it this far. good luck.",
    questions: [
      "Had a one-night stand.",
      "Had a consensual hookup with another Penn State Beaver student.",
      "Hooked up with someone you knew for less than 24 hours.",
      "Hooked up with someone you said was just a friend.",
      "Hooked up with someone you later regretted getting involved with.",
      "Hooked up with a non-Beaver student on campus.",
      "Had an intimate encounter on campus outside a dorm.",
      "Kept a hookup secret from mutual friends.",
      "Hooked up with someone and then avoided them around campus.",
      "Had two romantic interests who knew each other.",
      "Had a secret hookup become public knowledge.",
      "Hooked up with an ex after breaking up.",
      "Had a romantic encounter that caused friendship drama.",
      "Had a consensual intimate encounter with someone from a party.",
      "Had a romantic encounter with someone from another Penn State campus.",
      "Been in an on-and-off relationship everyone had opinions about.",
      "Had a romantic encounter you never told your closest friends about.",
      "Had a hookup turn into a serious relationship.",
      "Had a secret relationship or hookup nearly get exposed.",
      "Done something at Penn State Beaver you'd never admit to your parents.",
    ],
  },
] as const;

let nextId = 1;

export const sections: QuestionSection[] = sectionData.map(
  (section) => ({
    id: section.id,
    title: section.title,
    subtitle: section.subtitle,
    questions: section.questions.map((text) => ({
      id: nextId++,
      text,
    })),
  })
);

export const questions = sections.flatMap(
  (section) => section.questions
);

export const QUESTION_VERSION = 1;
