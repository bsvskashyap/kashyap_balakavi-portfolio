// Theme handling, mobile nav, modal helpers, and small UX enhancements
(function(){
  const root = document.documentElement;
  const body = document.body;

  // Force dark theme only (remove light theme option)
  function initTheme(){
    body.setAttribute('data-theme', 'dark');
  }

  // Setup nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  navToggle && navToggle.addEventListener('click', ()=>{
    const open = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // (Theme toggle removed — site uses dark theme only)

  // Smooth scrolling for in-page links
  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href && href.startsWith('#') && href.length>1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile nav
      if(window.innerWidth <= 880 && primaryNav.classList.contains('open')){
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    }
  });

  // Reveal observer
  const sections = document.querySelectorAll('.section');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
    }, {threshold:0.12});
    sections.forEach(s=>io.observe(s));
  } else { sections.forEach(s=>s.classList.add('visible')); }

  // Active nav link observer
  if('IntersectionObserver' in window){
    const sectionObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const id = entry.target.id;
        const link = document.querySelector('.navbar a[href="#'+id+'"]');
        if(link) link.classList.toggle('active', entry.isIntersecting);
      });
    }, {threshold:0.5});
    sections.forEach(s=>sectionObserver.observe(s));
  }

  // Back to top
  const backBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', ()=>{ backBtn && (backBtn.style.display = (window.scrollY>350? 'block':'none')); });
  backBtn && backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // Modal helpers
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = modal ? modal.querySelector('.close') : null;

  function openModal(title, html){
    if(!modal) return;
    modalTitle.textContent = title || 'Preview';
    modalBody.innerHTML = html || '';
    // Use CSS class to show modal so opacity and pointer-events follow CSS rules
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    modalClose && modalClose.focus();
    // trap focus inside modal
    trapFocus(modal);
  }
  function closeModal(){ if(!modal) return; modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-preview]');
    if(!btn) return;
    e.preventDefault();
    const title = btn.getAttribute('data-title') || 'Project Preview';
    const desc = btn.getAttribute('data-desc') || '';
    const thumb = btn.getAttribute('data-thumb') || '';
    const tags = btn.getAttribute('data-tags') || '';
    const href = btn.getAttribute('href') || '';

    // build modal HTML
    let html = '';
    if(thumb) html += '<div style="display:flex;gap:12px;align-items:flex-start"><div style="flex:0 0 120px;border-radius:10px;overflow:hidden">'+('<img src="'+thumb+'" style="width:100%;height:auto;display:block"/>')+'</div><div style="flex:1">';
  if(desc) html += '<p class="modal-desc">'+desc+'</p>';
  if(tags) html += '<div class="modal-tags">'+tags.split(',').map(t=>'<span class="tag">'+t.trim()+'</span>').join('')+'</div>';
  if(href) html += '<div class="modal-actions" style="margin-top:10px"><a class="modal-open-link" href="'+href+'" target="_blank">Open project</a></div>';
    if(thumb) html += '</div></div>';
    openModal(title, html);
  });
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  // Ensure closeModal removes the open class and hides via CSS
  function closeModal(){ if(!modal) return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal && modal.getAttribute('aria-hidden')==='false') closeModal(); });

  // NOTE: Do not auto-convert external links into modal previews.
  // Modal previews will only open for elements that explicitly include the `data-preview` attribute in the HTML.

  // Initialize theme at the end
  initTheme();
})();

/* Small focus trap helper (simple): keeps Tab cycling inside the modal */
function trapFocus(container){
  const focusable = container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
  if(!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length-1];
  function onKey(e){
    if(e.key !== 'Tab') return;
    if(e.shiftKey){ if(document.activeElement === first){ e.preventDefault(); last.focus(); } }
    else { if(document.activeElement === last){ e.preventDefault(); first.focus(); } }
  }
  container.addEventListener('keydown', onKey);
  // remove trap when modal closes
  const observer = new MutationObserver(()=>{ if(container.getAttribute('aria-hidden') === 'true'){ container.removeEventListener('keydown', onKey); observer.disconnect(); } });
  observer.observe(container, {attributes:true, attributeFilter:['aria-hidden']});
}
