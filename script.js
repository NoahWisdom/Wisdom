/* =========================================================
   Analytics stub
   ========================================================= */
function track(eventName, detail) {
  console.log('[track]', eventName, detail || '');
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-track]');
  if (el) track(el.dataset.track);
});

/* =========================================================
   Footer year
   ========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================================
   Mobile nav toggle
   ========================================================= */
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  primaryNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================================================
   Scroll reveal
   ========================================================= */
const revealEls = document.querySelectorAll('section > .wrap > *');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* =========================================================
   Hero flow visualization interaction
   ========================================================= */
const flowNodes = document.querySelectorAll('.flow-nodes .fn');
const flowTooltip = document.getElementById('flowTooltip');

const flowDescriptions = {
  social: 'Social media and content bring attention from people who don\u2019t know you yet.',
  website: 'A website turns that attention into visitors — a place to land, look, and act.',
  ai: 'An AI assistant answers questions and guides visitors instantly, day or night.',
  lead: 'Visitor details are captured automatically — no form left unanswered.',
  whatsapp: 'Qualified prospects are directed to WhatsApp for a real conversation.',
  booking: 'Or they book a consultation, service, or reservation directly.',
  retention: 'Automation follows up after the sale so customers come back.',
};

flowNodes.forEach((node) => {
  node.addEventListener('mouseenter', () => {
    const key = node.dataset.key;
    node.classList.add('is-active');
    if (flowTooltip && flowDescriptions[key]) {
      flowTooltip.textContent = flowDescriptions[key];
    }
    document.querySelectorAll('.flow-links line').forEach((line) => {
      line.classList.add('is-lit');
    });
  });
  node.addEventListener('mouseleave', () => {
    node.classList.remove('is-active');
    if (flowTooltip) flowTooltip.textContent = '';
    document.querySelectorAll('.flow-links line').forEach((line) => {
      line.classList.remove('is-lit');
    });
  });
  node.addEventListener('focus', () => {
    const key = node.dataset.key;
    if (flowTooltip && flowDescriptions[key]) {
      flowTooltip.textContent = flowDescriptions[key];
    }
  });
  node.addEventListener('blur', () => {
    if (flowTooltip) flowTooltip.textContent = '';
  });
});

/* =========================================================
   Problem section — interactive "with system" flow
   ========================================================= */
const flowWith = document.getElementById('flowWith');
if (flowWith) {
  const goodNodes = flowWith.querySelectorAll('.fv-good');
  const endNode = flowWith.querySelector('.fv-end-good');
  let stepIdx = 0;
  let stepTimer = null;

  function startFlowAnimation() {
    flowWith.classList.add('is-active');
    goodNodes.forEach((n) => n.classList.remove('is-step-active'));
    if (endNode) endNode.classList.remove('is-step-active');
    stepIdx = 0;
    if (stepTimer) clearTimeout(stepTimer);

    function nextStep() {
      if (stepIdx > 0 && goodNodes[stepIdx - 1]) {
        goodNodes[stepIdx - 1].classList.remove('is-step-active');
      }
      if (stepIdx < goodNodes.length) {
        goodNodes[stepIdx].classList.add('is-step-active');
        stepIdx++;
        stepTimer = setTimeout(nextStep, 600);
      } else if (endNode) {
        endNode.classList.add('is-step-active');
      }
    }
    nextStep();
  }

  const problemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startFlowAnimation();
          problemObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  problemObserver.observe(flowWith);
}

/* =========================================================
   System stages (The System section)
   ========================================================= */
const stageContent = {
  attract: {
    title: 'Attract',
    what: 'Social media and content bring attention to your business — posts, videos, and content that reach people who don\u2019t know you yet.',
    why: 'Without attention, nothing else in the system can work. But attention alone doesn\u2019t pay the bills — it needs somewhere to go.',
    build: ['Social media management', 'Content planning', 'Video editing', 'Content optimization'],
    flow: ['Social', 'Content', 'Audience'],
  },
  capture: {
    title: 'Capture',
    what: 'A website turns that attention into visitors and leads — a place people land, look around, and leave their details or ask a question.',
    why: 'Attention without a destination just bounces. A website gives followers somewhere to go and something to do.',
    build: ['Business websites', 'Landing pages', 'Responsive design', 'Conversion-focused pages'],
    flow: ['Visitor', 'Website', 'Lead'],
  },
  assist: {
    title: 'Assist',
    what: 'An AI assistant answers questions and guides visitors — instantly, at any hour, without someone having to be online to reply.',
    why: 'Most leads are lost in the gap between interest and reply. An assistant closes that gap to minutes, not days.',
    build: ['Website AI assistants', 'FAQ systems', 'Lead qualification', 'Customer guidance'],
    flow: ['Question', 'AI Assistant', 'Answer'],
  },
  convert: {
    title: 'Convert',
    what: 'The system directs qualified prospects toward the next real step: a purchase, a booking, a WhatsApp chat, or a consultation.',
    why: 'Interest that doesn\u2019t reach an action just fades. Conversion gives it a clear, easy next step.',
    build: ['Lead capture', 'WhatsApp flows', 'Booking', 'Consultation flows'],
    flow: ['Lead', 'WhatsApp', 'Purchase'],
  },
  followup: {
    title: 'Follow up',
    what: 'Automation follows up with leads and customers who didn\u2019t convert the first time, so interest doesn\u2019t quietly disappear.',
    why: 'Most people don\u2019t buy on the first contact. Follow-up is where the quiet majority turns into real customers.',
    build: ['n8n workflows', 'Follow-up sequences', 'Notifications', 'API integrations'],
    flow: ['No reply', 'Follow-up', 'Re-engage'],
  },
  retain: {
    title: 'Retain',
    what: 'Customers get useful follow-ups, reminders, and relevant communication after the sale — so the relationship doesn\u2019t end at checkout.',
    why: 'A customer who comes back is worth far more than a new one. Retention is where a business actually compounds.',
    build: ['Post-purchase automation', 'Reminders', 'Reorder flows', 'Support automation'],
    flow: ['Purchase', 'Follow-up', 'Retention'],
  },
};

const stageButtons = document.querySelectorAll('.stage-card');
const stageDetail = document.getElementById('stageDetail');

function setStage(key, btn) {
  stageButtons.forEach((b) => b.setAttribute('aria-expanded', String(b === btn)));
  const data = stageContent[key];
  if (!data || !stageDetail) return;
  stageDetail.innerHTML = `
    <h4>${data.title}</h4>
    <p>${data.what}</p>
    <p class="sd-why">${data.why}</p>
    <div class="sd-build">
      <span class="sd-build-label">What I can build</span>
      <ul class="service-caps">${data.build.map((i) => `<li>${i}</li>`).join('')}</ul>
    </div>
    <div class="sd-flow">
      ${data.flow.map((s, i) => `<span>${s}</span>${i < data.flow.length - 1 ? '<span class="sd-flow-arrow">\u2192</span>' : ''}`).join('')}
    </div>
  `;
  track('system-stage-view', key);
}

stageButtons.forEach((btn) => {
  btn.addEventListener('click', () => setStage(btn.dataset.stage, btn));
});

/* =========================================================
   AI assistant (rule-based, client-side only)
   ========================================================= */
const knowledgeBase = [
  {
    keywords: ['what does he do', 'what do you do', 'what does wisdom do', 'who is wisdom', 'who are you'],
    answer: 'Wisdom builds AI-powered systems for small businesses — websites, AI assistants, automation with tools like n8n, and the pieces that connect them, so attention turns into customers instead of leaking away.',
  },
  {
    keywords: ['chatbot', 'ai assistant', 'build an ai', 'can he build an ai'],
    answer: 'Yes — this chat is a small example of it. For a client, an assistant like this can answer FAQs, qualify leads, and hand qualified people off to WhatsApp or a booking flow.',
  },
  {
    keywords: ['automate', 'automation', 'n8n', 'workflow', 'can he automate'],
    answer: 'Automation usually means connecting the steps that are currently manual — a new lead landing in a database, getting checked by AI, and triggering a notification or follow-up, without anyone copying and pasting between tools.',
  },
  {
    keywords: ['clothing', 'clothing business', 'clothing brand'],
    answer: 'For a clothing business, a common setup is: social media for reach, a website with an AI assistant that recommends products and sizes, and a WhatsApp flow for order questions and follow-up after purchase.',
  },
  {
    keywords: ['more customers', 'where should i start', 'where do i start', 'get started', 'where should'],
    answer: 'Usually the first step is figuring out where attention is currently getting lost — unanswered messages, a slow website, or no follow-up after a sale — and fixing that one leak before adding anything new.',
  },
  {
    keywords: ['services', 'what can you build', 'what can he build', 'what does he build'],
    answer: 'Five areas: websites, AI assistants, business automation, customer conversion systems, and social/content — see the "What I Build" section for specifics on each.',
  },
  {
    keywords: ['contact', 'reach', 'hire', 'work with', 'talk'],
    answer: 'You can use the contact section below — email, WhatsApp, or just keep chatting here and I\u2019ll make sure it gets to Wisdom directly.',
  },
  {
    keywords: ['skills', 'experience', 'how long', 'learning'],
    answer: 'Wisdom is upfront about this: current skills are HTML, CSS, JavaScript, AI-assisted development, n8n automation, and basic chatbots — with backend systems and AI engineering as the next things being built toward.',
  },
  {
    keywords: ['help my business', 'how can he help'],
    answer: 'It depends on where attention is leaking. If people follow but never visit a site, it\u2019s a website problem. If they visit but never ask, it\u2019s an assistant problem. If they ask but never buy, it\u2019s a conversion problem. The first step is finding the leak.',
  },
  {
    keywords: ['restaurant'],
    answer: 'For a restaurant: a website with menu and hours, an AI assistant answering allergen and reservation questions, WhatsApp for takeout, and an automated reminder the day before a reservation.',
  },
  {
    keywords: ['price', 'cost', 'how much', 'budget'],
    answer: 'I don\u2019t have fixed pricing here — it depends on what you need. Use the contact section below to describe your problem and Wisdom will get back to you directly.',
  },
];

function findAnswer(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const entry of knowledgeBase) {
    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        const score = kw.length;
        if (score > bestScore) { bestScore = score; best = entry; }
      }
    }
  }
  return best ? best.answer : null;
}

const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatChips = document.getElementById('chatChips');

function appendMessage(text, who) {
  const msg = document.createElement('div');
  msg.className = `chat-msg chat-msg-${who}`;
  const p = document.createElement('p');
  p.textContent = text;
  msg.appendChild(p);
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'chat-msg-typing';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatLog.appendChild(typing);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

function askQuestion(question) {
  if (!question.trim()) return;
  appendMessage(question, 'user');
  track('assistant-question', question);
  const answer = findAnswer(question);

  showTyping();
  window.setTimeout(() => {
    removeTyping();
    appendMessage(
      answer || 'I don\u2019t have a good answer for that one yet. Use the contact section below and Wisdom can answer you directly.',
      'bot',
    );
  }, 600);
}

if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    askQuestion(chatInput.value);
    chatInput.value = '';
    chatInput.focus();
  });
}

if (chatChips) {
  chatChips.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => askQuestion(chip.textContent));
  });
}

/* =========================================================
   Business-type demo (Demos section)
   ========================================================= */
const bizContent = {
  restaurant: {
    title: 'Restaurant',
    items: [
      'Website with menu, hours, and a reservation link',
      'AI assistant that answers hours, menu, and allergen questions',
      'WhatsApp for reservations and takeout orders',
      'Automated reminder the day before a reservation',
    ],
  },
  clothing: {
    title: 'Clothing brand',
    items: [
      'Website showcasing the current collection',
      'AI assistant for sizing and product recommendations',
      'WhatsApp flow for order questions and styling help',
      'Automated follow-up after purchase for reorders',
    ],
  },
  cleaning: {
    title: 'Cleaning service',
    items: [
      'Landing page with service areas and pricing',
      'AI assistant that qualifies leads by property size and location',
      'Automated quote request routed straight to WhatsApp',
      'Follow-up automation for recurring bookings',
    ],
  },
  consultant: {
    title: 'Consultant',
    items: [
      'Website that positions your expertise clearly',
      'AI assistant that answers common questions before a call',
      'Booking flow for consultations',
      'Automated follow-up sequence after a first meeting',
    ],
  },
  realestate: {
    title: 'Real estate',
    items: [
      'Website with searchable listings',
      'AI assistant that answers property questions instantly',
      'Lead capture that qualifies buyer vs. renter intent',
      'Automated follow-up for viewings and open houses',
    ],
  },
  onlinestore: {
    title: 'Online store',
    items: [
      'Conversion-focused storefront',
      'AI assistant for product questions and order status',
      'Cart-abandonment follow-up automation',
      'WhatsApp for post-purchase support',
    ],
  },
};

const bizPicker = document.getElementById('bizPicker');
const bizOutput = document.getElementById('bizOutput');

if (bizPicker && bizOutput) {
  bizPicker.querySelectorAll('.biz-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      bizPicker.querySelectorAll('.biz-btn').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      const data = bizContent[btn.dataset.biz];
      if (!data) return;
      bizOutput.innerHTML = `<h4>${data.title}: what the system could look like</h4>
        <ul>${data.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
      track('demo-business-select', btn.dataset.biz);
    });
  });
}

/* =========================================================
   Transform section (What I Would Build)
   ========================================================= */
const transformData = {
  clothing: {
    before: ['Social Media', 'Followers', 'Manual DMs', 'Lost leads'],
    after: ['Social Media', 'Website', 'AI Product Assistant', 'Product Recommendation', 'WhatsApp', 'Follow-up'],
  },
  restaurant: {
    before: ['Social Media', 'Followers', 'No website', 'Lost bookings'],
    after: ['Social Media', 'Website', 'AI Assistant', 'Reservation', 'WhatsApp', 'Reminder'],
  },
  consultant: {
    before: ['Social Media', 'Profile visits', 'No follow-up', 'Lost clients'],
    after: ['Social Media', 'Website', 'AI Assistant', 'Booking', 'Consultation', 'Follow-up'],
  },
};

const transformTabs = document.getElementById('transformTabs');
const tpBefore = document.getElementById('tpBefore');
const tpAfter = document.getElementById('tpAfter');

function renderTransform(biz) {
  const data = transformData[biz];
  if (!data || !tpBefore || !tpAfter) return;
  tpBefore.innerHTML = data.before
    .map((s, i) => `<div class="fv-node fv-bad">${s}</div>${i < data.before.length - 1 ? '<div class="fv-arrow fv-arrow-fade"></div>' : ''}`)
    .join('');
  tpAfter.innerHTML = data.after
    .map((s, i) => {
      const isLast = i === data.after.length - 1;
      return `<div class="fv-node ${isLast ? 'fv-end-good' : 'fv-good'}">${s}</div>${!isLast ? '<div class="fv-arrow fv-arrow-active"></div>' : ''}`;
    })
    .join('');
}

if (transformTabs) {
  transformTabs.querySelectorAll('.tt-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      transformTabs.querySelectorAll('.tt-btn').forEach((b) => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
      renderTransform(btn.dataset.biz);
      track('transform-select', btn.dataset.biz);
    });
  });
  renderTransform('clothing');
}

/* =========================================================
   Future lab roadmap interaction
   ========================================================= */
const roadmapContent = [
  { title: 'Web Development', body: 'Building real, production-quality websites — not just tutorials. This is where I am now, and this site is part of that practice.' },
  { title: 'Software Engineering', body: 'Learning to structure code the way real software is structured — modules, data flow, testing, and maintainability.' },
  { title: 'Backend Systems', body: 'Understanding servers, databases, and APIs — the part of a system the user never sees but everything depends on.' },
  { title: 'AI Engineering', body: 'Moving beyond using AI tools to understanding how to integrate them into real systems with real constraints.' },
  { title: 'RAG', body: 'Retrieval-Augmented Generation — letting an AI answer from a specific knowledge base instead of its general training data. This assistant is a small step in that direction.' },
  { title: 'AI Agents', body: 'Systems where the AI doesn\u2019t just answer, but takes actions — checking, deciding, and calling other tools on its own.' },
  { title: 'Advanced Automation', body: 'Going beyond simple n8n workflows to multi-step, conditional, intelligent automation that can handle real business logic.' },
  { title: 'Production AI', body: 'Deploying AI systems that are reliable, monitored, and safe enough to run a real business on — not just demos.' },
  { title: 'AI Systems Engineering', body: 'The full picture — designing and building complete AI-powered systems end to end, from the user interface to the model to the automation behind it.' },
];

const roadmapButtons = document.querySelectorAll('.roadmap-item');
const roadmapDetail = document.getElementById('roadmapDetail');

function setRoadmap(idx, btn) {
  roadmapButtons.forEach((b) => b.setAttribute('aria-expanded', String(b === btn)));
  const data = roadmapContent[idx];
  if (!data || !roadmapDetail) return;
  roadmapDetail.innerHTML = `<h4>${data.title}</h4><p>${data.body}</p>`;
  track('roadmap-view', data.title);
}

roadmapButtons.forEach((btn) => {
  btn.addEventListener('click', () => setRoadmap(btn.dataset.rm, btn));
});

/* =========================================================
   Lead capture demo form (client-side only demo)
   ========================================================= */
const leadForm = document.getElementById('leadForm');
const leadStatus = document.getElementById('leadStatus');

if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!leadForm.checkValidity()) {
      leadForm.reportValidity();
      leadStatus.textContent = 'Please fill in every field before sending.';
      leadStatus.dataset.state = 'error';
      return;
    }
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    leadStatus.dataset.state = 'pending';
    track('demo-lead-submit');

    const flowNodes = leadForm.closest('.demo-card').querySelectorAll('.demo-flow .df-node');
    let step = 0;

    function highlightStep() {
      if (step > 0 && flowNodes[step - 1]) {
        flowNodes[step - 1].classList.remove('is-flowing');
      }
      if (step < flowNodes.length) {
        flowNodes[step].classList.add('is-flowing');
        step++;
        setTimeout(highlightStep, 300);
      } else {
        leadStatus.dataset.state = 'success';
        leadStatus.textContent = 'This is a demo, so nothing was actually sent \u2014 but this is exactly the moment a real webhook would fire.';
        submitBtn.disabled = false;
        leadForm.reset();
        setTimeout(() => {
          flowNodes.forEach((n) => n.classList.remove('is-flowing'));
        }, 2000);
      }
    }
    highlightStep();
  });
}
