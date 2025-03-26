"use client";

// platforms.jsx
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Home,
  Linkedin,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Contact } from "./contact";
import "./platforms.css";

// Add these styles for the profile buttons
const buttonStyles = `
  .candidate-profile-links {
    display: flex;
    gap: 12px;
    margin: 12px auto;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 300px;
    perspective: 1000px;
  }

  .profile-button {
    padding: 10px 18px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1;
    backdrop-filter: blur(5px);
    transform-style: preserve-3d;
    width: 130px;
  }

  .profile-button svg {
    transition: transform 0.5s ease;
  }

  .profile-button:hover svg {
    transform: rotate(360deg);
  }
  
  .profile-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
    z-index: -1;
  }
  
  .profile-button:hover:before {
    left: 100%;
    animation: shine 1.5s infinite;
  }
  
  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .profile-button:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  
  .profile-button:hover:after {
    transform: scaleX(1);
  }

  .resume-button {
    background-color: rgba(240, 244, 248, 0.9);
    color: #2c5282;
    border: 2px solid #2c5282;
  }

  .resume-button:hover {
    background-color: #2c5282;
    color: white;
    transform: translateY(-5px) rotateX(10deg);
    box-shadow: 0 15px 25px rgba(44, 82, 130, 0.3);
  }

  .linkedin-button {
    background-color: #0077b5;
    color: white;
    border: 2px solid #0077b5;
  }

  .linkedin-button:hover {
    background-color: white;
    color: #0077b5;
    transform: translateY(-5px) rotateX(10deg);
    box-shadow: 0 15px 25px rgba(0, 119, 181, 0.3);
  }
  
  /* Pulse animation on load */
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }

  @keyframes glow {
    0% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
    50% { box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); }
    100% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
  }
  
  .candidate-profile-links .profile-button:nth-child(1) {
    animation: float 3s ease-in-out infinite, glow 3s ease-in-out infinite;
    animation-delay: 0.2s;
  }
  
  .candidate-profile-links .profile-button:nth-child(2) {
    animation: float 3s ease-in-out infinite, glow 3s ease-in-out infinite;
    animation-delay: 0.6s;
  }
  
  /* Responsive styles */
  @media (min-width: 641px) and (max-width: 1024px) {
    .candidate-profile-links {
      gap: 10px;
      max-width: 280px;
    }
    
    .profile-button {
      padding: 8px 16px;
      font-size: 0.85rem;
      width: 120px;
    }
  }

  @media (max-width: 640px) {
    .candidate-profile-links {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      max-width: 100%;
    }
    
    .profile-button {
      width: calc(50% - 4px);
      padding: 8px 12px;
      font-size: 0.8rem;
      transform-origin: center;
    }
    
    .profile-button:hover {
      transform: translateY(-3px) rotateX(5deg);
    }
  }

  @media (max-width: 380px) {
    .candidate-profile-links {
      flex-direction: column;
      max-width: 140px;
    }
    
    .profile-button {
      width: 100%;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .resume-button {
      background-color: #fff;
      color: #000;
      border-color: #90cdf4;
    }
    
    .resume-button:hover {
      background-color: #90cdf4;
      color: #fff;
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) {
    .profile-button {
      transition: all 0.3s ease;
    }
    
    .profile-button:active {
      transform: scale(0.95);
    }
  }
`;

export function CandidatePlatforms() {
  const [activePosition, setActivePosition] = useState("president");
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const positions = [
    { id: "president", title: "President" },
    { id: "vice-president", title: "Executive Vice President" },
    { id: "vp-finance", title: "VP Finance" },
    { id: "vp-marketing", title: "VP Marketing" },
    { id: "vp-relations", title: "VP Corporate Relations" },
    { id: "vp-hr", title: "VP Human Resources" },
    { id: "vp-comms", title: "VP Communications/Outreach" },
    { id: "vp-confs", title: "VP Conferences/Case Competitions" },
    { id: "vp-tech", title: "VP Tech & Design" },
  ];

  const candidates = [
    {
      id: 1,
      name: "Yash Ramnani",
      position: "president",
      image: "img/platforms/yash-ramnani.jpg",
      linkedin: "https://www.linkedin.com/in/yash-ramnani-4b737b255/",
      resume: "img/platforms/yash.pdf",
      platform: `My name is Yash Ramnani. I am a 3rd Year International Student in the Business program with a specialization in Entrepreneurship. I am running to be your next President for 2025/2026 Academic Year.

Over the past year, I’ve had the privilege of serving as the Executive Vice President of TBSA, playing a core role in revitalizing this association alongside an incredible team. Since last summer, I’ve worked closely with the President to rebuild TBSA from the ground up — from organizing and hiring our VPs and Associates to supporting every level of operation.

One of my proudest moments was leading the planning, marketing, and execution of TBSA’s flagship event, the Building BRIDGES Formal. From bringing in notable industry professionals (including a guest from LA) to securing Maple Light as a beverage partner, I’ve seen firsthand how far we’ve come — but I also know we’ve only just scratched the surface of what’s possible.

I am running for President because I believe in continuing this momentum. Our previous President gave TBSA a strong foundation, and I want to build on that by setting a standard for growth, structure, and sustainability for future teams to thrive.

In addition to my work within TBSA, I have also represented Trent and our business community on several external stages. I’ve served as the External Campus Ambassador for TRMC (Ted Rogers Management Conference), which is the biggest student led conference in North America for two consecutive years, I’ve also competed in the Expand Your Empire (EYE) competition proudly representing Trent at events where we previously had no presence. Beyond that, I’ve attended national-level conferences such as BSA Roundtable and NBSC, where Business Student Associations from across Canada come together to collaborate, learn, and grow. These experiences have not only broadened my perspective but have strengthened my commitment to raising Trent’s profile at a national level.

If elected, my key goals will be:
•	Expanding the reach of TBSA events to engage more students and industry professionals.
•	Elevating the Buy the River Case Competition by inviting other universities and establishing it as a signature, large-scale event for Trent.
•	Setting up clear systems and frameworks that future TBSA teams can build on with confidence and direction.
•	Positioning TBSA on a national level by increasing its visibility, presence, and reputation across Canada’s business student associations and professional networks.

TBSA has given me so much — leadership experience, personal growth, and pride in being part of a community that’s constantly evolving. Attending conferences and competitions has shown me just how much potential Trent’s business community holds. I’m running for President to take that potential to the next level, to grow something sustainable, and to ensure that Trent Business students have a strong platform and voice — not just on campus, but across Canada.

I’d be honored to continue serving and leading this community forward.
`,
    },
    {
      id: 2,
      name: "Joh Magok",
      position: "president",
      image: "img/platforms/Magok.jpg",
      linkedin: "https://www.linkedin.com/in/joh-magok",
      resume: "img/platforms/magok_resume.pdf",
      platform: `Voicing your Vision
                  Hi, my name is Magok. I am running for the next president of the Trent School of Business. Why?  I am enthusiastic to chart a path to paint a new face to the Trent School of Business.  Together we will create a lively, innovative, and empowering environment for every student in the School of Business.

                  My experience as a student ambassador and a keen observer of the happenings in the business world and the leading schools of businesses in Canada and around the globe has impressed an unquenchable desire to bring the needed change that will leave a lasting impact in your career, my career, and the greater Trent community.
                  
                  What do I bring?
                  My vision for the Trent School of Business is to 
                  1. Reintroduce Trent business TED Talks.  The last one held at Trent was 12 years ago.
                  2. Alumni connect: Great experience comes from connecting with the right people. It is my vision to create a strong network of connection with the Trent alumni and initiate mentorship opportunities.
                  3. Strengthen relations and increase engagement with Innovation Cluster and similar organizations.
                  4. Business socials. We will have events like trivia nights, coffee chats, and themed parties to help students connect with peers and faculty.
                  5. A designated room for business students to test and try unconventional ways to unleash their creativity and bring their dreams to reality.

                  Importantly, I will not just lead but will listen to the great ideas that you have that will make us your dream school of business.
                  
                  Vote for Magok, voice your vision!
                  `,
    },
    {
      id: 3,
      name: "Almeena Manal",
      position: "vice-president",
      image: "img/platforms/Manal.jpeg",
      resume: "img/platforms/Almeena_resume.pdf",
      linkedin: "http://www.linkedin.com/in/almeenamanal",
      platform: `Throughout my tenure as Corporate Relations Associate with the Trent Business Students' Association (TBSA), I have actively contributed to its growth and strategic development. I am committed to further enhancing the value TBSA provides to our student community by creating impactful opportunities and building robust relationships within the corporate world.

My role has allowed me to secure the TBSA's very first corporate sponsorship, laying the foundation for sustainable and meaningful partnerships. Collaborating closely with the President and Executive Vice President during the initial set-up of TBSA provided me with deep insights into our association's core objectives and potential growth strategies.
Representing TBSA as one of the few Trent associate at the National Business School Conference (NBSC), I gained invaluable knowledge from student leaders across Canada, learning best practices in student leadership and association management. This experience equipped me with innovative ideas, strategies, and actionable insights, directly influencing my approach to securing additional corporate sponsors and creating new student development opportunities.

In pursuit of maximizing student potential and preparing our peers for successful careers, I have actively collaborated with the Peterborough and Kawartha Chamber of Commerce, cultivating opportunities that allow business students to engage directly with local businesses and industry leaders. 

My unique experience as the sole associate attending the Canadian Association of Business Students (CABS) Conference granted me extensive insights into best practices and successful strategies implemented by top business student associations across Canada. Inspired by these interactions, I have a clear vision and actionable plans to propel TBSA to a nationally recognized standard of excellence.

Furthermore, being closely involved in organizing the TBSA Gala alongside all subsidiary presidents provided me with hands-on experience in event management and cross-departmental collaboration. Handling diverse tasks across all departments of TBSA has strengthened my comprehensive understanding of our organization's operations and the strategic direction required for its continuous improvement.

Looking to the future, my goals include further expanding corporate sponsorships, enhancing professional development programming, and establishing a comprehensive mentorship initiative to guide students toward successful career paths. My candidacy is driven by a commitment to student empowerment, professional excellence, and organizational growth. With my proven record of achievements and extensive knowledge acquired through direct interactions with industry leaders, student executives, and successful associations, I am dedicated to implementing strategies that advance TBSA's mission and significantly enhance opportunities for Trent Business students.

I ask for your support to continue building on this foundation, ensuring TBSA remains a transformative organization fully committed to the success, growth, and professional advancement of every student we represent.
`,
    },
    {
      id: 4,
      name: "Hitika Somani",
      position: "vice-president",
      image: "img/platforms/Somani.jpeg",
      linkedin: "https://www.linkedin.com/in/hitika-somani/",
      resume: "img/platforms/Somani.pdf",
      platform: `Hello Trent Business Students!

My name is Hitika, and I am honored to stand as a candidate for Executive Vice President of the Trent Business Students Association. Through this campaign, I’m not just asking for your vote—I’m asking for your belief in a vision that will take TBSA to new heights.

As your current Vice President of Conferences and Case Competitions, I have poured my passion and dedication into creating high-impact opportunities for our members. From participating in conferences that connect us to the broader business world to hosting case competitions that sharpen our skills and inspire greatness, I have witnessed the incredible potential of our community. But now, I’m ready to do more. I’m ready to serve you as your Executive Vice President.

My journey at Trent has been rich with experiences that have prepared me for this role. Through serving as Vice President of Conferences and Case Competitions at TBSA, actively participating in Active Minds, Champlain Cabinet, Enactus, EntreHive, the IMPACT Leadership Program, and the Office of Student Affairs, I have gained invaluable insights into how clubs and groups operate, how to lead them effectively, and most importantly, how to lead with compassion.

I am here to be a pillar of leadership—ensuring stability, excellence, and unwavering support. My mission is clear: To expand, empower, and elevate TBSA like never before.

I have a vision: To expand TBSA’s reach beyond traditional boundaries by actively welcoming Economics students into our network. This initiative will open doors to fresh ideas, secure additional funding, and create a more vibrant and collaborative community. More resources mean more opportunities. More students represent TBSA with pride, excelling in conferences, and bringing back experiences that inspire even greater achievements.

But that’s not all. I will take marketing and promotional efforts to unprecedented heights. The Annual TBSA Gala will be a showcase of our growth and ambition, with collaboration across business clubs under our umbrella. With increased funding from our expanded network, we will empower more delegates to attend conferences and case competitions—offering them experiences that will sharpen their skills and broaden their networks.

My goal is also to transform how we operate. By enhancing procedural alignment and streamlining meeting agendas, I will ensure our organization functions with clarity, efficiency, and impact. Because excellence isn’t just about moving fast—it’s about making every step count.

And above all, I am driven by a desire to see Buy the River become a bigger, more powerful force than ever before. With the right resources, passion, and dedication, we will make this event a signature celebration of our unity and strength. We will attract more participants, generate more funding, and create unforgettable experiences that will leave a lasting impact on our community.

I am not just running for this position—I am running to create a community where every student’s potential can shine. To build TBSA where collaboration and excellence are the cornerstones of our success. 

Your vote is your voice. Let’s build something extraordinary. 
`,
    },
    {
      id: 5,
      name: "Zainab Ahsan Chiya",
      position: "vp-finance",
      image: "img/platforms/Chiya.jpg",
      linkedin: "https://www.linkedin.com/in/zainab-chiya-89188634a",
      resume: "img/platforms/zainabChiya.pdf",
      platform: `Hello Trent Business and Economics students!

      My name is Zainab Chiya, and I am a 3rd-year Business Administration student specializing in Accounting. I am thrilled to announce my candidacy for Vice President of Finance for the Trent Business Student Association. As your current Communications and Outreach Associate within the TBSA, I have had the privilege of working closely with our team to build connections and engage with our vibrant student community. Now, I am eager to take on a new role that aligns with my passion for financial management and dedication to serving you.

      Why Me?
      With a strong foundation in accounting and hands-on experience in student leadership, I am confident in my ability to manage and optimize TBSA’s financial resources effectively. My academic background in business administration has equipped me with essential skills in budgeting, financial reporting, and strategic planning. In addition, my experience as Communications and Outreach Associate has honed my ability to communicate transparently and work collaboratively to achieve our association’s goals.

      My Vision and Goals

      1.	Financial Transparency and Accountability:
        o	I will ensure that all financial reports and budgets are easily accessible and clearly communicated to members.
        o	Regular updates on financial performance and spending will be provided to maintain transparency.
      
    2.	Efficient Budgeting and Fund Allocation:
      o	I will develop detailed and realistic budgets that prioritize essential programs and initiatives while allowing room for new ideas.
o	I will collaborate closely with other executives to align our financial decisions with the association’s mission and student needs.

3.	Maximizing Opportunities and Resources:
o	I will actively seek sponsorships and funding opportunities to support TBSA events and initiatives.
o	Through careful planning and strategic investments, I aim to enhance the quality and variety of events and workshops available to students.

4.	Financial Literacy and Student Engagement:
o	I will organize workshops to empower students with fundamental financial skills, such as budgeting and personal finance management.
o	By promoting financial literacy, I hope to equip students with the tools they need for both personal and professional success.

Why Your Support Matters
As your Vice President of Finance, I am committed to upholding the integrity and accountability of TBSA’s financial practices. I believe that responsible and transparent financial management is the key to maintaining our association’s success and sustainability. Your support would mean the world to me as I strive to make a positive impact on our community.
Thank you for your consideration, and I look forward to earning your vote!
`,
    },
    {
      id: 6,
      name: "Bryanna Carter",
      position: "vp-finance",
      image: "img/platforms/Carter.jpg",
      linkedin: "https://www.linkedin.com/in/bryanna-carter",
      resume: "img/platforms/Carter.pdf",
      platform: `Welcome. 

My name is Bryanna Carter, and I'm applying to be the Vice President of Finance of the Trent Business Student Association (TBSA) at Trent University. I am in my fourth year with a Bachelor of Science in Business Administration and Forensic Science with a minor in Anthropology and a Specialization in Law and Policing. As a dedicated student and the outgoing Joint-Major Representative and incoming Treasurer of the Forensic Science Society, this year's Co-Chair of the East vs West Charity Hockey Game, and outgoing Community Representative of the Otonabee College Cabinet, I am eager to put the skills I have gained and continue my love of engagement and collaboration. I can fulfill the Vice President of Finance role with high attention to detail and organizational skills. 

As a student, I’ve fulfilled various roles outside of clubs, such as on the Varsity Events Staff at the Athletics Centre for the last two years and as the Administrative/Communications Ambassador at First People’s House of Learning outside of my involvement within on-campus clubs. In these roles, I have gained strong leadership, communication and the ability to prioritize. Balancing academics, work, and extracurriculars has reinforced my belief in the value of student engagement and networking. As one of two Co-Chairs for this year's East vs. West Charity Hockey Game, I incorporated these values into my work. This included the mini clubs and groups and the Alumni vs Faculty game to incorporate our larger community. The planning, coordination and execution spanned various Trent University departments, building transferable communication and leadership skills. Through my experience with FPHL, as Co-Chair and as a joint major with a specialization and a minor, organizational skills have been key to ensuring that I met deadlines, planned, and ensured orderly presentation for success by outlining objectives and capabilities needed. As Co-Chair, I secured donations and sponsorships, effectively expanding the event’s reach and financial support within the Trent and Peterborough communities. 

Outside of my student involvement, I have significant exposure to managing budgets and revenue, including that of a Chase the Ace fundraiser within my home province, raising over $1 million in profit and giving away the jackpot of $1.2 million in 2021. I was responsible for ensuring that all tickets were accounted for and calculating the amounts allocated to the organization, the weekly/bi-weekly winner, and the jackpot. In my recent employment as the Summer Student Coordinator, I received a budget of six figures to allocate to the fifty summer students I oversaw, ensuring inquiries and submitting proper documentation to support my decisions and leadership. 

I am excited at the opportunity to bring my financial expertise, leadership experience, and passion for student engagement to the TBSA. I look forward to the possibility of contributing to its success. 

Best regards, 
Bryanna 
`,
    },
    {
      id:8,
      name: 'Jereni Jeyakaran',
      position: 'vp-marketing',
      image: 'img/platforms/Cathreen.jpg',
      resume: 'img/platforms/Cathreen.pdf',
      linkedin: 'https://www.linkedin.com/in/jereni-jeyakaran-241988311/',
      platform: `Empowering Student Voices, Elevating TBSA

      My name is Jereni, and I am excited to announce my candidacy for Vice President of Marketing for the Trent Business Students’ Association. As a marketing student with a passion for creativity, branding, and student engagement, I believe I have the vision, experience, and dedication to take TBSA’s marketing to the next level.

      My Experience: Bridging Finance and Marketing

      Currently serving as TBSA’s Finance Associate, I have had the privilege of working closely with the executive team to support the association’s financial operations. From budget tracking to fund allocation for student events, I have seen firsthand how TBSA brings value to business students at Trent. This role has strengthened my strategic planning skills, given me deep insight into event execution, and allowed me to understand the importance of marketing in driving engagement and participation.

      Beyond finance, my passion for marketing has always been at the forefront of my work. As a marketing student, I am constantly exploring new strategies to enhance branding and communication. My background in marketing and finance uniquely positions me to align TBSA’s marketing efforts with its financial goals, ensuring that we maximize outreach without compromising efficiency.

      My Vision: A More Engaging, Dynamic TBSA

      If elected as VP Marketing, my primary focus will be to create a marketing strategy that is student-centered, interactive, and impactful. Here’s how I plan to do it:

      1. Strengthening TBSA’s Digital Presence
      In today’s digital world, effective online engagement is key to reaching students. I will enhance TBSA’s social media strategy by:
      Creating high-quality, engaging content across social media to showcase events, student achievements, and career opportunities.
      Implementing a more structured content calendar to ensure consistency and relevance in our posts.
      Introducing interactive campaigns, such as student takeovers, Q&A sessions, and behind-the-scenes content to make TBSA more relatable and accessible.

      2. Amplifying Student Voices
As a representative of business students, I want TBSA’s marketing to reflect the voices of our diverse student body. I will:
Facilitate open forums and polls to gather student feedback on what they want to see from TBSA’s marketing and events.
Collaborate with clubs and student organizations to cross-promote events and initiatives, fostering a stronger sense of community.

3. Elevating TBSA’s Events Through Strategic Branding
Effective marketing makes events more successful and impactful. I will:
Develop stronger branding for TBSA’s flagship events, ensuring they are well-recognized and highly anticipated.
Introduce creative promotional materials, such as teaser videos, event countdowns, and visually appealing posters, to boost attendance.
Strengthen partnerships with local businesses to provide sponsorship opportunities and student-exclusive deals.

Why Vote for Me?
I am not just running for VP Marketing, I am running to make TBSA more engaging, student-focused, and impactful. My experience as Finance Associate has given me a deep understanding of TBSA’s operations and my passion for marketing ensures that I will bring fresh, innovative ideas to the table. I am committed to making sure that every business student at Trent feels connected, informed, and excited about TBSA’s initiatives.

If you want to see TBSA’s marketing become more dynamic, student-centered, and strategic, I would be honored to have your vote. Let’s work together to elevate our student experience and make TBSA stronger than ever!

Vote Jereni for VP Marketing – Because Your Voice Matters.
`,
    },
    {
      id:9,
      name: 'Oshin Vijayvargiya',
      position: 'vp-marketing',
      image: 'img/platforms/Oshin.png',
      linkedin: 'https://www.linkedin.com/in/oshin-vijayvargiya-3378a5290/',
      resume: 'img/platforms/Oshin.pdf',
      platform: `Hello Trent Business Students!

My name is Oshin Vijayvargiya, and I am honored to stand as a candidate for Vice President of Marketing for the Trent Business Students Association (TBSA). Through this campaign, I’m not just asking for your vote—I’m asking for your belief in a vision that will redefine how TBSA engages with students, amplifies its brand, and builds a powerful, connected business community.

As your TBSA Brand Ambassador, I have dedicated myself to promoting events, driving student engagement, and enhancing our presence on campus. My role as the External Affairs Coordinator for the Trent Finance and Investments Club has been pivotal in shaping impactful initiatives like the Building Bridges Gala and Buy the River—Trent’s first-ever finance case competition. These experiences have refined my skills in strategic marketing, event promotion, and community outreach. But now, I am ready to do more. I am ready to lead you as your Vice President of Marketing.

My journey at Trent has been nothing short of transformative. From my involvement in Champlain College leadership, O-Week leadership, and Open House volunteering, I have learned how to connect with students, craft meaningful experiences, and build a sense of belonging. Now, I am prepared to use these skills to elevate TBSA’s marketing to unprecedented heights, ensuring that every student feels welcomed, valued, and inspired by the opportunities we create.

I believe that TBSA’s success depends on strong partnerships and consistent professionalism. As VP of Marketing, I will ensure that the TBSA’s brand is represented with excellence and properly advertised at all events, establishing our presence and credibility.

Strengthening Connections with Business & Professional Clubs
I will work closely with clubs like Enactus, EntreHive, and the Trent Finance and Investments Club to promote joint initiatives, cross-club events, and collaborative workshops. Together, we will combine resources, reach a broader audience, and offer more valuable experiences for all students.

Connecting with External Partners for Greater Impact
I will establish partnerships with local businesses, alumni, and industry professionals to attract more sponsorships, networking sessions, and mentorship programs. These connections will provide TBSA with valuable funding, enhanced professional development opportunities, and a stronger bridge between students and the business world.

I have a vision: To make TBSA’s marketing bold, engaging, and student-driven. This means creating content that resonates, storytelling that inspires, and a digital presence that captivates. Here’s how we do it:

A Revitalized Social Media Strategy: I will enhance engagement by promoting student success stories, highlighting TBSA’s unique value, and ensuring every event gets the visibility it deserves.

Interactive Campaigns & Vibrant Platforms: Through video content, student takeovers, and creative campaigns, we will make TBSA’s platforms more exciting and inviting.

Stronger Branding for Major Events: The Annual Gala, Buy the River, and other flagship events will receive the branding attention they deserve, ensuring greater exposure, participation, and unforgettable experiences.

I am not just running for this position—I am running to create a TBSA that is vibrant, connected, and thriving. To build a community where every student feels represented, every voice is heard, and every opportunity is seized.

Your vote is your voice. Let’s build something extraordinary. Let’s make this vision a reality—together.
`,
    },
    {
      id:10,
      name: 'Ali Jammal',
      position: 'vp-relations',
      image: 'img/platforms/Jammal.jpg',
      linkedin: 'https://www.linkedin.com/in/ali-jammal-/',
      resume: 'img/platforms/Jammal.pdf',
      platform: `Ali Jammal for VP of Corporate Affairs

      More Connections. More Funding. More Opportunities.

      Let’s be honest the TBSA thrives on relationships, sponsorships, and a little bit of well-placed persuasion. You want a VP of Corporate Affairs who can bring in the funding, lock down strategic partnerships, and create real career opportunities for students—not just another person who talks about networking but never follows up. That’s exactly why I’m running.

      I’m not just comfortable in corporate settings, I live and breathe business relations. As a Researcher and Data Analytics Intern at Robertson & Company, I engaged with over 100 software companies, analyzing industry trends and exploring corporate partnerships that support workforce management solutions. I know what companies look for in a partnership, and I’ll use that knowledge to turn TBSA into a go-to organization for corporate sponsors, alumni, and industry leaders.

      Why Vote for Me?
      1.	I Secure Funding and Corporate Deals.
As VP of Events for Enactus Canada, I successfully secured product supplies by negotiating with corporate partners and local businesses. I know how to pitch, negotiate, and deliver value to sponsors—which means more money for TBSA’s initiatives and events.

2.	I Know How to Build Meaningful Connections.
At Robertson & Company, I developed corporate relationships that supported business growth, which is exactly what I’ll do for TBSA. I’ll expand our alumni network, bring in more guest speakers, and establish long-term corporate partnerships that benefit students for years to come.

3.	I Create Real Student Opportunities.
My experience in corporate research and workforce management has shown me exactly what companies look for when hiring young professionals. I understand how to bridge the gap between students and industry leaders, ensuring that more students have access to internships, job placements, and mentorship programs that actually help launch careers and not just fill up a resume.

What’s the Plan?
•	Secure more funding and sponsorships to make TBSA events bigger and better.
•	Expand our alumni network to create more mentorship and career-building opportunities.
•	Build lasting corporate partnerships that bring in speakers, internships, and industry connections.
•	Represent TBSA and the School of Business in high-profile corporate and educational spaces.

Vote Ali Jammal for VP of Corporate Affairs because sponsorships shouldn’t be a struggle, networking shouldn’t be a chore, and TBSA deserves a leader who delivers.

`,
    },
    {
      id:11,
      name: 'Ethen Jacob Ninan',
      position: 'vp-relations',
      image: 'img/platforms/Jacob.JPG',
      linkedin: 'https://www.linkedin.com/in/ethen-jacob-ninan-21a0b525a',
      resume: 'img/platforms/Jacob.pdf',
      platform: `Hello,
My name is Ethen Jacob Ninan. I am a third-year student studying Business and Media, and this is my candidate platform for my application to run for VP of HR for the Trent Business Student Association 2025-26. As VP of HR in the TBSA, you can expect me to maintain a steady yet strong culture within the group as well as create a healthy and conducive environment for the upcoming members to work in harmony. 
I believe passionate people working toward a common goal with dedication and perseverance can achieve amazing things. However, to such an end, there is a constant need to ensure that all members of the group reach a common state of understanding as well as a common standard of workplace behavior. In my attempt to do this to the best of my abilities, I aim:
to build a strong and respectful culture within the team, one that is inclusive in nature and runs on camaraderie and understanding. 
to make policies based on the dynamic of the group, as members would have different workstyles and cultural differences, I would ensure that the policies made for our work consider everyone’s abilities. 
to keep a professionally liberal experience for our members, by keeping a strict lookout on duties while ensuring members know that they have the freedom to use their creative leverage in their work. 
to be fair and just during conflict resolution, by establishing a resolution system that provides members with the confidence to confide in the resolving member as a part of maintaining open communication within the team.
to implement an organized and effective recruitment system, by appealing to a diverse and talented body of students while ensuring their growth in the organization by setting desirable goals and targets, as a strong team is only as strong as its members.

I believe I am the right candidate for this position as my approach to the position is professionally strict yet comforting as my group policies would be based on my members themselves and their characters. Additionally, I genuinely care about the well-being and success of every member and am passionate about carrying on the torch that would be passed on to me while respecting the culture and name that was created for TBSA by its past members. 

For any further questions or information about my platform, please feel free to reach out to me!
Ethen Jacob Ninan
Contact: ethenninan@trentu.ca


`,
    },
    {
      id: 12,
      name: 'Joel Jude Partey',
      position: 'vp-comms',
      image: 'img/platforms/JJ.jpeg',
      linkedin: 'https://www.linkedin.com/in/joel-jude-partey-1880331a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      resume: 'img/platforms/JJ.pdf',
      platform: `I’m thrilled to announce my candidacy for Vice President of Communications & Outreach for the Trent Business Students Association (TBSA). As a Business Finance student at Trent University, I’m passionate about bringing people together, amplifying student voices, and creating engaging content that represents our dynamic community.

      This role isn’t just about managing social media, it’s about fostering real connections, strengthening our presence on and off campus, and ensuring every student feels heard and involved. That’s exactly what I aim to do.

      Why Am I Running?
I’m running for this position because communication is my strength, and connection is my passion. At Trent, I’ve had the privilege of engaging with students from all backgrounds—whether as a Residence Life Don, a TISA representative, or a radio show host for Trent Radio.
I love bringing people together, sparking conversations, and ensuring every voice matters. TBSA is already an incredible platform, but I see so much potential to expand our reach, enhance engagement, and create a stronger sense of community among business students.

What Makes Me the Right Choice?
✔️ Leadership & Community Engagement
As a Residence Life Don, I learned to build trust, foster relationships, and communicate effectively. Managing diverse student groups strengthened my ability to listen, adapt, and create meaningful initiatives and skills essential for TBSA’s outreach efforts.
✔️ Student Advocacy & Event Planning
As a TISA representative, I advocated for international students, organized networking events, and boosted engagement. I understand what it takes to coordinate successful events and bring ideas to life.
✔️ Content Creation & Media Experience
Hosting a radio show on Trent Radio gave me experience in creating engaging content, managing media platforms, and keeping audiences connected. I’ll bring this same energy to TBSA’s social media, newsletters, and outreach initiatives.
My Vision for the Role

If elected, I will focus on three key areas:
1️⃣ Boosting Social Media Engagement
I’ll work closely with our social media team to create content that’s not just informative, but engaging and interactive. Expect more student features, behind-the-scenes insights, and fun posts showcasing the vibrant TBSA community.
2️⃣ Strengthening Communication
Clear communication is key to keeping students informed. I’ll ensure TBSA’s updates are accessible, well-publicized, and engaging, while also collaborating with other student organizations to expand outreach.
3️⃣ Revitalizing the Trentpreneur Radio Show
With my experience hosting “Spill the Tea-sa” on Trent Radio, I’ll breathe new life into Trentpreneur, featuring student entrepreneurs, business success stories, and insightful discussions to educate, entertain, and inspire.

Why Vote for Me?
I genuinely care about this community. TBSA should be more than just a name—it should be a community students actively engage with.
With my experience, creativity, and passion for communication, I’m confident I can enhance TBSA’s presence, strengthen our connections, and make our outreach more impactful.

I would be honored to serve as your VP of Communications & Outreach and humbly ask for your support. Let’s make TBSA bigger, better, and more connected together!

Thank you for your time and consideration.

`,
    },
    {
      id:13,
      name: 'Lakshit Kalra',
      position: 'vp-comms',
      image: 'img/platforms/Kalra.png',
      linkedin: 'https://www.linkedin.com/in/lakshit-kalra-220569236/',
      resume: 'img/platforms/Kalra.pdf',
      platform: `Hello, Trent Business community! I am Lakshit Kalra, and I am excited to be standing as a candidate for Vice President of Communications & Outreach for the Trent Business Students Association (TBSA). As an Honours Business Administration student, I have a strong foundation in social media management, content creation, and outreach. My internship with TeenPreneurs, in which I designed and executed social media campaigns, engaged with influencers, and amplified my brand presence, has awarded me expertise in digital communication. In addition, with my internship with Pure Pristine Products, I handled eBook publishing and internet marketing, enhancing my understanding of branding and reaching the audience. I also possess a solid videography background, having served as a videographer for four consecutive years for Goenka World MUN. I captured and edited event coverage, created promotional videos, and coordinated media coverage. This consistent commitment is a testament to my ability to handle communication, brand-building, and outreach—key competencies of this role.

      If elected, I will ensure a better online presence for TBSA through frequent and engaging content on Instagram, LinkedIn, and TikTok, with frequent updates and more student participation. I will ensure stronger student connections through better communication between TBSA and the business student population, with simple updates on events, networking, and resources. I intend to promote the TBSA events by strengthening collaborations with student organizations, faculty, and industry professionals, making the student experience more valuable. I will also ensure that the Trentpreneur Radio Show is entertaining and informative, featuring student entrepreneurs, alums, and industry guests to provide insights into the business world.

      Besides outreach and communication, I would like to offer business workshops and skill development sessions accessible to all Trent students. The sessions would involve essential skills such as personal branding, networking strategies, digital marketing, and entrepreneurial skills to equip students with practical skills beyond the classroom.

      With strong leadership, creativity, and strategic thinking, I am committed to making TBSA outreach more effective and engaging. My content generation, public speaking, and videography abilities will add value to TBSA's presence and interactions. I am committed to student engagement and transparent communication. I will regularly solicit suggestions to ensure that TBSA is a platform that reflects and represents business students. Vote for Lakshit Kalra as your next VP of Communications & Outreach, and let's take TBSA to new heights together!
`,
    },
    {
      id:14,
      name: 'Tapchin Dawurang',
      position: 'vp-comms',
      image: 'img/platforms/Tapchin.jpeg',
      linkedin: 'https://www.linkedin.com/in/tapchin-dawurang-02a358259/',
      resume: 'img/platforms/Tapchin.pdf',
      platform: `Hello,
My name is Tapchin Dawurang, a third-year Business Administration & Information Systems major, and I’m excited to run for the position of Vice President Communications and Outreach of the TBSA. Being an excellent communicator, a passionate content creator and a social-media-savvy Business student, I’m beyond certain that my tenure would leave an evident impact on the TBSA, and would greatly improve the Associations social and online presence. The goal is maximum exposure, and I will achieve just that. 

If elected, as previously stated, my goal is to maximize TBSA’s exposure. I’ve been in Trent for 3 years now, and I only discovered the TBSA in 2025. That proves one in two things, either the Association is low on engagement, or it was just created. Seeing as the latter is not the case, where there is a problem, I provide a solution. I plan to revamp the groups digital presence by introducing fresh, trending and engaging content. At the end of the day, we’re here for the students, and my mission is to create a safe online space where students can feel heard, considered and informed. I would do so by making the platforms more inclusive and interactive, thus creating a better community for Business students, and urging them to participate more in club affairs.

With my proficiency in graphic design, content creation, videography and social media management, coupled with my student leadership skills as I also stand as the Director of Events in TACSU, I’m certain this role is perfect for me and my input would be perfect for the organization. I’m a content creator, and I have a strong passion for social media. I have experience in creating, planning and scheduling content and also in managing brands social media platforms to fit what they stand for. My past roles at Hiho Silver, Sallyz and Stickybit3s have equipped me with the ability to communicate, work under pressure, work in a team and create tactics that constantly evolve.I am confident that my ever-improving skills, my passion for social media and my desire for interactive student engagement all work together to thoroughly prepare me for this role. 

In a nutshell, my tenure aims to bridge the gap between the TBSA and the students it stands for. Through creating a stronger, safer and more interactive online presence, I will see to it that the Association isn’t just one they hear about or see around, its one they engage with. With support from the amazing team, there’s no telling the heights the TBSA can attain. Let’s make sure every student knows, and benefits from the TBSA.
`,
    },
    {
      id:15,
      name: 'Kiflain Rahman',
      position: 'vp-comms',
      image: 'img/platforms/Rahman.JPG',
      linkedin: 'https://www.linkedin.com/in/kiflain-rahman/',
      resume: 'img/platforms/Rahman.pdf',
      platform: `My name is Kiflain Rahman, a third-year BBA/LLB student at Trent University, and I am excited to run for a position on the Trent Business Student Association (TBSA). With a strong background in leadership, sales, and customer service, I am eager to contribute to the TBSA by fostering professional growth, networking opportunities, and student engagement within our business community.

      My diverse experience in sales, marketing, and leadership has equipped me with the skills needed to represent and advocate for business students effectively:
•	Sales Representative at Pepsico Canada – Strengthened my ability to communicate persuasively and promote products effectively.
•	Leadership and Teamwork – Gained expertise in problem-solving and collaboration through various roles, including as a team lead at Galati Market Fresh and a long-term volunteer at A.Y. Jackson Secondary School.
•	Marketing and Customer Engagement – Experience as an advertiser and marketing strategist, ensuring effective outreach and student involvement.
•	Multilingual & Adaptive – Fluent in English, French, Hindi, and Urdu, enabling me to connect with a diverse student body and foster an inclusive environment.

If elected, I will focus on the following key initiatives to enhance the TBSA’s impact:
1.	Expanding Professional Development – Organizing workshops, networking events, and guest speaker sessions to bridge the gap between students and industry professionals.
2.	Enhancing Student Engagement – Creating more opportunities for students to participate in business case competitions, mentorship programs, and skill-building activities.
3.	Strengthening Communication – Improving outreach through social media, newsletters, and student feedback channels to ensure TBSA remains transparent and responsive to student concerns.
4.	Promoting Inclusivity – Encouraging greater involvement from international and underrepresented students by providing tailored resources and support.

I am committed to making the TBSA a more dynamic and student-focused organization. With my experience in leadership, marketing, and problem-solving, I believe I can drive meaningful change that benefits all business students. I would be honored to represent you—vote Kiflain Rahman for TBSA Executive!

`,
    },
    {
      id:16,
      name: 'Angadveer Sigh Bedi',
      position: 'vp-confs',
      image: 'img/platforms/Bedi.jpeg',
      linkedin: 'https://www.linkedin.com/in/angadveer-singh-bedi-9774a2295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      resume: 'img/platforms/Bedi.pdf',
      platform: `Why Vote For Me?

      As VP of Conferences & Case Competitions, I will do more than just promote opportunities—I will create a system that ensures student success, engagement, and recognition in case competitions and conferences. My plan is about accessibility, preparation, and industry integration to give TBSA students an edge.

      My Plan & Execution
Case Comp Bootcamps & Simulation Rounds
●	Organize monthly boot camps where past competitors and alumni train students on problem-solving, analysis, and presentation skills.
●	Host 90-minute simulation rounds with live feedback from faculty and professionals.     
-	Accountability: Track attendance, publish stats reports, and celebrate top performers on leaderboards.

Take Trent to More Case Competitions 
●	Track and secure participation in all major case competitions across Canada so Trent can compete at the national level.
●	Subsidize travel and participation costs by getting sponsorships and external funding.
●	Early prep system so students have time to practice before competitions.
-	Accountability: Publish a list of competitions Trent will be entering, track performance, and structured training sessions.

TBSA’s Flagship Case Competition 
●	Trent’s first big case competition, invite Trent students and other universities to compete.
●	Corporate sponsorships for prizes, internships, and networking.
●	Early planning to get judges, faculty support and smooth execution.
-	Accountability: Timeline, student input and transparent updates.

Bigger & Better TBSA Events 
●	Expand Buy the River Case Comp, more attendance, sponsorships and make it the premiere networking and Business competition.
●	Early event planning to get bigger venues, guest speakers, and smooth execution.
-	Accountability: Event roadmap and student feedback to improve future events.

Live Case Showdowns & Case Draft Night
●	Organize TED-style case competitions where students present solutions to an audience and judges.
●	Implement Case Draft Night where experienced and new competitors are matched to form balanced teams.
-	Accountability: Collect feedback, publish participation stats and adjust based on student input. Will be exclusively for the student body of Trent University.

TBSA Case Comp Hub & Knowledge Bank
●	Create an online database with past case studies, winning presentations, and judge feedback.
●	Set up an internal review panel where past competitors break down successful strategies.
-	Accountability: Publish quarterly updates and track student engagement with resources.

Industry-Sponsored Case Challenges & Networking
●	Partner with local businesses to introduce real-world industry-sponsored cases where winners get internship opportunities.
●	Organize "Business Leaders Roundtables" for networking and career mentorship.
-	Accountability: Maintain a public tracker of sponsorships and partnerships.

Multidisciplinary Case Teams & Wildcard Entries
●	Collaborate with various faculties to create diverse teams.
●	Introduce “Wildcard Teams”, mixing students from different disciplines to foster innovation.
-	Accountability: Track performance and publish insights on the benefits of interdisciplinary problem-solving.

`,
    },
    {
      id:17,
      name: 'Khushal Sethiya',
      position: 'vp-confs',
      image: 'img/platforms/Sethiya.png',
      linkedin: 'https://www.linkedin.com/in/khushalsethiya/ ',
      resume: 'img/platforms/Sethiya.pdf',
      platform: `My name is Khushal Sethiya, and I am excited to run for the position of Vice President of Conferences and Case Competitions. As a dedicated student with a passion for strategic problem-solving and professional development, I aim to enhance the club’s engagement in high-impact conferences and case competitions. Through my experience in finance, event coordination, and business development, I am prepared to create meaningful opportunities for our members to gain hands-on experience, expand their networks, and develop industry-relevant skills.

      Why Me?
As a second-year Computer Science (BSc Hons) student with a minor in Business Administration at Trent University, I have actively sought leadership opportunities to broaden my skill set. My involvement as an Event Coordinator at the Trent Finance and Investment Club has given me firsthand experience in organizing successful events, conducting risk assessments, and securing sponsorships to support club initiatives. Additionally, my role as Director of External Affairs for SAAT (South Asian Association at Trent) has strengthened my ability to collaborate with external organizations and enhance student experiences. Beyond my leadership roles, I also volunteered at HackTrent, assisting in organizing and executing the hackathon, further solidifying my ability to coordinate competitive events successfully. Additionally, I also participated in Buy The River, Trent’s first case competition organized by TBSA earlier this year. These experiences have given me insight into what makes a case competition successful, and I am eager to use this knowledge to elevate the club’s participation in future competitions.

My Vision and Goals
As Vice President of Conferences and Case Competitions, I will take a proactive approach to facilitating and planning team meetings and practice sessions. These sessions will focus on equipping participants with the necessary skills and strategies to excel in competitions. I will also ensure clear and timely communication with the Trent Business Students' Association and the broader student body about various opportunities to participate in external case competitions. By staying up to date with new and emerging opportunities for conferences and case competitions, I will work to keep our members informed and engaged.

Additionally, I will represent the TBSA in conferences and case competitions that align with the best interests of both the TBSA and the School of Business. My goal is to not only participate in these events but also to establish valuable connections and learning experiences that can benefit all students. Furthermore, I will actively assist the TBSA and interested students in preparing for conferences and case competitions by organizing training workshops, securing mentorship from experienced professionals, and providing structured guidance to ensure strong representation in these events.

To summarize, As VP of Conferences and Case Competitions, my mission is to elevate our club’s standing in the competitive landscape by fostering a culture of preparation, engagement, and success. My leadership experience, combined with my passion for strategy and finance, makes me the right candidate to strengthen our presence in case competitions and conferences. I look forward to your support in making this vision a reality. Together, we can create more opportunities for growth and achievement.

Vote Khushal Sethiya for VP Conferences/Case Competitions!
`,
    },
    {
      id:18,
      name: 'Adedamola (Dami) Adesanya',
      position: 'vp-hr',
      image: 'img/platforms/Adesanya.jpg',
      linkedin: 'https://www.linkedin.com/in/adedamolaadesanya',
      resume: 'img/platforms/Adesanya.pdf',
      platform: `Dear Trent Business Student Association Members,
My name is Adedamola Adesanya, and I am excited to announce my candidacy for the Vice President of Human Resources position for the Trent Business Student Association (TBSA). As a fourth-year Business Administration student specializing in Human Resources and the current HR Associate for TBSA, I have firsthand experience in supporting our student community and driving HR initiatives within the association.

Why Me?
My role as TBSA’s HR Associate has given me valuable insights into the needs of our student body and the inner workings of our organization. Additionally, my experience working at the front desk for Trent International and my background in HR-focused coursework have strengthened my leadership, communication, and organizational skills. My previous roles as a pharmacy assistant at the Ontario Addiction Treatment Center (OATC) and an assisted living aide in Nigeria have further developed my ability to work with diverse individuals, manage responsibilities effectively, and create inclusive environments.

My Vision for TBSA
1.	Enhancing Student Engagement & Inclusion
o	Strengthen mentorship programs connecting students with alumni and industry professionals.
o	Promote diversity, equity, and inclusion initiatives within TBSA to ensure all students feel represented and heard.

2.	Professional Development & Career Readiness
o	Organize hands-on workshops on resume building, interview skills, and networking strategies.
o	Collaborate with companies and HR professionals to provide internship and career opportunities.

3.	Strengthening Internal HR Processes
o	Improve recruitment and onboarding procedures to ensure smooth transitions for new TBSA members.
o	Foster a positive and engaging team culture through structured team-building activities and open communication channels.

With my passion for human resources, leadership experience, and dedication to student success, I am committed to making TBSA an even stronger and more supportive organization for all. I look forward to earning your support and working together to create meaningful opportunities for Trent Business students.
`,
    },
    {
      id:19,
      name: 'Rita Sobayo',
      position: 'vp-hr',
      image: 'img/platforms/nike.png',
      linkedin: 'http://linkedin.com/in/rita-sobayo',
      resume: 'img/platforms/nike.pdf',
      platform: `Hello,
My name is Rita, I am currently in my third year at Trent University, majoring in Business Administration and Information Systems. I am running for Vice President of Human Resources because I believe in fostering a positive, inclusive, and supportive environment where every TBSA member feels valued, heard, and empowered.

I am a naturally curious and talkative person—I love a good chat, and these qualities enhance my communication and leadership skills. Talking to people helps me understand different perspectives, allowing me to foster a culture of collaboration and respect. These skills make me an excellent fit for this role because I enjoy engaging with people, resolving conflicts, and creating an environment where everyone thrives.

I live by three core values: Respect, Honesty, and Growth. Treating everyone with respect is very important to me and I believe everyone deserves it and it should always go both ways. Honesty matters for the simple reason, because it breeds trust. Growth is also very essential, because we all need to develop personally and professionally, and I want to help TBSA members achieve that in every way possible.

My goal as VP of Human Resources is to create an environment where there is little to no conflict, and where everyone feels happy and satisfied in their work. I want to ensure that every member feels included and has opportunities for both personal and professional growth. I will implement workshops and team-building activities to help members develop skills and strengthen relationships. I will also work toward fair and just treatment of all members, ensuring that everyone feels valued and respected.

I have strong leadership experience that has prepared me for this role. As an Orientation Week Leader at Trent, I helped new students adjust, created a welcoming environment, and worked closely with a team to ensure a smooth experience. I also helped organize the Kawartha World Issues Centre’s Women’s Day event, where I worked effectively with a team, resolved conflicts, and fostered collaboration. These experiences have given me the ability to mediate conflicts, encourage teamwork, and create inclusive spaces.

As your VP of Human Resources, I will be approachable and supportive, ensuring that every member has someone they can rely on. I will be proactive and encouraging, providing open communication, constructive feedback, and conflict resolution strategies. Most importantly, I will be dedicated to your growth, working to create opportunities that help every TBSA member develop and succeed.

I am excited about this opportunity to serve TBSA and work alongside you to make it a stronger, more united organization. 

Vote for Rita for VP of Human Resources!

`,
    },
    {
      id:20,
      name: 'Millicent Bless Dzikunu',
      position: 'vp-hr',
      image: 'img/platforms/Bless.png',
      linkedin: 'https://www.linkedin.com/in/millicent-dzikunu-0671b623b',
      resume: 'img/platforms/Bless.pdf',
      platform: `Dear TBSA ,
      I am excited to express my interest in the Vice President of Human Resources role at the Trent Business Students Association (TBSA). As a passionate and driven individual with strong leadership and interpersonal skills, I am eager to contribute to fostering a positive, cohesive, and inclusive environment for TBSA members.

      With experience in team leadership, conflict resolution, and community engagement, I have developed a deep understanding of what it takes to build strong teams and support members effectively. As a Leadership Participant in the Impact Leadership Program at Trent University, I have worked alongside diverse teams, enhancing my ability to motivate, mentor, and foster collaboration. My experience as a Program Facilitator, Event Usher, & Coordinator has equipped me with the skills to engage with people, address concerns proactively, and create a welcoming atmosphere—all essential for this position. Additionally, as a Store Supervisor, I managed a team, oversaw performance evaluations, and ensured smooth daily operations, strengthening my ability to handle grievances, promote team satisfaction, and implement training initiatives.

      I am particularly drawn to this role because of the opportunity to help shape TBSA’s work culture, provide mentorship, and ensure every member feels valued and supported. My ability to strategically implement policies, resolve conflicts, and organize practical training sessions makes me confident in my success in this role. Furthermore, my proficiency in Microsoft Office, problem-solving, and adaptability ensure I can handle the responsibilities efficiently and professionally.

      I am eager to further discuss how my skills and experiences align with TBSA’s goals. Thank you for your time and consideration—I look forward to the possibility of contributing to this dynamic and inspiring student organization.

      Best regards,
      Millicent Bless Dzikunu
`,
    },
    {
      id:21,
      name: 'Dhrumil Dungrani',
      position: 'vp-tech',
      image: 'img/platforms/dave.jpg',
      linkedin: 'https://www.linkedin.com/in/ddungrani',
      resume: 'img/platforms/dave.pdf',
      platform: `Leadership, Innovation, and Efficiency—these are the pillars I will bring to the Trent Business Students’ Association (TBSA) as your next Vice President of Technology. As a third-year Computer Science student with a planned minor in Business Administration, I have dedicated my time at Trent University to not only excel academically but also foster a meaningful change in student organizations.

      As a third-year student majoring in Computer Science with a planned minor in Business Administration, I have spent my time at Trent not only refining my technical skills but also using them to uplift student organizations. Currently, I serve as the Vice President of Logistics for TFIC - Trent Finance and Investments Club, where I played a key role in organizing Buy the River, Trent’s first-ever case competition, in collaboration with TBSA. This event gave students a platform to showcase their skills and connect with industry professionals. I also led coordination for HackTrent, the largest student-run hackathon in Trent’s history, providing nearly 200 participants with an enriching and seamless experience. Every initiative I take on is with the intention of making Trent a place where students have access to more opportunities, better resources, and stronger networks.

      Technology plays a vital role in shaping student life, and in this position, I will ensure TBSA remains at the forefront of innovation. I will help develop and manage TBSA’s official website, making it a one-stop resource for event registrations, networking opportunities, and essential updates. I will also oversee our online platforms—such as Discord and event ticketing systems—creating spaces where students can connect with our executives, access mentorship, and stay informed about opportunities that matter to them.

      Beyond improving digital accessibility, I will take an active role in ensuring that technology works for students, not against them. Whether it’s troubleshooting issues that affect student engagement, optimizing event check-in systems, or ensuring that livestreamed events run smoothly, my priority will be to remove barriers and make TBSA’s initiatives as seamless as possible. My approach is not just about fixing problems—it’s about proactively designing solutions that enhance the overall student experience.

      I have built my time at Trent around service—ensuring that the organizations I work with leave a meaningful impact on students. With your support, I will continue working towards a Trent that is more connected, efficient, and enriched with opportunities for every student.
`,
    },
    {
      id: 22,
      name: 'Muhammad Raffay',
      position: 'vp-tech',
      image: 'img/platforms/Magoon.jpg',
      linkedin: 'https://www.linkedin.com/in/mr25/',
      resume: 'img/platforms/Magoon.pdf',
      platform: `My name is Muhammad Raffay, and I am excited to announce my candidacy for Vice President Technology at TBSA.
      
      Here’s a $1 for you visit the link: <a href="https://boisterous-baklava-bce4a3.netlify.app" style="color: #0077b5; text-decoration: underline;">link</a>
      
      As an innovative student with a background in all thing's tech & I am committed to improving the technological landscape of TBSA to enhance student experience business (I mean, someone has to, right?), by effectively utilising modern technology (except the Wi-Fi.)
      
      My vision is to leverage technology to create an interactive digital ecosystem for TBSA members. Even your grandma will want to sign up.
      
      Key Initiatives
      1.	Creating the TBSA Website; Revamping Digital Presence
          -	For better navigation and accessibility.
          -	Up-to-date content, event listings, and announcements.
          -	Implement a feedback system to continuously enhance the platform.
      
      2.	Enhanced Communication & Collaboration Tools
          -	Introduce a structured digital workspace (Discord) for TBSA executives and members.
          -	Develop a centralized resource hub for important documents and updates.
      
      3.	Automation & Data
          -	Create user-friendly systems for event registrations and feedback collection.
          -	Implement data driven statistics and reporting tools for events. To find the most needed events.
      
      4.	Support for Student Tech Initiatives
          -	Provide resources for students interested in tech projects.
          -	Encourage partnerships with local and global tech communities.
      
      By voting for me as your Vice President Technology, you are supporting a future where technology empowers students through exposure and enhances their experience. Let's build a smarter TBSA!`,
  },
  ];

  // Group candidates by position
  const candidatesByPosition = positions.reduce((acc, position) => {
    acc[position.id] = candidates.filter(
      (candidate) => candidate.position === position.id
    );
    return acc;
  }, {});

  const filteredCandidates = candidates.filter((candidate) => {
    return (
      (activePosition === "all" || candidate.position === activePosition) &&
      (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.platform.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const toggleCandidate = (id, event) => {
    // Prevent event bubbling
    if (event) event.stopPropagation();
    setExpandedCandidate(expandedCandidate === id ? null : id);
  };

  return (
    <div className="candidates-page">
      <style>{buttonStyles}</style>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          <div className="header-left">
            <Link to="/" className="home-link">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <div className="logo-container">
              <img
                src="/img/logo.png"
                alt="Trent University Logo"
                className="header-logo"
              />
              <h1>Meet Your Candidates</h1>
            </div>
          </div>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search candidates or platforms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </header>

      <div className="hero-section">
        <div className="overlay">
          <h2 className="fade-in">Meet Your Candidates</h2>
          <p className="fade-in delay">
            Learn about the platforms and vote for your future leaders
          </p>
        </div>
      </div>

      <div className="container main-content">
        <div className="position-filter">
          <button
            className={activePosition === "all" ? "active" : ""}
            onClick={() => setActivePosition("all")}
          >
            All Positions
          </button>
          {positions.map((position) => (
            <button
              key={position.id}
              className={activePosition === position.id ? "active" : ""}
              onClick={() => setActivePosition(position.id)}
            >
              {position.title}
            </button>
          ))}
        </div>

        {activePosition === "all" ? (
          // Display all positions with their candidate summaries
          positions.map((position) => (
            <div key={position.id} className="position-section">
              <h2 className="position-title">{position.title}</h2>
              {candidatesByPosition[position.id]?.length > 0 ? (
                <>
                  <div className="candidates-summary">
                    {candidatesByPosition[position.id].map((candidate) => (
                      <div
                        key={candidate.id}
                        className="candidate-summary-card"
                      >
                        <div
                          className="candidate-summary-image"
                          onClick={(e) => toggleCandidate(candidate.id, e)}
                        >
                          <img
                            src={candidate.image || "/placeholder.svg"}
                            alt={candidate.name}
                          />
                        </div>
                        <h3 onClick={(e) => toggleCandidate(candidate.id, e)}>
                          {candidate.name}
                        </h3>
                        <div className="candidate-profile-links">
                          {candidate.resume && (
                            <a
                              href={candidate.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="profile-button resume-button"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FileText size={16} />
                              Resume
                            </a>
                          )}
                          {candidate.linkedin && (
                            <a
                              href={candidate.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="profile-button linkedin-button"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin size={16} />
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="candidates-grid">
                    {candidatesByPosition[position.id].map((candidate) => (
                      <div key={candidate.id} className="candidate-card">
                        <div
                          className="candidate-header"
                          onClick={(e) => toggleCandidate(candidate.id, e)}
                        >
                          <div className="candidate-image-container">
                            <img
                              src={candidate.image || "/placeholder.svg"}
                              alt={candidate.name}
                              className="candidate-image"
                            />
                          </div>
                          <div className="candidate-info">
                            <h3>{candidate.name}</h3>
                            <p className="candidate-position">
                              {position.title}
                            </p>
                          </div>
                          <div className="expand-icon">
                            {expandedCandidate === candidate.id ? (
                              <ChevronUp size={24} />
                            ) : (
                              <ChevronDown size={24} />
                            )}
                          </div>
                        </div>

                        {expandedCandidate === candidate.id && (
                          <div
                            className="candidate-platform"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h4>Platform</h4>
                            <p>{candidate.platform}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="no-candidates">
                  No candidates for this position yet.
                </p>
              )}
            </div>
          ))
        ) : (
          // Display only the selected position
          <div className="position-section">
            <h2 className="position-title">
              {positions.find((p) => p.id === activePosition)?.title ||
                activePosition}
            </h2>
            {filteredCandidates.length > 0 ? (
              <>
                <div className="candidates-summary">
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-summary-card">
                      <div
                        className="candidate-summary-image"
                        onClick={(e) => toggleCandidate(candidate.id, e)}
                      >
                        <img
                          src={candidate.image || "/placeholder.svg"}
                          alt={candidate.name}
                        />
                      </div>
                      <h3 onClick={(e) => toggleCandidate(candidate.id, e)}>
                        {candidate.name}
                      </h3>
                      <div className="candidate-profile-links">
                        {candidate.resume && (
                          <a
                            href={candidate.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-button resume-button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FileText size={16} />
                            Resume
                          </a>
                        )}
                        {candidate.linkedin && (
                          <a
                            href={candidate.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-button linkedin-button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin size={16} />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="candidates-grid">
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-card">
                      <div
                        className="candidate-header"
                        onClick={(e) => toggleCandidate(candidate.id, e)}
                      >
                        <div className="candidate-image-container">
                          <img
                            src={candidate.image || "/placeholder.svg"}
                            alt={candidate.name}
                            className="candidate-image"
                          />
                        </div>
                        <div className="candidate-info">
                          <h3>{candidate.name}</h3>
                          <p className="candidate-position">
                            {positions.find((p) => p.id === candidate.position)
                              ?.title || candidate.position}
                          </p>
                        </div>
                        <div className="expand-icon">
                          {expandedCandidate === candidate.id ? (
                            <ChevronUp size={24} />
                          ) : (
                            <ChevronDown size={24} />
                          )}
                        </div>
                      </div>

                      {expandedCandidate === candidate.id && (
                        <div
                          className="candidate-platform"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h4>Platform</h4>
                            <p 
                          dangerouslySetInnerHTML={{ 
                            __html: candidate.platform
                              .replace(/\n/g, '<br>')
                              .replace(/\s\s+/g, ' &nbsp;') 
                          }}
                        ></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="no-candidates">
                No candidates match your search criteria.
              </p>
            )}
          </div>
        )}
      </div>
      <Contact />
    </div>
  );
}

export default CandidatePlatforms;
