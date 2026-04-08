const FILING_ITEMS = {
  fbar: {
    title: "FBAR (FinCEN Report 114)",
    description: "You must report all foreign financial accounts if their combined value exceeded $10,000 at any time during the calendar year.",
    deadline: "April 15 (auto-extended to October 15)",
    link: "https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar",
    linkText: "IRS FBAR Information"
  },
  fatca: {
    title: "FATCA Form 8938 (Statement of Specified Foreign Financial Assets)",
    description: "Report specified foreign financial assets if they exceed the reporting threshold. Filed with your annual tax return.",
    deadline: "Filed with Form 1040 (April 15, or October 15 with extension)",
    link: "https://www.irs.gov/businesses/corporations/summary-of-fatca-reporting-for-us-taxpayers",
    linkText: "IRS FATCA Summary"
  },
  rsu_tax: {
    title: "RSU / Stock Option Income Reporting",
    description: "RSU income is taxable in both the US and Japan. You may need to report on Form 1040, Schedule D, and Japanese kakutei shinkoku. The US-Japan tax treaty may provide relief from double taxation.",
    deadline: "Annual tax filing deadlines in both countries",
    link: "https://www.irs.gov/taxtopics/tc427",
    linkText: "IRS Stock Options Guide"
  },
  nisa_warning: {
    title: "NISA / iDeCo US Tax Implications",
    description: "The US does not recognize NISA or iDeCo as tax-advantaged accounts. Gains in these accounts may be taxable for US purposes. NISA funds may also be classified as PFICs (Passive Foreign Investment Companies), which have complex reporting requirements.",
    deadline: "Ongoing — affects annual US tax return",
    link: "https://www.irs.gov/forms-pubs/about-form-8621",
    linkText: "IRS Form 8621 (PFIC)"
  },
  ftc: {
    title: "Foreign Tax Credit (Form 1116)",
    description: "If you pay taxes to Japan on income that is also taxable in the US, you can claim a Foreign Tax Credit to avoid double taxation. This is usually more beneficial than the Foreign Earned Income Exclusion for Japan residents.",
    deadline: "Filed with Form 1040",
    link: "https://www.irs.gov/individuals/international-taxpayers/foreign-tax-credit",
    linkText: "IRS Foreign Tax Credit"
  },
  wire_report: {
    title: "International Wire Transfer Reporting (Kokugai Sokin Chobo)",
    description: "Japanese banks are required to report international transfers exceeding 1 million yen to the tax authorities. While you do not need to file a separate form, be aware that these transfers are monitored and may trigger inquiries about the source and purpose of funds.",
    deadline: "No separate filing required — automatic bank reporting",
    link: "https://www.nta.go.jp/english/",
    linkText: "Japan National Tax Agency (English)"
  },
  not_applicable: {
    title: "No Additional US Filing Requirements Detected",
    description: "Based on your answers, you may not have additional US tax filing obligations related to your situation in Japan. However, if you are a US citizen or green card holder, you are still required to file a US tax return annually regardless of where you live.",
    deadline: "April 15 (auto-extended to June 15 for overseas filers)",
    link: "https://www.irs.gov/individuals/international-taxpayers/us-citizens-and-residents-abroad-filing-requirements",
    linkText: "IRS Filing Requirements for Overseas Filers"
  }
};

function evaluateAnswers(answers) {
  if (answers.nationality === "other") {
    return ["not_applicable"];
  }

  var items = [];

  if (answers.foreign_accounts === "yes" || answers.foreign_accounts === "unsure") {
    items.push("fbar");
  }

  if (answers.foreign_assets === "yes" || answers.foreign_assets === "unsure") {
    items.push("fatca");
  }

  if (answers.rsu && answers.rsu !== "no") {
    items.push("rsu_tax");
  }

  if (answers.nisa_ideco && answers.nisa_ideco !== "no") {
    items.push("nisa_warning");
  }

  if (answers.dual_income === "yes" || answers.dual_income === "unsure") {
    items.push("ftc");
  }

  if (answers.wire_transfer === "regular" || answers.wire_transfer === "occasional") {
    items.push("wire_report");
  }

  return items.length > 0 ? items : ["not_applicable"];
}
