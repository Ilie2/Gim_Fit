
# Gim_Fit - Platformă Colectivă de Gestionare Fitness

**Gim_Fit** este o aplicație web dezvoltată pentru gestionarea activităților și utilizatorilor într-un mediu de fitness. Proiectul este structurat în două părți principale: un backend robust bazat pe .NET Core și un frontend modern pentru interacțiunea utilizatorilor.

---

## **Descrierea Aplicației**

### Scop
Gim_Fit este proiectat pentru a facilita administrarea activităților unei săli de fitness, precum și pentru a oferi utilizatorilor o interfață ușor de utilizat. Aplicația integrează autentificarea, gestionarea datelor și funcționalități personalizate pentru administratori și clienți.

### Funcționalități principale:
1. **Autentificare și autorizare**: Utilizarea token-urilor JWT pentru o securitate avansată.
2. **Gestionarea utilizatorilor**: Crearea și administrarea conturilor pentru clienți și antrenori.
3. **Planificare antrenamente**: Adăugarea și gestionarea programelor de antrenament.
4. **Monitorizare progres**: Vizualizarea progresului clienților prin statistici și rapoarte.

---

## **Structura Proiectului**

Aplicația este organizată în module principale:

### 1. **Backend (.NET Core)**
- **Fișiere relevante**: `Program.cs`, `IJwtService.cs`
- **Rol**: Gestionarea logicii aplicației, inclusiv autentificarea și conectarea la baza de date.
- **Servicii principale**:
  - Autentificare JWT.
  - Conexiune cu baza de date SQL Server.

### 2. **Frontend**
- **Fișiere relevante**: Fișiere React/JavaScript pentru interfață (listate în folderul Frontend).
- **Rol**: Furnizarea unei interfețe intuitive utilizatorilor.

### 3. **Baza de date**
- **Fișiere relevante**: Definițiile tabelelor (în DbContext și migrații).
- **Rol**: Stocarea datelor despre utilizatori, antrenamente și progres.

---

## **Tehnologii Utilizate**
- **.NET Core**: Backend pentru gestionarea logicii aplicației și conectarea la baza de date.
- **React**: Frontend modern pentru interacțiunea cu utilizatorii.
- **SQL Server**: Baza de date relațională pentru stocarea datelor aplicației.
- **JWT (JSON Web Tokens)**: Securizarea autentificării.

---

## **Contribuții**

Acest proiect a fost dezvoltat în colaborare, fiecare membru al echipei având responsabilități specifice:
- **Alexandrescu Ilie-Danut**: Dezvoltarea backend-ului, inclusiv autentificarea și conexiunile cu baza de date , api.
- **Zaman Emanuel**: Crearea interfeței pentru utilizatori și implementarea funcționalităților frontend.
- **Aldea Adelin**: Crearea interfeței pentru utilizatori și implementarea funcționalităților frontend.

---

## **Extensii posibile**
1. Adăugarea unui sistem de plăți online pentru abonamente.
2. Crearea unui panou de administrare pentru statistici avansate.
3. Integrarea cu dispozitive fitness (ex: trackere de activitate).

---

**Gim_Fit** este o platformă colectivă care demonstrează colaborarea eficientă și integrarea tehnologiilor moderne pentru a crea un mediu interactiv și sigur pentru utilizatori.
