'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
});
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded','false'); mobileNav.hidden = true;
}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.focus();}});
window.addEventListener('scroll',()=>document.querySelector('#header').classList.toggle('scrolled',window.scrollY>40),{passive:true});

const homeView = document.querySelector('#home-view');
const offerView = document.querySelector('#offer-view');
const legalView = document.querySelector('#legal-view');
const form = document.querySelector('#offer-form');
const config = window.THIEL_CONFIG || {};
const sendingEnabled = Boolean(config.formEndpoint && config.legalReady);
const year = new Date().getFullYear();
document.querySelector('#year').max = String(year);
document.querySelector('#copyright-year').textContent = String(year);

const legalContent = {
  impressum: `<span class="eyebrow">RECHTLICHE INFORMATIONEN</span><h1>IMPRESSUM</h1><p class="legal-note"><strong>Platzhalter – Unternehmensangaben fehlen.</strong><br>Dieser Bereich muss vor einer öffentlichen Nutzung mit den tatsächlichen Angaben von Thiel Classics vervollständigt werden.</p><dl><dt>Vollständiger Unternehmensname / Rechtsform</dt><dd>[Bitte ergänzen]</dd><dt>Verantwortliche Person / Vertretung</dt><dd>[Bitte ergänzen]</dd><dt>Ladungsfähige Anschrift</dt><dd>[Straße, Hausnummer, Postleitzahl, Ort ergänzen]</dd><dt>Kontakt</dt><dd>[E-Mail-Adresse und Telefonnummer ergänzen]</dd><dt>Register- und Steuerangaben, soweit zutreffend</dt><dd>[Bitte prüfen und ergänzen]</dd></dl>`,
  datenschutz: `<span class="eyebrow">RECHTLICHE INFORMATIONEN</span><h1>DATENSCHUTZ</h1><p class="legal-note"><strong>Platzhalter – die vollständige Datenschutzerklärung folgt.</strong><br>Die Angaben zur verantwortlichen Stelle, zum Hosting und zur späteren Angebotsverarbeitung müssen vor Freischaltung des Versands ergänzt werden.</p><h2>Zum Formular in dieser Vorschau</h2><p>Eingaben und ausgewählte Bilder bleiben bis zum Schließen oder Neuladen der Seite im Arbeitsspeicher Ihres Browsers. Der Formularversand ist in dieser Vorschau deaktiviert. Das Formular legt keine Daten im lokalen Browserspeicher ab.</p><h2>Noch zu ergänzen</h2><dl><dt>Verantwortliche Stelle und Kontakt</dt><dd>[Echte Unternehmensdaten ergänzen]</dd><dt>Hosting und technische Verarbeitung</dt><dd>[Anbieter, Zugriffsdaten und tatsächliche Verarbeitung ergänzen]</dd><dt>Fahrzeugangebote und Bilder</dt><dd>[Empfänger, Zweck, Rechtsgrundlage und Speicherdauer ergänzen]</dd><dt>Datenschutzrechte und Ansprechstelle</dt><dd>[Vollständige, geprüfte Angaben ergänzen]</dd></dl>`
};
function route() {
  const hash = location.hash.slice(1) || 'start';
  const offer = hash === 'fahrzeug-anbieten';
  const legal = Object.hasOwn(legalContent, hash);
  const wasHome = !homeView.hidden;
  homeView.hidden = offer || legal;
  offerView.hidden = !offer;
  legalView.hidden = !legal;
  document.title = `${offer ? 'Fahrzeug anbieten' : legal ? (hash === 'impressum' ? 'Impressum' : 'Datenschutz') : 'Klassiker mit Geschichte'} | Thiel Classics`;
  if (legal) {
    legalView.innerHTML = `<a class="back-link" href="#fahrzeug-anbieten">← Zum Fahrzeugangebot</a>${legalContent[hash]}`;
  }
  document.querySelectorAll('.desktop-nav a').forEach(link => {
    const active = link.hash === '#' + hash;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
  });
  if (offer || legal) {
    window.scrollTo({top:0,behavior:'instant'});
    const heading = (offer ? offerView : legalView).querySelector('h1');
    heading.setAttribute('tabindex','-1');
    heading.focus({preventScroll:true});
  } else {
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({behavior:wasHome?'smooth':'instant',block:'start'}));
  }
  menuButton.setAttribute('aria-expanded','false'); mobileNav.hidden = true;
}
window.addEventListener('hashchange',route);
route();
document.querySelectorAll('[data-vehicle-type]').forEach(link=>link.addEventListener('click',()=>{
  const input=form.querySelector(`input[name="vehicleType"][value="${link.dataset.vehicleType}"]`);
  if(input) input.checked=true;
}));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
  }),{threshold:.06});
  document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
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

const galleries = {
  porsche: {title:'Porsche-Klassiker',images:[['porsche-duo','Silberner und grüner Porsche unter Bäumen'],['porsche-trio','Drei klassische Porsche vor einer Scheune'],['porsche-detail','Heckdetail eines silbernen Porsche Carrera']]},
  details: {title:'Ein Blick fürs Detail',images:[['porsche-front','Scheinwerfer und Front eines weißen Porsche'],['porsche-detail','Carrera Schriftzug und Rückleuchten']]},
  puch: {title:'Puch X30 Turbo',images:[['puch','Blaues Puch X30 Turbo auf einer Herbstallee'],['puch-tank','Puch X30 Turbo Tank im Detail'],['puch-tacho','Tachometer des Puch-Mopeds']]},
  moments: {title:'Bleibende Eindrücke',images:[['porsche-trio','Drei klassische Porsche vor einer Scheune'],['porsche-detail','Heck eines silbernen Porsche Carrera'],['porsche-duo','Zwei Porsche-Klassiker unter alten Bäumen']]}
};
const galleryDialog=document.querySelector('#gallery-dialog');
let galleryKey='porsche',galleryIndex=0;
function renderGallery(){
  const gallery=galleries[galleryKey];
  const [file,alt]=gallery.images[galleryIndex];
  document.querySelector('.gallery-content').innerHTML=`<img class="gallery-image" src="./assets/${file}-1440.webp" alt="${alt}"><div class="gallery-info"><div><h2 id="gallery-title">${gallery.title}</h2><p>Bildbeispiel · Fahrzeugdaten und Status werden ergänzt.</p></div><div class="gallery-controls"><button type="button" data-direction="-1" aria-label="Vorheriges Bild">←</button><span class="gallery-count" aria-live="polite">${galleryIndex+1} / ${gallery.images.length}</span><button type="button" data-direction="1" aria-label="Nächstes Bild">→</button></div></div>`;
  galleryDialog.setAttribute('aria-labelledby','gallery-title');
}
function changeImage(direction){
  galleryIndex=(galleryIndex+direction+galleries[galleryKey].images.length)%galleries[galleryKey].images.length;
  renderGallery();
  galleryDialog.querySelector(`[data-direction="${direction}"]`)?.focus();
}
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{
  galleryKey=button.dataset.gallery;galleryIndex=Number(button.dataset.image||0);renderGallery();
  galleryDialog.showModal();document.body.classList.add('modal-open');
  galleryDialog.querySelector('.dialog-close').focus();
}));
galleryDialog.addEventListener('click',event=>{
  if(event.target===galleryDialog||event.target.closest('.dialog-close')) galleryDialog.close();
  const control=event.target.closest('[data-direction]');
  if(control)changeImage(Number(control.dataset.direction));
});
galleryDialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'){event.preventDefault();changeImage(1);}
  if(event.key==='ArrowLeft'){event.preventDefault();changeImage(-1);}
});
galleryDialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));

// Files remain in browser memory until an explicitly configured endpoint accepts them.
let photos=[];
let pendingImageReads=0;
let submitting=false;
const photoInput=document.querySelector('#photos');
const photoErrors=document.querySelector('#photo-errors');
const previewContainer=document.querySelector('#photo-previews');
const allowedTypes=new Set(['image/jpeg','image/png','image/webp']);
function renderPhotos(){
  previewContainer.replaceChildren();
  photos.forEach(photo=>{
    const figure=document.createElement('figure');figure.className='photo-preview';
    const img=document.createElement('img');img.src=photo.url;img.alt=`Ausgewähltes Fahrzeugbild: ${photo.file.name}`;
    const caption=document.createElement('figcaption');caption.textContent=photo.file.name;
    const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`${photo.file.name} entfernen`);
    remove.addEventListener('click',()=>{
      if(submitting)return;
      URL.revokeObjectURL(photo.url);photos=photos.filter(item=>item!==photo);renderPhotos();photoInput.focus();
    });
    figure.append(img,caption,remove);previewContainer.append(figure);
  });
}
async function addPhotos(files){
  if(submitting)return;
  const errors=[];
  pendingImageReads++;
  try{
    for(const file of files){
      if(photos.some(p=>p.file.name===file.name&&p.file.size===file.size&&p.file.lastModified===file.lastModified))continue;
      if(photos.length>=10){errors.push('Sie können höchstens 10 Bilder auswählen.');break;}
      if(!allowedTypes.has(file.type)){errors.push(`${file.name}: Bitte JPG, PNG oder WebP verwenden.`);continue;}
      if(file.size>10*1024*1024){errors.push(`${file.name}: Das Bild ist größer als 10 MB.`);continue;}
      const url=URL.createObjectURL(file);
      try{
        await new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=url;});
        if(photos.length>=10){URL.revokeObjectURL(url);errors.push('Sie können höchstens 10 Bilder auswählen.');break;}
        photos.push({file,url});
      }catch{URL.revokeObjectURL(url);errors.push(`${file.name}: Das Bild konnte nicht gelesen werden.`);}
    }
  }finally{pendingImageReads--;}
  photoErrors.textContent=[...new Set(errors)].join(' ');renderPhotos();photoInput.value='';
}
photoInput.addEventListener('change',()=>addPhotos(Array.from(photoInput.files)));
const dropZone=document.querySelector('#upload-zone');
['dragenter','dragover'].forEach(type=>dropZone.addEventListener(type,event=>{event.preventDefault();dropZone.classList.add('dragover');}));
['dragleave','drop'].forEach(type=>dropZone.addEventListener(type,event=>{event.preventDefault();dropZone.classList.remove('dragover');}));
dropZone.addEventListener('drop',event=>addPhotos(Array.from(event.dataTransfer.files)));

const fields=Array.from(form.querySelectorAll('input:not([type="radio"]):not([type="file"]),select,textarea'));
fields.forEach(field=>{
  field.setAttribute('aria-describedby',field.id+'-error');
  field.addEventListener('blur',()=>{if(field.value||field.getAttribute('aria-invalid')==='true')validateField(field);});
  field.addEventListener('input',()=>{if(field.getAttribute('aria-invalid')==='true')validateField(field);});
});
function validateField(field){
  let message='';
  if(field.required && (field.type==='checkbox'?!field.checked:!field.value.trim()))message=field.type==='checkbox'?'Bitte bestätigen Sie die Einwilligung.':'Bitte füllen Sie dieses Feld aus.';
  else if(field.validity.typeMismatch)message='Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  else if(field.validity.badInput||field.validity.stepMismatch)message='Bitte geben Sie eine ganze Zahl ein.';
  else if(field.validity.rangeUnderflow||field.validity.rangeOverflow)message=field.id==='year'?`Bitte geben Sie ein Baujahr zwischen 1885 und ${year} ein.`:'Bitte prüfen Sie diesen Wert. Negative oder zu große Werte sind nicht möglich.';
  else if(field.validity.tooLong)message='Diese Angabe ist zu lang.';
  const error=document.getElementById(field.id+'-error');
  if(error)error.textContent=message;
  field.setAttribute('aria-invalid',String(Boolean(message)));
  return !message;
}
const statusBox=document.querySelector('#form-status');
function status(message,good=false){statusBox.hidden=false;statusBox.textContent=message;statusBox.classList.toggle('success',good);statusBox.focus();}
if(sendingEnabled){
  document.querySelector('#preview-notice').hidden=true;
  document.querySelector('.submit-label').textContent='Fahrzeug anbieten';
  document.querySelector('#submit-hint').textContent='Nach Prüfung Ihres Angebots melden wir uns persönlich.';
}
form.addEventListener('submit',async event=>{
  event.preventDefault();if(submitting)return;
  statusBox.hidden=true;
  const invalid=fields.filter(field=>!validateField(field));
  if(invalid.length){statusBox.textContent=`Bitte prüfen Sie ${invalid.length===1?'das markierte Feld':`die ${invalid.length} markierten Felder`}.`;statusBox.hidden=false;statusBox.classList.remove('success');invalid[0].focus();return;}
  if(pendingImageReads){status('Die Bilder werden noch geprüft. Bitte versuchen Sie es gleich erneut.');return;}
  if(!sendingEnabled){status('Ihre Angaben sind vollständig. Dies ist eine Vorschau: Es wurde nichts gesendet. Der Versand wird freigeschaltet, sobald der Empfang und die Datenschutzhinweise eingerichtet sind.',true);return;}
  submitting=true;
  const submit=form.querySelector('[type="submit"]');submit.disabled=true;submit.querySelector('.submit-label').textContent='Wird übermittelt …';
  form.setAttribute('aria-busy','true');
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
  const data=new FormData(form);photos.forEach(photo=>data.append('photos',photo.file));
  try{
    const response=await fetch(config.formEndpoint,{method:'POST',body:data,signal:controller.signal,headers:{'Accept':'application/json'}});
    const result=await response.json();
    if(!response.ok||result.ok!==true)throw new Error('not-accepted');
    form.hidden=true;document.querySelector('#offer-success').hidden=false;document.querySelector('#offer-success').focus();
    photos.forEach(photo=>URL.revokeObjectURL(photo.url));photos=[];renderPhotos();form.reset();
  }catch(error){status(error.name==='AbortError'?'Die Übermittlung konnte nicht bestätigt werden. Ihre Angaben bleiben erhalten. Bitte versuchen Sie es später erneut.':'Ihr Angebot konnte nicht übermittelt werden. Ihre Angaben bleiben erhalten. Bitte versuchen Sie es erneut.');}
  finally{clearTimeout(timeout);submitting=false;submit.disabled=false;submit.querySelector('.submit-label').textContent='Fahrzeug anbieten';form.removeAttribute('aria-busy');}
});

// Progressive enhancement for compatible agent-assisted browsers.
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  try{
    Promise.resolve(document.modelContext.registerTool({
      name:'start_vehicle_offer',title:'Fahrzeugangebot vorbereiten',
      description:'Öffnet das Ankaufformular von Thiel Classics und wählt optional die Fahrzeugart. Übermittelt keine Daten.',
      inputSchema:{type:'object',properties:{vehicleType:{type:'string',enum:['Automobil','Zweirad']}},additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      execute(input){
        if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(key=>key!=='vehicleType')||(input.vehicleType&&!['Automobil','Zweirad'].includes(input.vehicleType)))throw new Error('Ungültige Fahrzeugart. Erlaubt sind Automobil und Zweirad.');
        if(input.vehicleType)form.querySelector(`input[name="vehicleType"][value="${input.vehicleType}"]`).checked=true;
        location.hash='fahrzeug-anbieten';route();
        return {opened:true,vehicleType:form.querySelector('[name="vehicleType"]:checked').value,submissionAvailable:sendingEnabled};
      }
    },{signal:lifecycle.signal})).catch(()=>{});
  }catch{}
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
