

## Plan: Mută harta înaintea cardului de contact în sidebar

### Modificări

**`CompanySidebar.tsx`**
1. Adăugăm blocul de hartă (placeholder Google Maps 160px + adresă + link "Indicații rutiere") ca **primul element** din sidebar, înainte de cardul de contact
2. Ștergem blocul de hartă din `CompanyHeader.tsx` (liniile ~212-226)

**`CompanyHeader.tsx`**
1. Ștergem secțiunea de hartă din coloana dreaptă (div-ul cu Google Maps placeholder, adresa și linkul "Indicații rutiere")

### Ordine finală sidebar
1. Google Maps placeholder + adresă
2. Contact card (telefon, WhatsApp, formular)
3. Informații legale
4. Statistici
5. Banner publicitar
6. Saloane similare

