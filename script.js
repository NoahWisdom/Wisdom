/* =========================================================
   Small analytics stub
   Replace `track()` with real analytics (GA4, Plausible, etc.)
   or a call to your own /events endpoint / n8n webhook.
   ========================================================= */
function track(eventName, detail) {
  // Placeholder — wire this up to real analytics later.
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
   System stages (My System section)
   ========================================================= */
const stageContent = {
  attract: {
    title: 'Attract',
    body: 'Social media and content bring attention to your business in the first place — posts, videos, and content that reach people who don\u2019t know you yet.'
  },
  capture: {
    title: 'Capture',
    body: 'A website turns that attention into visitors and leads — a place people land, look around, and leave their details or ask a question.'
  },
  assist: {
    title: 'Assist',
    body: 'An AI assistant answers questions and guides visitors — instantly, at any hour, without someone having to be online to reply.'
  },
  convert: {
    title: 'Convert',
    body: 'The system directs qualified prospects toward the next real step: a purchase, a booking, a WhatsApp chat, or a consultation.'
  },
  followup: {
    title: 'Follow up',
    body: 'Automation follows up with leads and customers who didn\u2019t convert the first time, so interest doesn\u2019t just quietly disappear.'
  },
  retain: {
    title: 'Retain',
    body: 'Customers get useful follow-ups, reminders, and relevant communication after the sale — so the relationship doesn\u2019t end at checkout.'
  }
};

const stageButtons = document.querySelectorAll('.stage-btn');
const stageDetail = document.getElementById('stageDetail');

function setStage(key, btn) {
  stageButtons.forEach((b) => b.setAttribute('aria-expanded', String(b === btn)));
  const data = stageContent[key];
  if (!data || !stageDetail) return;
  stageDetail.innerHTML = `<h4>${data.title}</h4><p>${data.body}</p>`;
  track('system-stage-view', key);
}

stageButtons.forEach((btn) => {
  btn.addEventListener('click', () => setStage(btn.dataset.stage, btn));
});

/* =========================================================
   AI assistant (rule-based, client-side only — no external calls)
   ========================================================= */
const knowledgeBase = [
  {
    keywords: ['what does he do', 'what do you do', 'who is alex', 'who are you'],
    answer: 'Alex builds AI-powered systems for small businesses — websites, AI assistants, automation with tools like n8n, and the pieces that connect them, so attention turns into customers instead of leaking away.'
  },
  {
    keywords: ['chatbot', 'ai assistant', 'build an ai'],
    answer: 'Yes — this chat is a small example of it. For a client, an assistant like this can answer FAQs, qualify leads, and hand qualified people off to WhatsApp or a booking flow.'
  },
  {
    keywords: ['automate', 'automation', 'n8n', 'workflow'],
    answer: 'Automation usually means connecting the steps that are currently manual — a new lead landing in a database, getting checked by AI, and triggering a notification or follow-up, without anyone copying and pasting between tools.'
  },
  {
    keywords: ['clothing', 'clothing business', 'clothing brand'],
    answer: 'For a clothing business, a common setup is: social media for reach, a website with an AI assistant that recommends products and sizes, and a WhatsApp flow for order questions and follow-up after purchase.'
  },
  {
    keywords: ['more customers', 'where should i start', 'where do i start', 'get started'],
    answer: 'Usually the first step is figuring out where attention is currently getting lost — unanswered messages, a slow website, or no follow-up after a sale — and fixing that one leak before adding anything new.'
  },
  {
    keywords: ['services', 'what can you build', 'what can he build'],
    answer: 'Five areas: websites, AI assistants, business automation, customer conversion systems, and social/content — see the "What I build" section above for specifics on each.'
  },
  {
    keywords: ['contact', 'reach', 'hire', 'work with'],
    answer: 'You can use the contact section below — email, WhatsApp, or just keep chatting here and I\u2019ll make sure it gets to Alex directly.'
  },
  {
    keywords: ['learning', 'skills', 'experience', 'how long'],
    answer: 'Alex is upfront about this: current skills are HTML, CSS, JavaScript, AI-assisted development, n8n automation, and basic chatbots — with backend systems and AI engineering as the next things being built toward.'
  }
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

function askQuestion(question) {
  if (!question.trim()) return;
  appendMessage(question, 'user');
  track('assistant-question', question);
  const answer = findAnswer(question);
  window.setTimeout(() => {
    appendMessage(
      answer || 'I don\u2019t have a good answer for that one yet. Use the contact section below and Alex can answer you directly.',
      'bot'
    );
  }, 250);
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
   Business-type demo
   ========================================================= */
const bizContent = {
  restaurant: {
    title: 'Restaurant',
    items: [
      'Website with menu, hours, and a reservation link',
      'AI assistant that answers hours, menu, and allergen questions',
      'WhatsApp for reservations and takeout orders',
      'Automated reminder the day before a reservation'
    ]
  },
  clothing: {
    title: 'Clothing brand',
    items: [
      'Website showcasing the current collection',
      'AI assistant for sizing and product recommendations',
      'WhatsApp flow for order questions and styling help',
      'Automated follow-up after purchase for reorders'
    ]
  },
  cleaning: {
    title: 'Cleaning service',
    items: [
      'Landing page with service areas and pricing',
      'AI assistant that qualifies leads by property size and location',
      'Automated quote request routed straight to WhatsApp',
      'Follow-up automation for recurring bookings'
    ]
  },
  consultant: {
    title: 'Consultant',
    items: [
      'Website that positions your expertise clearly',
      'AI assistant that answers common questions before a call',
      'Booking flow for consultations',
      'Automated follow-up sequence after a first meeting'
    ]
  },
  realestate: {
    title: 'Real estate',
    items: [
      'Website with searchable listings',
      'AI assistant that answers property questions instantly',
      'Lead capture that qualifies buyer vs. renter intent',
      'Automated follow-up for viewings and open houses'
    ]
  },
  onlinestore: {
    title: 'Online store',
    items: [
      'Conversion-focused storefront',
      'AI assistant for product questions and order status',
      'Cart-abandonment follow-up automation',
      'WhatsApp for post-purchase support'
    ]
  }
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
   Lead capture demo form (client-side only demo)
   In production, replace the setTimeout below with a fetch()
   call to your n8n webhook, e.g.:
     fetch('https://YOUR-N8N-INSTANCE/webhook/lead', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ name, email, need })
     });
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
    leadStatus.textContent = 'Sending…';
    track('demo-lead-submit');

    window.setTimeout(() => {
      leadStatus.dataset.state = 'success';
      leadStatus.textContent = 'This is a demo, so nothing was actually sent — but this is exactly the moment a real webhook would fire.';
      submitBtn.disabled = false;
      leadForm.reset();
    }, 700);
  });
}
