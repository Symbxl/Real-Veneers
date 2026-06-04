export type TeamMember = {
  name: string;
  role: string;
  quote: string;
  photo: string;
  resume?: string;
};

// Photos live in /public/team and are matched by first name (e.g. Ryan.jpg).
// Resumes (PDFs) exist only for the four doctors; drop them in /public/team
// using the same naming convention (e.g. Ryan-resume.pdf) to light up the
// "Resume" button on those cards.
export const team: TeamMember[] = [
  {
    name: "Dr. Ryan Trevino",
    role: "Dentist",
    quote:
      "I see the vibrant potential in every smile and am attentive to detail, delivering with exceptional function and aesthetics.",
    photo: "/team/Ryan.jpg",
    resume: "/team/Resume%20Dr%20Ryan%20Trevino.pdf",
  },
  {
    name: "Dr. Parisa Sadeghi",
    role: "Dentist",
    quote:
      "Caring for your dental health is more than clean teeth, it's self-love, confidence, and a reason to smile every day. I want to help others feel proud of their smile because a healthy mouth can open the door to a happier life.",
    photo: "/team/Parisa.jpg",
    resume: "/team/Resume%20Dr%20Parisa%20Sadeghi.pdf",
  },
  {
    name: "Dr. Drew Rossi",
    role: "Periodontist",
    quote:
      "Using my expertise in regenerative periodontal therapy and soft and hard tissue reconstruction, as well as aesthetic periodontal services, I enjoy making my patients look and feel their best!",
    photo: "/team/Drew.jpg",
    resume: "/team/Resume%20Dr%20Drew%20Rossi.pdf",
  },
  {
    name: "Dr. Cade Foust",
    role: "Oral Surgery",
    quote:
      "Nothing makes me happier than to hear my patients ask, 'That's it?' at the end of a procedure.",
    photo: "/team/Cade.jpg",
    resume: "/team/Resume%20Dr%20Cade%20Foust.pdf",
  },
  {
    name: "Myrna",
    role: "Practice Administrator",
    quote:
      "There's nothing more rewarding than seeing a patient smile with confidence — transforming their smile truly transforms their life, and I love being a part of that journey.",
    photo: "/team/Myrna.jpg",
  },
  {
    name: "Cassy",
    role: "Patient Relations Assistant",
    quote:
      "Behind every healthy smile is a team that cares — not just about teeth, but about people. We don't just restore smiles… We create confidence! One patient, one moment, and one smile at a time. And I strive to have a smile that makes our patients want to smile too!",
    photo: "/team/Cassy.jpg",
  },
  {
    name: "Silvia",
    role: "Front Desk Assistant",
    quote:
      "I love being one of the first smiles that our patients see at our practice when they come to visit! I assist with all of the day-to-day front desk duties that help our patients feel welcomed and cared for. It brings me joy to see our patients leave feeling more comfortable and smiling brighter than when they arrived.",
    photo: "/team/Silvia.jpg",
  },
  {
    name: "Janet",
    role: "Dental Hygienist",
    quote:
      "My dedication is spending time to get to know my patients, make sure their needs are met, and help guide them towards the utmost quality of health.",
    photo: "/team/Janet.jpg",
  },
  {
    name: "Stana",
    role: "Dental Hygienist",
    quote:
      "What I enjoy most about my job is the opportunity to help patients achieve healthier mouths and healthier lives.",
    photo: "/team/Stana.jpg",
  },
  {
    name: "Joyce",
    role: "Dental Hygienist",
    quote:
      "Your smile should shine as the brightest light in any room, radiating warmth, confidence, and the joy of being authentic. My goal is to assist every patient in sharing that light effortlessly.",
    photo: "/team/Joyce.jpg",
  },
  {
    name: "Tiffany",
    role: "Dental Assistant",
    quote:
      "Being a dental assistant allows me to have so many rewarding moments, but by far, my favorite is being a part of giving someone back their smile.",
    photo: "/team/Tiffany.jpg",
  },
  {
    name: "Brenda",
    role: "Dental Assistant",
    quote:
      "I take joy in making sure every patient feels like they are at home.",
    photo: "/team/Brenda.jpg",
  },
  {
    name: "Sierra",
    role: "Brand Ambassador",
    quote:
      "From organizing team building events to celebrating birthdays, I love recognizing our team for the rockstars that they are!",
    photo: "/team/Sierra.jpg",
  },
];
