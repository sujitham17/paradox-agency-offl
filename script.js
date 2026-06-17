/* ==========================================================================
   PARADOX CLIENT-SIDE INTERACTIONS (NEO-BRUTALIST STYLE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initCounterAnimation();
  initMetricsChart();
  initTypewriter();
});

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle-btn');
  const navMenu = document.getElementById('navigation-bar');
  const navLinks = navMenu.querySelectorAll('a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Accessibility states
      const expanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   SCROLL REVEAL ANIMATION
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Add slight staggered delay for grid elements
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   COUNTER NUMBERS ANIMATION
   ========================================================================== */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500; // Animation duration in ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function: Cubic Out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      let currentValue = easeProgress * target;
      
      // If it is a whole number, format it cleanly
      if (Number.isInteger(target)) {
        el.textContent = prefix + Math.floor(currentValue) + suffix;
      } else {
        el.textContent = prefix + currentValue.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(num => counterObserver.observe(num));
}

/* ==========================================================================
   CASE STUDY ACCORDION TOGGLE
   ========================================================================== */
function toggleCaseStudy(cardId) {
  const selectedCard = document.getElementById(cardId);
  const accordions = document.querySelectorAll('.case-accordion-card');

  if (selectedCard) {
    const isOpen = selectedCard.classList.contains('open');
    const header = selectedCard.querySelector('.case-card-header');

    // Close all other accordions for neat collapse
    accordions.forEach(card => {
      card.classList.remove('open');
      const cardHeader = card.querySelector('.case-card-header');
      if (cardHeader) {
        cardHeader.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle selected accordion
    if (!isOpen) {
      selectedCard.classList.add('open');
      header.setAttribute('aria-expanded', 'true');
    } else {
      selectedCard.classList.remove('open');
      header.setAttribute('aria-expanded', 'false');
    }
  }
}

/* ==========================================================================
   METRICS LIVE CHART (CUSTOM CANVAS RENDERER)
   ========================================================================== */
const chartData = {
  revenue: {
    title: 'Aggregate Client Revenue Growth',
    labels: ['Q1 Pre', 'Q2 Pre', 'Q1 P1', 'Q2 P1', 'Q3 P1', 'Q4 P1'],
    before: [120, 115, 118, 122, 125, 130],
    after: [null, null, 130, 190, 290, 440],
    yLabel: 'Revenue (k$)',
    beforeColor: '#4e5a6a', // Slate grey
    afterColor: '#046bd2'   // Primary Blue
  },
  leads: {
    title: 'Monthly Qualified Leads Generated',
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    before: [18, 20, 17, 19, 21, 18],
    after: [null, null, 45, 98, 162, 240],
    yLabel: 'Leads Count',
    beforeColor: '#4e5a6a',
    afterColor: '#046bd2'
  },
  cpl: {
    title: 'Cost Per Lead (Client Average)',
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    before: [380, 390, 370, 400, 385, 395],
    after: [null, null, 280, 190, 130, 94],
    yLabel: 'CPL ($)',
    beforeColor: '#4e5a6a',
    afterColor: '#0ca678'   // Success green
  },
  conv: {
    title: 'Lead-to-Close Conversion Rate',
    labels: ['Q1 Pre', 'Q2 Pre', 'Q1 P1', 'Q2 P1', 'Q3 P1', 'Q4 P1'],
    before: [5, 6, 5, 6, 7, 6],
    after: [null, null, 10, 18, 26, 34],
    yLabel: 'Rate (%)',
    beforeColor: '#4e5a6a',
    afterColor: '#ffd23f'   // Neo yellow
  }
};

let currentActiveTab = 'revenue';

function initMetricsChart() {
  const canvas = document.getElementById('metricsChart');
  const tabs = document.querySelectorAll('#chart-tab-selectors button');
  const chartTitleEl = document.getElementById('active-chart-title');

  if (!canvas) return;

  // Render first chart
  drawNeoChart('revenue');

  // Wire up tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const chartKey = e.target.getAttribute('data-tab');
      currentActiveTab = chartKey;
      
      // Update chart header text
      if (chartTitleEl && chartData[chartKey]) {
        chartTitleEl.textContent = chartData[chartKey].title;
      }
      
      drawNeoChart(chartKey);
    });
  });

  // Re-draw chart on window resize for perfect responsiveness
  window.addEventListener('resize', () => {
    drawNeoChart(currentActiveTab);
  });
}

function drawNeoChart(key) {
  const data = chartData[key];
  if (!data) return;

  const canvas = document.getElementById('metricsChart');
  const ctx = canvas.getContext('2d');
  
  // Set dimensions based on parent container sizes
  const width = canvas.parentElement.clientWidth;
  const height = 300;

  // Retina scaling
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);

  // Layout parameters
  const padding = { top: 30, right: 30, bottom: 40, left: 60 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Data ranges
  const allValues = [...data.before, ...data.after].filter(v => v !== null);
  const minVal = Math.min(...allValues) * 0.8;
  const maxVal = Math.max(...allValues) * 1.1;
  const dataCount = data.labels.length;

  const getX = (index) => padding.left + (index / (dataCount - 1)) * graphWidth;
  const getY = (value) => padding.top + graphHeight - ((value - minVal) / (maxVal - minVal)) * graphHeight;

  // Render background grid lines (Neo-Brutalist clean horizontal lines)
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.5;
  const gridLines = 4;
  for (let i = 0; i <= gridLines; i++) {
    const yVal = minVal + (i / gridLines) * (maxVal - minVal);
    const y = getY(yVal);
    
    // Draw horizontal dashed grid lines
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    // Draw Y axis labels
    ctx.setLineDash([]);
    ctx.fillStyle = '#4e5a6a';
    ctx.font = 'bold 11px Poppins';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(yVal), padding.left - 12, y + 4);
  }

  // Draw X axis labels (Months / Quarters)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#121212';
  ctx.font = 'bold 12px Montserrat';
  data.labels.forEach((label, i) => {
    ctx.fillText(label, getX(i), height - padding.bottom + 24);
  });

  // Render Coordinate Axis Lines (Thick black borders)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  // Bottom horizontal axis line
  ctx.moveTo(padding.left, height - padding.bottom);
  ctx.lineTo(width - padding.right, height - padding.bottom);
  // Left vertical axis line
  ctx.moveTo(padding.left, padding.top - 10);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.stroke();

  // Helper function to draw chart lines
  const drawLinePath = (dataset, strokeColor) => {
    const points = [];
    dataset.forEach((val, i) => {
      if (val !== null) {
        points.push({ x: getX(i), y: getY(val) });
      }
    });

    if (points.length === 0) return;

    // Draw the main line
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    points.forEach((p, idx) => {
      if (idx === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.stroke();

    // Draw solid node data markers (circles with solid borders)
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = strokeColor;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  // Draw lines
  drawLinePath(data.before, data.beforeColor);
  drawLinePath(data.after, data.afterColor);
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function handleFormSubmission(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submit-lead-btn');
  const form = document.getElementById('lead-generation-form');
  
  if (submitBtn && form) {
    submitBtn.textContent = '✓ Call Booked! We\'ll touch base within 24h.';
    submitBtn.style.backgroundColor = '#0ca678';
    submitBtn.style.color = '#ffffff';
    submitBtn.disabled = true;
    
    submitBtn.style.transform = 'translate(2px, 2px)';
    submitBtn.style.boxShadow = '2px 2px 0px 0px #000000';
    
    const formData = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      email: document.getElementById('work-email').value,
      company: document.getElementById('company-name').value,
      budget: document.getElementById('marketing-budget').value,
      challenge: document.getElementById('challenge-desc').value
    };
    
    console.log('Paradox Lead Form Submitted Successfully:', formData);
    
    setTimeout(() => {
      form.reset();
    }, 2000);
  }
}

/* ==========================================================================
   TYPEWRITER EFFECT — HERO TITLE (ONE-SHOT)
   ========================================================================== */
function initTypewriter() {
  const line1El = document.getElementById('tw-line-1');
  const line2El = document.getElementById('tw-line-2');

  if (!line1El || !line2El) return;

  const line1Text = 'STRATEGY THAT WORKS.';
  const line2Text = 'RESULTS THAT SHOW.';
  const CHAR_SPEED = 65; // ms per character
  const LINE_PAUSE = 350; // pause between line 1 and line 2

  function typeLine(el, text, onDone) {
    let i = 0;
    function next() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(next, CHAR_SPEED);
      } else if (onDone) {
        onDone();
      }
    }
    next();
  }

  // Start after brief settle delay
  setTimeout(() => {
    typeLine(line1El, line1Text, () => {
      setTimeout(() => {
        typeLine(line2El, line2Text, null); // null = stop after done, cursor keeps blinking
      }, LINE_PAUSE);
    });
  }, 600);
}
