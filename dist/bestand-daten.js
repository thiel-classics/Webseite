'use strict';

// BEISPIELDATEN: Keine der folgenden Angaben bestätigt einen Verkaufsbestand.
// Für echte Angebote Beispielbilder und alle Fahrzeugangaben prüfen/ersetzen,
// example auf false setzen und availability passend eintragen.
// Redaktionelle Pflege: siehe BESTAND-PFLEGEN.md. Kein Build erforderlich.
window.THIEL_INVENTORY = {
  contact: { email: 'thieltrading@web.de', phone: '+49 173 4209980', tel: '+491734209980' },
  vehicles: [
    {
      id: 'porsche-klassiker-weiss',
      category: 'automobile',
      name: 'Porsche Klassiker',
      example: true,
      availability: 'Zum Verkauf',
      facts: [
        { label: 'Baujahr', value: 'Noch zu ergänzen' },
        { label: 'Zustand', value: 'Noch zu bestätigen' },
        { label: 'Charakter', value: 'Weiß & Chrom' }
      ],
      teaser: 'Klare Linien. Feine Chromdetails. Ein Klassiker mit unverwechselbarer Silhouette.',
      description: [
        'Die helle Lackierung, die runden Scheinwerfer und die feinen Chromdetails prägen diesen klassischen Porsche. Ein erster Eindruck von der Art Fahrzeuge, die uns begeistert.',
        'Dieses Fahrzeug dient als Gestaltungsbeispiel. Die Fotos illustrieren die Fahrzeugwelt; die Zuordnung aller Detailaufnahmen zum konkreten Angebot ist noch zu prüfen. Modellvariante, Baujahr, Laufleistung, Zustand, Preis und Verfügbarkeit sind noch nicht bestätigt.'
      ],
      images: [
        { src: './assets/porsche-weiss-1440.webp', thumb: './assets/porsche-weiss-640.webp', alt: 'Weißer Porsche-Klassiker vor einem historischen Gebäude', width: 1170, height: 1560, position: '50% 58%' },
        { src: './assets/porsche-front-1440.webp', thumb: './assets/porsche-front-640.webp', alt: 'Beispielaufnahme: Scheinwerfer und Chromdetails eines weißen Porsche', width: 1168, height: 772, position: '50% 50%' }
      ]
    },
    {
      id: 'puch-x30-turbo',
      category: 'zweiraeder',
      name: 'Puch X30 Turbo',
      example: true,
      availability: 'Zum Verkauf',
      facts: [
        { label: 'Baujahr', value: 'Noch zu ergänzen' },
        { label: 'Zustand', value: 'Noch zu bestätigen' },
        { label: 'Charakter', value: 'Blau & Chrom' }
      ],
      teaser: 'Kleine Maschine, große Begeisterung. Zweiradkultur mit eigenem Charakter.',
      description: [
        'Leuchtendes Blau, ein verchromter Tank und die typische schlanke Form: Das Puch X30 Turbo steht für die besondere Freude an klassischen Mopeds.',
        'Dieses Fahrzeug dient als Gestaltungsbeispiel. Baujahr, Laufleistung, technischer Zustand, durchgeführte Arbeiten, Preis und Verfügbarkeit werden vor einem echten Verkaufsangebot ergänzt.'
      ],
      images: [
        { src: './assets/puch-1440.webp', thumb: './assets/puch-640.webp', alt: 'Blaues Puch X30 Turbo auf einer herbstlichen Allee', width: 1440, height: 2160, position: '50% 60%' },
        { src: './assets/puch-tank-1440.webp', thumb: './assets/puch-tank-640.webp', alt: 'Chromtank des Puch X30 Turbo mit blauem Rahmen', width: 1440, height: 2160, position: '50% 50%' },
        { src: './assets/puch-tacho-1440.webp', thumb: './assets/puch-tacho-640.webp', alt: 'Tachometer und Lenker des Puch X30 Turbo', width: 1440, height: 2160, position: '50% 50%' }
      ]
    },
    {
      id: 'porsche-carrera-silber',
      category: 'automobile',
      name: 'Porsche 911 Carrera',
      example: true,
      availability: 'Zum Verkauf',
      facts: [
        { label: 'Baujahr', value: 'Noch zu ergänzen' },
        { label: 'Zustand', value: 'Noch zu bestätigen' },
        { label: 'Charakter', value: 'Silber & schwarze Felgen' }
      ],
      teaser: 'Die vertraute Form des Elfers. Eine Begegnung, die in Erinnerung bleibt.',
      description: [
        'Silberne Karosserie, schwarze Felgen und die markante Linienführung des 911: Dieser Carrera gibt einen Einblick in unsere Begeisterung für klassische Automobile.',
        'Dieses Fahrzeug dient als Gestaltungsbeispiel. Modellvariante, Baujahr, Laufleistung, Ausstattung, Zustand, Preis und Verfügbarkeit sind noch zu bestätigen. Die Bilder ersetzen keine Besichtigung oder Zustandsbeschreibung.'
      ],
      images: [
        { src: './assets/porsche-silber-1440.webp', thumb: './assets/porsche-silber-640.webp', alt: 'Silberner Porsche 911 Carrera vor einem historischen Hof', width: 1280, height: 1600, position: '50% 56%' },
        { src: './assets/porsche-detail-1440.webp', thumb: './assets/porsche-detail-640.webp', alt: 'Heckansicht mit Carrera-Schriftzug und rotem Leuchtenband', width: 1280, height: 1600, position: '50% 50%' }
      ]
    }
  ]
};
