'use strict';

(() => {
  const inventory = window.THIEL_INVENTORY;
  const list = document.querySelector('#stock-list');
  if (!list || !inventory) return;
  const { vehicles, contact } = inventory;
  const categoryNames = { automobile: 'Automobil', zweiraeder: 'Zweirad' };
  const dialog = document.querySelector('#stock-dialog');
  const surface = dialog.querySelector('.stock-dialog-surface');
  const scroller = dialog.querySelector('.stock-dialog-scroll');
  const closeButton = dialog.querySelector('.stock-close');
  const largeImage = dialog.querySelector('#stock-large-image');
  const thumbnails = dialog.querySelector('.stock-thumbnails');
  const imageCount = dialog.querySelector('.stock-image-count');
  const filters = [...document.querySelectorAll('[data-stock-filter]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let currentVehicle = null;
  let currentImage = 0;
  let trigger = null;
  let scrollPosition = 0;
  let closeTimer = 0;
  let backdropPress = false;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function arrow() { const node = element('span', '', '↗'); node.setAttribute('aria-hidden', 'true'); return node; }
  function mailLink(vehicle) { return `mailto:${contact.email}?subject=${encodeURIComponent(`Anfrage: ${vehicle.name}`)}`; }
  function imageElement(image, thumbnail = false) {
    const img = element('img');
    img.src = thumbnail ? image.thumb : image.src;
    img.alt = image.alt;
    img.width = image.width;
    img.height = image.height;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.objectPosition = image.position || 'center';
    return img;
  }
  function factsList(facts, className) {
    const dl = element('dl', className);
    facts.forEach(fact => { const row = element('div'); row.append(element('dt', '', fact.label), element('dd', '', fact.value)); dl.append(row); });
    return dl;
  }

  const cards = vehicles.map(vehicle => {
    const li = element('li');
    li.dataset.category = vehicle.category;
    const card = element('article', 'stock-card');
    card.setAttribute('aria-labelledby', `vehicle-${vehicle.id}`);
    const photo = element('button', 'stock-visual');
    photo.type = 'button';
    photo.setAttribute('aria-label', `${vehicle.name} – Fahrzeugdetails öffnen`);
    photo.setAttribute('aria-haspopup', 'dialog');
    photo.setAttribute('aria-controls', 'stock-dialog');
    const img = imageElement(vehicle.images[0]);
    img.srcset = `${vehicle.images[0].thumb} 640w, ${vehicle.images[0].src} ${vehicle.images[0].width}w`;
    img.sizes = '(max-width:600px) calc(100vw - 40px), (max-width:1100px) 46vw, 31vw';
    photo.append(img);
    if (vehicle.example) photo.append(element('span', 'stock-example-badge', 'Beispielfahrzeug'));
    const icon = arrow(); icon.className = 'stock-visual-arrow'; photo.append(icon);
    photo.addEventListener('click', () => openVehicle(vehicle, photo));
    const body = element('div', 'stock-card-body');
    const heading = element('h2', '', vehicle.name); heading.id = `vehicle-${vehicle.id}`;
    body.append(element('span', 'eyebrow', categoryNames[vehicle.category].toUpperCase()), heading, factsList(vehicle.facts, 'stock-card-facts'), element('p', 'stock-card-teaser', vehicle.teaser));
    const details = element('button', 'stock-details-button', 'Fahrzeug entdecken');
    details.type = 'button'; details.append(arrow());
    details.setAttribute('aria-label', `${vehicle.name} – Details ansehen`);
    details.setAttribute('aria-haspopup', 'dialog'); details.setAttribute('aria-controls', 'stock-dialog');
    details.addEventListener('click', () => openVehicle(vehicle, details));
    const contactSlot = element('div', 'stock-card-contact');
    const contactButton = element('button', 'stock-contact-toggle', 'Jetzt kontaktieren');
    contactButton.type = 'button'; contactButton.append(arrow());
    contactButton.setAttribute('aria-expanded', 'false');
    contactButton.setAttribute('aria-controls', `contact-${vehicle.id}`);
    contactButton.setAttribute('aria-label', `${vehicle.name} – Jetzt kontaktieren`);
    const links = element('div', 'stock-card-contacts');
    links.id = `contact-${vehicle.id}`; links.hidden = true;
    links.setAttribute('role', 'group'); links.setAttribute('aria-label', `Kontakt zu ${vehicle.name}`);
    const email = element('a', '', contact.email); email.href = mailLink(vehicle); email.append(arrow());
    const phone = element('a', '', contact.phone); phone.href = `tel:${contact.tel}`; phone.append(arrow());
    links.append(email, phone);
    contactButton.addEventListener('click', () => {
      contactButton.setAttribute('aria-expanded', 'true'); contactButton.hidden = true;
      links.hidden = false; email.focus({ preventScroll: true });
    });
    contactSlot.append(contactButton, links); body.append(details, contactSlot); card.append(photo, body); li.append(card); list.append(li);
    return li;
  });

  function filterVehicles(category) {
    let count = 0;
    cards.forEach(card => { card.hidden = category !== 'alle' && card.dataset.category !== category; if (!card.hidden) count++; });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.stockFilter === category)));
    document.querySelector('#stock-count').textContent = `${count} ${count === 1 ? 'Fahrzeug' : 'Fahrzeuge'}`;
    document.querySelector('#stock-empty').hidden = count > 0;
  }
  filters.forEach(button => button.addEventListener('click', () => filterVehicles(button.dataset.stockFilter)));
  document.querySelector('.stock-filters').hidden = false;
  document.querySelector('#stock-example-note').hidden = !vehicles.some(vehicle => vehicle.example);
  filterVehicles('alle');

  function renderImage() {
    const image = currentVehicle.images[currentImage];
    largeImage.src = image.src; largeImage.alt = image.alt;
    largeImage.width = image.width; largeImage.height = image.height;
    imageCount.textContent = `${currentImage + 1} / ${currentVehicle.images.length}`;
    [...thumbnails.children].forEach((button, index) => button.setAttribute('aria-current', String(index === currentImage)));
  }
  function stepImage(direction) {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    currentImage = (currentImage + direction + currentVehicle.images.length) % currentVehicle.images.length;
    renderImage();
  }
  function openVehicle(vehicle, opener) {
    currentVehicle = vehicle; currentImage = 0; trigger = opener; scrollPosition = window.scrollY;
    dialog.querySelector('#stock-dialog-title').textContent = vehicle.name;
    dialog.querySelector('#stock-dialog-category').textContent = categoryNames[vehicle.category].toUpperCase();
    dialog.querySelector('#stock-dialog-status').textContent = vehicle.example ? 'Beispielfahrzeug · Daten und Verfügbarkeit noch nicht bestätigt.' : vehicle.availability;
    dialog.querySelector('.stock-detail-facts').replaceWith(factsList(vehicle.facts, 'stock-detail-facts'));
    dialog.querySelector('.stock-description').replaceChildren(...vehicle.description.map(text => element('p', '', text)));
    thumbnails.replaceChildren(...vehicle.images.map((image, index) => {
      const button = element('button'); button.type = 'button'; button.setAttribute('aria-label', `Bild ${index + 1}: ${image.alt}`);
      const img = imageElement(image, true); img.alt = ''; button.append(img);
      button.addEventListener('click', () => { currentImage = index; renderImage(); }); return button;
    }));
    dialog.querySelectorAll('[data-stock-step]').forEach(button => { button.hidden = vehicle.images.length < 2; });
    thumbnails.hidden = vehicle.images.length < 2;
    dialog.querySelector('.stock-contact-email').textContent = contact.email;
    dialog.querySelector('.stock-contact-phone').textContent = contact.phone;
    dialog.querySelectorAll('.stock-contact-email,.stock-email-action').forEach(link => { link.href = mailLink(vehicle); });
    dialog.querySelectorAll('.stock-contact-phone,.stock-phone-action').forEach(link => { link.href = `tel:${contact.tel}`; });
    renderImage();
    document.documentElement.classList.add('stock-modal-open');
    dialog.showModal(); scroller.scrollTop = 0; thumbnails.scrollLeft = 0;
    closeButton.focus({ preventScroll: true });
  }
  function finishClose() {
    clearTimeout(closeTimer); closeTimer = 0;
    if (dialog.open) dialog.close();
  }
  function requestClose() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (reducedMotion.matches) { finishClose(); return; }
    dialog.classList.add('is-closing');
    // Fallback also covers disabled CSS animations and backgrounded tabs.
    closeTimer = window.setTimeout(finishClose, 220);
  }
  surface.addEventListener('animationend', event => { if (event.target === surface && event.animationName === 'stock-dialog-leave') finishClose(); });
  dialog.addEventListener('close', () => {
    clearTimeout(closeTimer); dialog.classList.remove('is-closing');
    document.documentElement.classList.remove('stock-modal-open');
    window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    trigger?.focus({ preventScroll: true });
  });
  closeButton.addEventListener('click', requestClose);
  dialog.addEventListener('cancel', event => { event.preventDefault(); requestClose(); });
  dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog; });
  dialog.addEventListener('click', event => { if (backdropPress && event.target === dialog) requestClose(); backdropPress = false; });
  dialog.querySelectorAll('[data-stock-step]').forEach(button => button.addEventListener('click', () => stepImage(Number(button.dataset.stockStep))));
  dialog.addEventListener('keydown', event => {
    // Keep Tab cycling within the dialog even in browsers that otherwise move
    // from the first/last control to their address bar.
    if (event.key === 'Tab') {
      const controls = [...dialog.querySelectorAll('button:not([disabled]),a[href]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); stepImage(event.key === 'ArrowRight' ? 1 : -1); }
  });
})();
