'use strict';

// All pages are complete HTML documents; JavaScript only enhances their controls.
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!document.querySelector('#header').contains(event.target))closeMenu();});
document.querySelector('#header').addEventListener('focusout',event=>{if(event.relatedTarget&&!document.querySelector('#header').contains(event.relatedTarget))closeMenu();});
matchMedia('(min-width:851px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelector('#copyright-year').textContent=String(new Date().getFullYear());
const header=document.querySelector('#header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40),{passive:true});

// Keep old bookmarks usable after the move from the one-page website.
const legacyRoutes={automobile:'automobile.html',zweiraeder:'zweiraeder.html','ueber-uns':'ueber-uns.html',ankauf:'ankauf.html','fahrzeug-anbieten':'ankauf.html',referenzen:'automobile.html#einblicke','jeder-zustand':'zweiraeder.html#jeder-zustand',impressum:'impressum.html',datenschutz:'datenschutz.html'};
if(document.body.dataset.page==='index'&&legacyRoutes[location.hash.slice(1)]){
  const destination=new URL(legacyRoutes[location.hash.slice(1)],location.href);destination.search=location.search;location.replace(destination.href);
}

const galleries={
  porsche:{title:'Klassische Automobile',images:[['porsche-silber','Silberner Porsche vor einem historischen Hof'],['porsche-weiss','Weißer Porsche vor einem historischen Gebäude'],['porsche-duo','Silberner und grüner Porsche unter Bäumen']]},
  details:{title:'Ein Blick fürs Detail',images:[['porsche-front','Scheinwerfer und Front eines weißen Porsche'],['porsche-detail','Carrera Schriftzug und Rückleuchten']]},
  puch:{title:'Puch X30 Turbo',images:[['puch','Blaues Puch X30 Turbo auf einer Herbstallee'],['puch-tank','Puch X30 Turbo Tank im Detail'],['puch-tacho','Tachometer des Puch-Mopeds']]},
  moments:{title:'Bleibende Eindrücke',images:[['porsche-trio','Drei klassische Porsche vor einer Scheune'],['porsche-detail','Heck eines silbernen Porsche Carrera'],['porsche-duo','Zwei Porsche-Klassiker unter alten Bäumen']]},
  wheel:{title:'Unsere Welt der Klassiker',images:[['porsche-weiss','Weißer Porsche vor einem historischen Gebäude'],['puch','Blaues Puch X30 Turbo auf einer Herbstallee'],['porsche-detail','Silberner Porsche Carrera im Detail'],['porsche-silber','Silberner Porsche vor einem historischen Hof'],['puch-tank','Chromtank des Puch X30 Turbo'],['porsche-trio','Drei Generationen klassischer Porsche'],['lifestyle','Ein Abend mit einem roten Klassiker'],['porsche-front','Die zeitlose Front eines weißen Porsche']]}
};
const galleryDialog=document.querySelector('#gallery-dialog');
let galleryKey='porsche',galleryIndex=0,galleryTrigger=null;
function renderGallery(){const gallery=galleries[galleryKey];const[file,alt]=gallery.images[galleryIndex];const img=galleryDialog.querySelector('.gallery-image');img.src=`./assets/${file}-1440.webp`;img.alt=alt;galleryDialog.querySelector('#gallery-title').textContent=gallery.title;galleryDialog.querySelector('.gallery-count').textContent=`${galleryIndex+1} / ${gallery.images.length}`;}
function changeImage(direction){galleryIndex=(galleryIndex+direction+galleries[galleryKey].images.length)%galleries[galleryKey].images.length;renderGallery();}
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{galleryTrigger=button;galleryKey=button.dataset.gallery;galleryIndex=Number(button.dataset.image||0);renderGallery();galleryDialog.showModal();document.body.classList.add('modal-open');galleryDialog.querySelector('.dialog-close').focus();}));
galleryDialog.addEventListener('click',event=>{if(event.target===galleryDialog||event.target.closest('.dialog-close'))galleryDialog.close();const control=event.target.closest('[data-direction]');if(control)changeImage(Number(control.dataset.direction));});
galleryDialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();changeImage(1);}if(event.key==='ArrowLeft'){event.preventDefault();changeImage(-1);}});
galleryDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');galleryTrigger?.focus({preventScroll:true});});

// Project cards onto a shallow tilted ring. A frame is requested only after input.
const wheel=document.querySelector('[data-image-wheel]');
if(wheel){
  const cards=[...wheel.querySelectorAll('.wheel-card')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let width=wheel.clientWidth,cardWidth=0,angle=.12,frame=0,visible=false,lastY=window.scrollY;
  let drag=null,moved=false,suppressClick=false;
  const render=()=>{
    frame=0;
    // Reserve the rotated card bounds so every image stays inside the section.
    const radius=Math.max(0,Math.min(550,width*.35,width/2-cardWidth*.55-16));
    const rise=width<600?48:80;
    cards.forEach((card,index)=>{
      const theta=index/cards.length*Math.PI*2+angle;
      const depth=(Math.cos(theta)+1)/2;
      const x=Math.sin(theta)*radius;
      const y=Math.cos(theta)*rise+x*.065;
      const scale=.64+depth*.36;
      card.style.transform=`translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${(-9+Math.sin(theta)*5).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.zIndex=String(Math.round(depth*100));
    });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(render);};
  wheel.classList.add('wheel-ready');cardWidth=cards[0].offsetWidth;render();
  new ResizeObserver(entries=>{width=entries[0].contentRect.width;cardWidth=cards[0].offsetWidth;schedule();}).observe(wheel);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;lastY=window.scrollY;},{rootMargin:'60px'}).observe(wheel);
  window.addEventListener('scroll',()=>{const y=window.scrollY;const delta=y-lastY;lastY=y;if(visible&&!reduced.matches&&!drag&&!galleryDialog.open){angle+=delta*.0017;schedule();}},{passive:true});
  cards.forEach((card,index)=>card.addEventListener('focus',()=>{if(card.matches(':focus-visible')){angle=-index/cards.length*Math.PI*2;schedule();}}));
  wheel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();angle+=(event.key==='ArrowRight'?1:-1)*Math.PI*2/cards.length;schedule();}});
  wheel.addEventListener('pointerdown',event=>{if(event.button!==0||!event.isPrimary)return;suppressClick=false;moved=false;drag={id:event.pointerId,x:event.clientX,y:event.clientY,start:angle};});
  wheel.addEventListener('pointermove',event=>{if(!drag||event.pointerId!==drag.id)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(!moved&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag=null;return;}if(Math.abs(dx)>8){moved=true;suppressClick=true;wheel.classList.add('dragging');if(!wheel.hasPointerCapture(event.pointerId))wheel.setPointerCapture(event.pointerId);}if(moved){angle=drag.start+dx*.006;schedule();}});
  const release=event=>{if(!drag||event.pointerId!==drag.id)return;drag=null;wheel.classList.remove('dragging');if(wheel.hasPointerCapture(event.pointerId))wheel.releasePointerCapture(event.pointerId);};
  wheel.addEventListener('pointerup',release);wheel.addEventListener('pointercancel',release);wheel.addEventListener('lostpointercapture',()=>{drag=null;wheel.classList.remove('dragging');});
  wheel.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false;}},true);
}

const form=document.querySelector('#offer-form');
if(form){
  const config=window.THIEL_CONFIG||{};
  // Native multipart POST keeps attachments and the provider's spam check reliable.
  if(config.formEndpoint){const endpoint=new URL(config.formEndpoint);if(endpoint.protocol==='https:'&&endpoint.hostname==='formsubmit.co')form.action=endpoint.href;}
  form.noValidate=true;
  const vehicleType=new URLSearchParams(location.search).get('art');
  if(['Automobil','Zweirad'].includes(vehicleType))form.querySelector(`[name="Fahrzeugart"][value="${vehicleType}"]`).checked=true;
  const year=new Date().getFullYear();document.querySelector('#year').max=String(year);
  const photoInput=document.querySelector('#photos'),photoErrors=document.querySelector('#photo-errors'),preview=document.querySelector('#photo-previews'),statusBox=document.querySelector('#form-status');
  const fields=[...form.querySelectorAll('.field input:not([type="radio"]),.field select,.field textarea,#consent')];
  const submit=form.querySelector('[type="submit"]');
  const allowed=new Set(['image/jpeg','image/png','image/webp']);
  const MAX_BYTES=9_000_000,MAX_FILES=6;
  let photos=[],reading=false,submitting=false,dirty=false;
  const queue=[];
  function status(message){statusBox.textContent=message;statusBox.hidden=false;}
  function dirtyForm(){dirty=true;statusBox.hidden=true;}
  form.addEventListener('input',dirtyForm);
  window.addEventListener('beforeunload',event=>{if(dirty&&!submitting){event.preventDefault();event.returnValue='';}});
  const syncFiles=()=>{const transfer=new DataTransfer();photos.forEach(photo=>transfer.items.add(photo.file));photoInput.files=transfer.files;};
  function renderPhotos(){
    preview.replaceChildren();
    photos.forEach(photo=>{const figure=document.createElement('figure');figure.className='photo-preview';const img=document.createElement('img');img.src=photo.url;img.alt=`Ausgewähltes Fahrzeugbild: ${photo.file.name}`;img.width=160;img.height=110;const caption=document.createElement('figcaption');caption.textContent=photo.file.name;const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`${photo.file.name} entfernen`);remove.disabled=submitting;remove.addEventListener('click',()=>{URL.revokeObjectURL(photo.url);photos=photos.filter(item=>item!==photo);syncFiles();renderPhotos();dirtyForm();photoInput.focus();});figure.append(img,caption,remove);preview.append(figure);});
  }
  async function processPhotos(){
    if(reading)return;reading=true;
    const errors=[];photoErrors.textContent='Bilder werden geprüft …';
    while(queue.length){const file=queue.shift();
      if(photos.some(p=>p.file.name===file.name&&p.file.size===file.size&&p.file.lastModified===file.lastModified))continue;
      if(!allowed.has(file.type)){errors.push(`${file.name}: Bitte JPG, PNG oder WebP auswählen.`);continue;}
      if(photos.length>=MAX_FILES){errors.push('Bitte höchstens 6 Bilder auswählen.');continue;}
      if(photos.reduce((sum,p)=>sum+p.file.size,0)+file.size>MAX_BYTES){errors.push(`${file.name}: Die Bilder dürfen zusammen höchstens 9 MB groß sein. Bitte kleinere Bilder auswählen.`);continue;}
      const url=URL.createObjectURL(file);
      try{await new Promise((resolve,reject)=>{const img=new Image();const timer=setTimeout(()=>{img.src='';reject(new Error('timeout'));},12000);img.onload=()=>{clearTimeout(timer);resolve();};img.onerror=()=>{clearTimeout(timer);reject(new Error('image'));};img.src=url;});photos.push({file,url});}catch{URL.revokeObjectURL(url);errors.push(`${file.name}: Das Bild konnte nicht gelesen werden. Bitte eine andere Datei auswählen.`);}
    }
    reading=false;syncFiles();renderPhotos();photoErrors.textContent=[...new Set(errors)].join(' ');dirtyForm();
  }
  const addPhotos=files=>{if(submitting)return;queue.push(...files);void processPhotos();};
  photoInput.addEventListener('change',()=>addPhotos([...photoInput.files]));
  const zone=document.querySelector('#upload-zone');
  ['dragenter','dragover'].forEach(type=>zone.addEventListener(type,event=>{event.preventDefault();zone.classList.add('dragover');}));
  ['dragleave','drop'].forEach(type=>zone.addEventListener(type,event=>{event.preventDefault();zone.classList.remove('dragover');}));
  zone.addEventListener('drop',event=>addPhotos([...event.dataTransfer.files]));
  function validate(field){let message='';if(field.required&&(field.type==='checkbox'?!field.checked:!field.value.trim()))message=field.type==='checkbox'?'Bitte bestätigen Sie die Datenschutzhinweise.':'Bitte füllen Sie dieses Feld aus.';else if(field.validity.typeMismatch)message='Bitte geben Sie eine gültige E-Mail-Adresse ein.';else if(field.validity.badInput||field.validity.stepMismatch)message='Bitte geben Sie eine ganze Zahl ein.';else if(field.validity.rangeUnderflow||field.validity.rangeOverflow)message=field.id==='year'?`Bitte geben Sie ein Baujahr zwischen 1885 und ${year} ein.`:'Bitte geben Sie einen Wert innerhalb des zulässigen Bereichs ein.';else if(field.validity.tooLong)message='Bitte kürzen Sie diese Angabe.';document.getElementById(field.id+'-error').textContent=message;field.setAttribute('aria-invalid',String(Boolean(message)));return !message;}
  fields.forEach(field=>{field.setAttribute('aria-describedby',field.id+'-error');if(!field.autocomplete)field.autocomplete='off';field.addEventListener('blur',()=>{if(field.value||field.getAttribute('aria-invalid')==='true')validate(field);});field.addEventListener('input',()=>{if(field.getAttribute('aria-invalid')==='true')validate(field);});});
  // Separate, documented attachment fields instead of relying on duplicate field parsing.
  form.addEventListener('formdata',event=>{event.formData.delete('attachment');photos.forEach((photo,i)=>event.formData.append(i===0?'attachment':`attachment${i+1}`,photo.file,photo.file.name));});
  form.addEventListener('submit',event=>{
    if(submitting){event.preventDefault();return;}
    const invalid=fields.filter(field=>!validate(field));
    if(invalid.length){event.preventDefault();status('Bitte prüfen Sie die markierten Felder.');invalid[0].focus();return;}
    if(reading){event.preventDefault();status('Die Bilder werden noch geprüft. Bitte versuchen Sie es gleich erneut.');photoInput.focus();return;}
    if(!navigator.onLine){event.preventDefault();status('Keine Internetverbindung. Ihre Angaben bleiben hier erhalten. Bitte verbinden Sie sich und senden Sie erneut.');statusBox.focus();return;}
    submitting=true;submit.disabled=true;submit.setAttribute('aria-busy','true');submit.querySelector('.submit-label').textContent='Wird übermittelt …';
    // No fabricated success screen: FormSubmit confirms submission on its own response page.
  });
  window.addEventListener('pageshow',()=>{
    submitting=false;submit.disabled=false;submit.removeAttribute('aria-busy');submit.querySelector('.submit-label').textContent='Anfrage senden';
    dirty=fields.some(field=>field.type==='checkbox'?field.checked!==field.defaultChecked:field.value!==field.defaultValue&&Boolean(field.value));
    // Browsers may restore native fields without restoring this script's in-memory previews.
    if(!photos.length&&photoInput.files.length)addPhotos([...photoInput.files]);
    else if(!photos.length&&performance.getEntriesByType('navigation')[0]?.type==='back_forward')status('Zurück im Formular. Bitte prüfen Sie Ihre Angaben und wählen Sie Bilder bei Bedarf erneut aus.');
  });
}

// Two aligned images reveal the potential of a classic in any condition.
document.querySelectorAll('[data-condition-comparison]').forEach(stage=>{
  const range=stage.querySelector('.condition-range');
  const foundLabel=stage.querySelector('.condition-label-found');
  const restoredLabel=stage.querySelector('.condition-label-restored');
  let pointer=null;
  function update(value){
    const split=Math.min(100,Math.max(0,Number(value)));
    if(!Number.isFinite(split))return;
    range.value=String(split);
    stage.style.setProperty('--condition-split',split+'%');
    range.setAttribute('aria-valuetext',`${Math.round(split)} Prozent Scheunenfund, ${Math.round(100-split)} Prozent restauriert`);
    foundLabel.hidden=split<20;
    restoredLabel.hidden=split>80;
  }
  function move(event){
    const rect=stage.getBoundingClientRect();
    if(rect.width)update((event.clientX-rect.left)/rect.width*100);
  }
  range.addEventListener('pointerdown',event=>{
    if(event.button!==0||!event.isPrimary)return;
    event.preventDefault();
    pointer=event.pointerId;
    range.focus({preventScroll:true});
    range.setPointerCapture(pointer);
    move(event);
  });
  range.addEventListener('pointermove',event=>{if(event.pointerId===pointer)move(event);});
  function release(event){
    if(event.pointerId!==pointer)return;
    pointer=null;
    if(range.hasPointerCapture(event.pointerId))range.releasePointerCapture(event.pointerId);
  }
  range.addEventListener('pointerup',release);
  range.addEventListener('pointercancel',release);
  range.addEventListener('lostpointercapture',()=>{pointer=null;});
  range.addEventListener('input',()=>update(range.value));
  update(range.value);
});

// Floating hero: native scrolling, one scheduled frame per input, no autoplay.
(() => {
  const scene = document.querySelector('[data-hero-scene]');
  if (!scene) return;
  const stage = scene.querySelector('.hero-scene__stage');
  const art = scene.querySelector('.hero-scene__art');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const phone = matchMedia('(max-width:600px)');
  const desktop = matchMedia('(min-width:1001px)');
  const motion = {
    weiss:    {x:-50, y:-68, z:-230, turn:9, scale:.94, fade:.92, layer:6, order:-3, delay:0, mobile:-8},
    carrera:  {x:-44, y:115, z:225, turn:-14, scale:1.05, fade:1, layer:4, order:5, delay:.08, mobile:9},
    trio:     {x:-30, y:-35, z:100, turn:-8, scale:1.01, fade:1, layer:5, order:2, delay:.18, mobile:-5},
    puch:     {x:22, y:-27, z:-85, turn:5, scale:.98, fade:1, layer:8, order:-2, delay:.05, mobile:7},
    front:    {x:40, y:-68, z:80, turn:8, scale:1.04, fade:.8, layer:1, order:0, delay:0, mobile:0},
    tank:     {x:-50, y:-20, z:-90, turn:-9, scale:.92, fade:.75, layer:1, order:0, delay:0, mobile:0},
    lifestyle:{x:-15, y:65, z:75, turn:7, scale:1.02, fade:.9, layer:1, order:0, delay:.1, mobile:0}
  };
  const layers = [...scene.querySelectorAll('[data-hero-layer]')]
    .map(element => ({element, move:motion[element.dataset.heroLayer]}));
  const properties = ['--move-x','--move-y','--move-z','--turn','--scale','--fade','z-index'];
  let frame = 0, visible = true, start = 0, distance = 1, size = 1;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => value * value * (3 - 2 * value);
  const reset = () => layers.forEach(({element}) => properties.forEach(property => element.style.removeProperty(property)));

  function render() {
    frame = 0;
    if (reduced.matches || document.hidden) return;
    const progress = clamp((window.scrollY - start) / distance);
    for (const {element, move} of layers) {
      const phase = ease(clamp((progress - move.delay) / (1 - move.delay)));
      if (phone.matches) {
        // Mobile stays in a two-column grid; only a few pixels of vertical drift.
        element.style.setProperty('--move-y', `${(move.mobile * phase).toFixed(2)}px`);
        continue;
      }
      element.style.setProperty('--move-x', `${(move.x * phase * size).toFixed(2)}px`);
      element.style.setProperty('--move-y', `${(move.y * phase * size).toFixed(2)}px`);
      element.style.setProperty('--move-z', `${(move.z * phase * size).toFixed(2)}px`);
      element.style.setProperty('--turn', `${(move.turn * phase).toFixed(2)}deg`);
      element.style.setProperty('--scale', (1 + (move.scale - 1) * phase).toFixed(4));
      element.style.setProperty('--fade', (1 + (move.fade - 1) * phase).toFixed(4));
      element.style.zIndex = String(move.layer + Math.round(move.order * phase));
    }
  }
  function schedule() {
    if (!frame && visible && !reduced.matches && !document.hidden) frame = requestAnimationFrame(render);
  }
  function measure() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    reset();
    // A short sticky scene is used only when the entire stage fits the viewport.
    // Compact screens and reduced-motion users keep the ordinary document flow.
    const pin = desktop.matches && !reduced.matches && stage.offsetHeight <= window.innerHeight - 12;
    scene.classList.toggle('is-pinned', pin);
    scene.classList.toggle('is-inview', visible && !reduced.matches);
    start = scene.getBoundingClientRect().top + window.scrollY;
    distance = Math.max(1, pin ? scene.offsetHeight - stage.offsetHeight : stage.offsetHeight * .72);
    size = Math.min(1.3, art.clientWidth / 880);
    schedule();
  }
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', measure, {passive:true});
  window.addEventListener('pageshow', measure);
  reduced.addEventListener('change', measure);
  phone.addEventListener('change', measure);
  desktop.addEventListener('change', measure);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    } else measure();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      scene.classList.toggle('is-inview', visible && !reduced.matches);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
      if (visible) schedule();
    }, {rootMargin:'160px 0px'}).observe(scene);
  }
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(stage);
  document.fonts?.ready.then(measure);
  measure();
})();
