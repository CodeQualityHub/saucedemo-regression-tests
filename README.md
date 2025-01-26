# **Playwright TypeScript Automatisierungsframework**

![Playwright Logo](https://playwright.dev/img/playwright-logo.svg)

Dieses Repository enthält ein **robustes und skalierbares Automatisierungsframework** zur Testung der [SauceDemo](https://www.saucedemo.com/)-Website mit **Playwright** und **TypeScript**. Das Framework folgt dem **Page Object Model (POM)**-Designmuster und integriert Best Practices für Testautomatisierung, einschließlich Modularität, Wiederverwendbarkeit und Wartbarkeit.

---

## **Inhaltsverzeichnis**
1. [Funktionen](#funktionen)
2. [Verwendete Technologien](#verwendete-technologien)
3. [Voraussetzungen](#voraussetzungen)
4. [Setup und Installation](#setup-und-installation)
5. [Projektstruktur](#projektstruktur)
6. [Tests ausführen](#tests-ausführen)
7. [Testberichte](#testberichte)
8. [Best Practices](#best-practices)

---

## **Funktionen**
- **Page Object Model (POM)**: Sichert eine klare Trennung zwischen Testlogik und seitenbezogenem Code.
- **TypeScript**: Bietet Typsicherheit und verbesserte Code-Wartbarkeit.
- **Allure-Berichte**: Generiert detaillierte und interaktive Testberichte.
- **Datengetriebene Tests**: Testdaten werden in JSON-Dateien gespeichert, um die Pflege zu erleichtern.
- **Cross-Browser-Tests**: Unterstützt Tests in mehreren Browsern (Chromium, Firefox, WebKit).
- **Parallele Ausführung**: Tests können parallel ausgeführt werden, um die Ausführungszeit zu verkürzen.
- **CI/CD-Integration**: Bereit für die Integration in CI/CD-Pipelines (z. B. GitHub Actions).

---

## **Verwendete Technologien**
- **Playwright**: Modernes End-to-End-Testframework.
- **TypeScript**: Typsichere Programmiersprache, die auf JavaScript aufbaut.
- **Allure**: Leistungsstarkes Tool für Testberichte.
- **JSON**: Zur Verwaltung von Testdaten.
- **Node.js**: Laufzeitumgebung für die Testausführung.

---

## **Voraussetzungen**
Bevor Sie die Tests ausführen, stellen Sie sicher, dass Folgendes installiert ist:
1. **Node.js** (v16 oder höher): [Node.js herunterladen](https://nodejs.org/)
2. **npm** (wird mit Node.js installiert)
3. **Git**: [Git herunterladen](https://git-scm.com/)

---

## **Setup und Installation**
1. **Repository klonen**:
   git clone https://github.com/CodeQualityHub/saucedemo-regression-tests.git
   cd saucedemo-regression-tests
   
.
├── ## **Projetstruktur**
├── playwright-typescript-framework/
├── ├── src/
├── │   ├── pages/                  # Seitenklassen nach POM
├── │   │   ├── LoginPage.ts
├── │   │   ├── ProductPage.ts
├── │   │   ├── CartPage.ts
├── │   │   └── CheckoutPage.ts
├── │   ├── tests/                  # Testsuites
├── │   │   ├── regression/         # Regressionstests
├── │   │   │   ├── login.test.ts
├── │   │   │   ├── product.test.ts
├── │   │   │   ├── cart.test.ts
├── │   │   │   └── checkout.test.ts
├── │   │   └── e2e/                # End-to-End-Tests
├── │   │       └── e2e.test.ts
├── │   ├── utils/                  # Hilfsfunktionen
├── │   │   ├── constants.ts        # Selektoren und Konstanten
├── │   │   └── jsonUtils.ts        # JSON-Datenleser
├── │   └── data/                   # Testdaten-Dateien
├── │       ├── users.json
├── │       ├── products.json
├── │       └── config.json
├── ├── .github/                    # GitHub Actions-Workflows
├── │   └── workflows/
├── │       └── playwright.yml
├── ├── reports/                    # Testberichte (werden nach der Ausführung generiert)
├── ├── .env                        # Umgebungsvariablen
├── ├── .gitignore                  # Zu ignorierende Dateien und Verzeichnisse
├── ├── playwright.config.ts        # Playwright-Konfiguration
├── ├── package.json                # Projektabhängigkeiten und Skripte
└── └── README.md                   # Projektdokumentation

📦src
 ┣ 📂data
 ┃ ┣ 📜config.json
 ┃ ┣ 📜products.json
 ┃ ┗ 📜users.json
 ┣ 📂pages
 ┃ ┣ 📜CartPage.ts
 ┃ ┣ 📜CheckoutPage.ts
 ┃ ┣ 📜LoginPage.ts
 ┃ ┗ 📜ProductPage.ts
 ┣ 📂tests
 ┃ ┣ 📂e2e
 ┃ ┃ ┗ 📜e2e.test.ts
 ┃ ┗ 📂regression
 ┃ ┃ ┣ 📜cart.test.ts
 ┃ ┃ ┣ 📜checkout.test.ts
 ┃ ┃ ┣ 📜login.test.ts
 ┃ ┃ ┗ 📜product.test.ts
 ┗ 📂utils
 ┃ ┣ 📜constants.ts
 ┃ ┗ 📜jsonUtils.ts
 
## **Test ausführen**
### Alle Tests ausführen:
npx playwright test

### Tests im Headed-Modus ausführen:
npx playwright test --headed

### Tests in einem bestimmten Browser ausführen (z. B. Chromium):
npx playwright test --project=chromium

### Tests parallel ausführen:
npx playwright test --workers=4

### Regressionstests ausführen:
npx playwright test tests/regression/

### End-to-End-Tests ausführen:
npx playwright test tests/e2e/

## **Testberichte**
## Allure-Berichte

### Bericht generieren:
npx allure generate ./allure-results --clean

### Bericht öffnen:
npx allure open

### HTML-Bericht:
Playwright generiert standardmäßig einen HTML-Bericht. Öffnen Sie ihn mit:
npx playwright show-report

## **Best Practices**
Page Object Model (POM): Kapselt seitenbezogene Logik in Seitenklassen.
Datengetriebene Tests: Speichert Testdaten in JSON-Dateien für einfache Pflege.
Wiederverwendbare Hilfsfunktionen: Nutzt Hilfsfunktionen für häufige Aufgaben (z. B. Lesen von JSON-Dateien).
Umgebungskonfiguration: Verwendet config.json-Dateien für umgebungsspezifische Einstellungen.
Parallele Ausführung: Führt Tests parallel aus, um die Ausführungszeit zu verkürzen.
Berichterstellung: Nutzt Allure für detaillierte und interaktive Testberichte.
