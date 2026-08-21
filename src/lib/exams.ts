import type { Exam } from "./types";

/** Pre-configured exam photo/signature profiles (2026). Specs mirror common official notification ranges. */
export const EXAMS: Exam[] = [
  {
    "slug": "bihar-police-bpssc-si-daroga",
    "name": "Bihar Police BPSSC SI (Daroga)",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "iit-bhu-non-teaching",
    "name": "IIT BHU Non-Teaching",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rrb-section-controller",
    "name": "RRB Section Controller",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 40,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "itat",
    "name": "ITAT",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "railway-nfr-apprentice",
    "name": "Railway NFR Apprentice",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ibps-clerk",
    "name": "IBPS Clerk",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "patna-high-court-assistant",
    "name": "Patna High Court Assistant",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "cat",
    "name": "CAT",
    "formsOut": true,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 200,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 4,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mppsc-adpo",
    "name": "MPPSC ADPO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "up-cooperative-bank-upcisb",
    "name": "UP Cooperative Bank (UPCISB)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "up-lt-grade-assistant-teacher-mains",
    "name": "UP LT Grade Assistant Teacher Mains",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssb-head-constable-si-asi",
    "name": "SSB Head Constable / SI /ASI",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssb-head-constable-medical-cader",
    "name": "SSB Head Constable Medical Cader",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "pnb-lbo",
    "name": "PNB LBO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-navy-agniveer-mr-musician",
    "name": "Indian Navy Agniveer MR Musician",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc-civil-judge-bihar-judiciary-judge",
    "name": "BPSC Civil Judge (Bihar Judiciary Judge)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jeecup-up-polytechnic",
    "name": "JEECUP (UP Polytechnic)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "patna-high-court-technical-assistant",
    "name": "Patna High Court Technical Assistant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssc-phase-14",
    "name": "SSC Phase 14",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 6,
        "height": 2,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "btsc-laboratory-assistant",
    "name": "BTSC Laboratory Assistant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-vpo",
    "name": "UPSSSC VPO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ntpc-assistant-executive",
    "name": "NTPC Assistant Executive",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "cds",
    "name": "CDS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssc-stenographer-grade-c-and-d",
    "name": "SSC Stenographer Grade 'C' and 'D'",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 6,
        "height": 2,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "crpf-tradesman",
    "name": "CRPF Tradesman",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jtet",
    "name": "JTET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nda",
    "name": "NDA",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ctet",
    "name": "CTET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 100,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 3,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "coal-india-mt",
    "name": "Coal India MT",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rrb-alp",
    "name": "RRB ALP",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 40,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-agta",
    "name": "UPSSSC AGTA",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "afcat",
    "name": "AFCAT",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 100,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 100,
        "width": 3,
        "height": 1,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "allahabad-high-court-ro-aro-ca",
    "name": "Allahabad High Court RO / ARO / CA",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssc-cgl",
    "name": "SSC CGL",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 6,
        "height": 2,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "haryana-high-court-clerk",
    "name": "Haryana High Court Clerk",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mppsc-assistant-professor",
    "name": "MPPSC Assistant Professor",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-navy-agniveer-inet",
    "name": "Indian Navy Agniveer INET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "haryana-hssc-group-c-various-post",
    "name": "Haryana HSSC Group C Various Post",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rpsc-ras-pre",
    "name": "RPSC RAS Pre",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "aiims-cre",
    "name": "AIIMS CRE",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-platoon-commander-and-block-organizer",
    "name": "UPSSSC Platoon Commander & Block Organizer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "haryana-cet-group-d",
    "name": "Haryana CET Group D",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "cisf-asi-paramedical",
    "name": "CISF ASI Paramedical",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "sbi-po",
    "name": "SBI PO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "hp-psc-assistant-professor",
    "name": "HP PSC Assistant Professor",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "dsssb-tgt",
    "name": "DSSSB TGT",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nael-naini-aerospace-limited",
    "name": "NAEL - Naini Aerospace Limited",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "isro-icrb",
    "name": "ISRO ICRB",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-forest-guard-wildlife-guard",
    "name": "UPSSSC Forest Guard / Wildlife Guard",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jssc-jtglcce",
    "name": "JSSC JTGLCCE",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nielit-ccc",
    "name": "NIELIT CCC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ibps-po",
    "name": "IBPS PO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ibps-so-it-officer",
    "name": "IBPS SO IT Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rssb-cet-12th-level",
    "name": "RSSB CET 12th Level",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-airforce-agniveer-vayu",
    "name": "Indian Airforce Agniveer Vayu",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "airforce-group-y-medical-assistant-airmen",
    "name": "Airforce Group Y/ Medical Assistant Airmen",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "uppsc-uttar-pradesh-psc",
    "name": "UPPSC - Uttar Pradesh PSC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "neet-pg",
    "name": "NEET PG",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 200,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 4,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rrb-technician",
    "name": "RRB Technician",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 40,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nbems",
    "name": "NBEMS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "oil-and-natural-gas-corporation-ongc",
    "name": "Oil and Natural Gas Corporation (ONGC)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rssb-cet-graduate-level",
    "name": "RSSB CET Graduate Level",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "hp-police-constable",
    "name": "HP Police Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-army-ssc-technical-68th",
    "name": "Indian Army SSC Technical 68th",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rpsc-apo",
    "name": "RPSC APO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "railway-rrc-ncr-apprentice",
    "name": "Railway RRC NCR Apprentice",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nicl-assistant",
    "name": "NICL Assistant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "aiims-ini-cet",
    "name": "AIIMS INI CET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "aiims-norcet-10th-nursing-officer",
    "name": "AIIMS NORCET 10th Nursing Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "allahabad-high-court-private-secretary",
    "name": "Allahabad High Court Private Secretary",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ap-high-court",
    "name": "AP HIGH COURT",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "application-of-voter-id-card",
    "name": "Application Of Voter ID Card",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "apssb-constable",
    "name": "APSSB Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "army-jag-124-entry",
    "name": "Army JAG 124 Entry",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "army-ncc-special-entry-124-course",
    "name": "Army NCC Special Entry 124 Course",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "avnl-armoured-vehicles-nigam-limited",
    "name": "AVNL - Armoured Vehicles Nigam Limited",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bank-of-india-po",
    "name": "Bank of India PO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "beml-junior-executive-recruitment",
    "name": "BEML Junior Executive Recruitment",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-4th-cgl",
    "name": "Bihar 4th CGL",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-bcece-junior-resident",
    "name": "Bihar BCECE Junior Resident",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-bpsc-acf",
    "name": "Bihar BPSC ACF",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-bpsc-apo",
    "name": "Bihar BPSC APO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-bpsc-atps",
    "name": "Bihar BPSC ATPS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-bpsc-factory-inspector",
    "name": "Bihar BPSC Factory Inspector",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-bpsc-stenographer",
    "name": "Bihar BPSC Stenographer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-bssc-inter-level",
    "name": "Bihar BSSC Inter Level",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-police-bpssc-asi",
    "name": "Bihar Police BPSSC ASI",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-police-bpssc-havildar-clerk",
    "name": "Bihar Police BPSSC Havildar Clerk",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bihar-police-constable",
    "name": "Bihar Police Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc",
    "name": "BPSC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc-aso-mains",
    "name": "BPSC ASO Mains",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc-auditor",
    "name": "BPSC Auditor",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc-professor",
    "name": "BPSC Professor",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc-project-manager",
    "name": "BPSC Project Manager",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc-prosecution-officer",
    "name": "BPSC Prosecution Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bpsc-school-teacher-tre-4-0",
    "name": "BPSC School Teacher TRE 4.0",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "bsnl-senior-executive-trainee",
    "name": "BSNL Senior Executive Trainee",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "btsc-dairy-field-officer-technical-officer",
    "name": "BTSC Dairy Field Officer / Technical Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "btsc-junior-engineer",
    "name": "BTSC Junior Engineer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "canara-bank-apprentice",
    "name": "Canara Bank Apprentice",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "central-bank-of-india",
    "name": "Central Bank of India",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "central-bank-of-india-specialist-officer",
    "name": "Central Bank of India Specialist Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "central-silk-board-csb-scientist-b",
    "name": "Central Silk Board (CSB) Scientist-B",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "csbc-bihar-police-constable-special-branch",
    "name": "CSBC Bihar Police Constable Special Branch",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "csir-iict-junior-secretariat-assistant",
    "name": "CSIR IICT Junior Secretariat Assistant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "csir-immt-mts",
    "name": "CSIR IMMT MTS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "cuet",
    "name": "CUET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 200,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 4,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "delhi-high-court-jja",
    "name": "Delhi High Court JJA",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "delhi-police-constable",
    "name": "Delhi Police Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 4,
        "height": 3,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "dgca-computer-number",
    "name": "DGCA Computer Number",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "dsssb-aso",
    "name": "DSSSB ASO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "dsssb-mts",
    "name": "DSSSB MTS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "exim-bank-deputy-manager",
    "name": "Exim Bank Deputy Manager",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "exim-bank-mt",
    "name": "Exim Bank MT",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "gate",
    "name": "GATE",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 200,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 4,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "hpcl-officer-recruitment",
    "name": "HPCL Officer Recruitment",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "hpsc-haryana-psc-hcs",
    "name": "HPSC (Haryana PSC) HCS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "hpsc-pgt-computer-science",
    "name": "HPSC PGT Computer Science",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "hssc-haryana-police-constable",
    "name": "HSSC Haryana Police Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "hssc-stenographer",
    "name": "HSSC Stenographer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ibps-rrb",
    "name": "IBPS RRB",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ibps-so",
    "name": "IBPS SO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "idbi-junior-assistant-manager",
    "name": "IDBI Junior Assistant Manager",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "iffco-phulpur-apprentice",
    "name": "IFFCO Phulpur Apprentice",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ignuo-masters",
    "name": "IGNUO - Masters",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ignuo-admission",
    "name": "IGNUO Admission",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-army-agniveer-rally-recruitment",
    "name": "Indian Army Agniveer Rally Recruitment",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-forest-service-ifs-pre",
    "name": "Indian Forest Service (IFS) - Pre",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-navy-ssc-officer",
    "name": "Indian Navy SSC Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-navy-ssr-medical",
    "name": "Indian Navy SSR Medical",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-navy-ssr-mr-inet",
    "name": "Indian Navy SSR/MR INET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "indian-post-gds",
    "name": "Indian Post GDS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "irb-gd-constable",
    "name": "IRB GD Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "itbp-ssf-constable",
    "name": "ITBP SSF Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jee-advanced",
    "name": "JEE Advanced",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 200,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 4,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jee-mains",
    "name": "JEE Mains",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 200,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 4,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jpsc-jharkhand-psc-pre",
    "name": "JPSC (Jharkhand PSC) Pre",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jpsc-drug-inspector",
    "name": "JPSC Drug Inspector",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "jssc-kakshapal-jail-warder",
    "name": "JSSC Kakshapal Jail Warder",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "kvs-class-1",
    "name": "KVS Class 1",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mp-apex-bank-computer-operator-and-society-manager",
    "name": "MP Apex Bank Computer Operator & Society Manager",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mp-apex-bank-officer-grade-i-i",
    "name": "MP Apex Bank Officer Grade-I, I",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mp-head-constable-and-asi-computer",
    "name": "MP Head Constable & ASI Computer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mpesb-group-5-paramedical-and-nursing-staff",
    "name": "MPESB Group 5 Paramedical & Nursing Staff",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mpesb-iti-training-officer",
    "name": "MPESB ITI Training Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mpesb-van-rakshak-jail-prahari",
    "name": "MPESB Van Rakshak, Jail Prahari",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mpfsl-mp-forensic-science-lab",
    "name": "MPFSL (MP Forensic Science Lab)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mppsc-assistant-town-planner",
    "name": "MPPSC Assistant Town Planner",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mppsc-pre",
    "name": "MPPSC Pre",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nabard-development-assistant-grade-b",
    "name": "NABARD Development Assistant Grade-B",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "neet-ug",
    "name": "NEET UG",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 10,
        "maxKb": 200,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 4,
        "maxKb": 30,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nfso-section-officer",
    "name": "NFSO Section Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "nfsu-aso-assistant-section-officer",
    "name": "NFSU ASO Assistant Section Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "pnb-apprentices",
    "name": "PNB Apprentices",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "psssb-jail-warder-matron",
    "name": "PSSSB Jail Warder, Matron",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "railway-ntpc",
    "name": "Railway NTPC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 40,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "railway-rrc-nwr-apprentice",
    "name": "Railway RRC NWR Apprentice",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rajasthan-police-constable",
    "name": "Rajasthan Police Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rbi-assistant",
    "name": "RBI Assistant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rbi-grade-b",
    "name": "RBI Grade B",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rbi-non-csg-various-post",
    "name": "RBI Non CSG Various Post",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rbi-office-attendant",
    "name": "RBI Office Attendant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rrb-group-d",
    "name": "RRB Group-D",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 40,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rrb-ministerial-and-isolated-category",
    "name": "RRB Ministerial & Isolated Category",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rrc-cr-apprentices",
    "name": "RRC CR Apprentices",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rrc-scr-apprentice-south-central-railway",
    "name": "RRC SCR Apprentice (South Central Railway)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rssb-agriculture-supervisor",
    "name": "RSSB Agriculture Supervisor",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rssb-clerk-jr-ii-junior-assistant-ldc",
    "name": "RSSB Clerk Jr-II / Junior Assistant/ LDC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rssb-forester",
    "name": "RSSB Forester",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rssb-lab-assistant",
    "name": "RSSB Lab Assistant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "rssb-supervisor-male-female",
    "name": "RSSB Supervisor (Male/Female)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "sbi-cbo",
    "name": "SBI CBO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "sbi-clerk",
    "name": "SBI CLERK",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 200,
        "height": 230,
        "unit": "px",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 140,
        "height": 60,
        "unit": "px",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "south-indian-bank-sib-junior-officer",
    "name": "South Indian Bank SIB Junior Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "spmcil-igm",
    "name": "SPMCIL IGM",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssc-all-exams",
    "name": "SSC - All Exams",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 6,
        "height": 2,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssc-chsl",
    "name": "SSC CHSL",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 6,
        "height": 2,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssc-gd",
    "name": "SSC GD",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 4,
        "height": 3,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "ssc-mts",
    "name": "SSC MTS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 6,
        "height": 2,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "supreme-court-law-clerk",
    "name": "Supreme Court Law Clerk",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "up-police-constable",
    "name": "UP Police Constable",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 50,
        "maxKb": 100,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "up-police-jail-warder",
    "name": "UP Police Jail Warder",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "up-police-si-asi-clerk-and-acc",
    "name": "UP Police SI, ASI Clerk & Acc.",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "uppcb-aee-aso",
    "name": "UPPCB - AEE, ASO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "uppsc-medical-officer",
    "name": "UPPSC Medical Officer",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsc-capf-ac-assistant-commandant",
    "name": "UPSC - CAPF AC Assistant Commandant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsc-combined-medical-services-cms",
    "name": "UPSC Combined Medical Services CMS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsc-cse-pre",
    "name": "UPSC CSE (Pre)",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsc-ies-iss",
    "name": "UPSC IES / ISS",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 20,
        "maxKb": 300,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-aso",
    "name": "UPSSSC ASO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-pet",
    "name": "UPSSSC PET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "uptet",
    "name": "UPTET",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "yantra-india-limited-yil-apprentice",
    "name": "Yantra India Limited (YIL) Apprentice",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-lekhpal",
    "name": "UPSSSC Lekhpal",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-junior-assistant",
    "name": "UPSSSC Junior Assistant",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "upsssc-vdo",
    "name": "UPSSSC VDO",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "tnpsc",
    "name": "TNPSC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "mpsc",
    "name": "MPSC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  },
  {
    "slug": "kpsc",
    "name": "KPSC",
    "formsOut": false,
    "year": 2026,
    "documents": [
      {
        "id": "photo",
        "label": "Photo",
        "minKb": 20,
        "maxKb": 50,
        "width": 3.5,
        "height": 4.5,
        "unit": "cm",
        "format": "jpg"
      },
      {
        "id": "sign",
        "label": "Sign",
        "minKb": 10,
        "maxKb": 20,
        "width": 3.5,
        "height": 1.5,
        "unit": "cm",
        "format": "jpg",
        "scanEffect": true
      }
    ]
  }
];

export function getExam(slug: string): Exam | undefined {
  return EXAMS.find((e) => e.slug === slug);
}

export function searchExams(query: string): Exam[] {
  const q = query.trim().toLowerCase();
  if (!q) return EXAMS;
  return EXAMS.filter(
    (e) => e.name.toLowerCase().includes(q) || e.slug.includes(q.replace(/\s+/g, "-"))
  );
}
