const QUESTIONS = [
  {
    id: "nationality",
    text: "What is your citizenship or residency status?",
    options: [
      { label: "US citizen", value: "us_citizen" },
      { label: "US green card holder", value: "green_card" },
      { label: "Other nationality (no US tax obligations)", value: "other" }
    ]
  },
  {
    id: "foreign_accounts",
    text: "Do you have financial accounts outside Japan with a combined value that exceeded $10,000 at any point during the year?",
    hint: "This includes bank accounts, brokerage accounts, mutual funds, and certain insurance policies held outside Japan.",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Not sure", value: "unsure" }
    ],
    showIf: function(answers) { return answers.nationality !== "other"; }
  },
  {
    id: "foreign_assets",
    text: "Do you have specified foreign financial assets with a total value exceeding $200,000 (single) or $400,000 (married filing jointly) at year-end?",
    hint: "This is a higher threshold than FBAR. Includes stocks, bonds, partnership interests, and financial accounts held outside the US.",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Not sure", value: "unsure" }
    ],
    showIf: function(answers) { return answers.nationality !== "other"; }
  },
  {
    id: "rsu",
    text: "Do you receive RSUs (Restricted Stock Units), stock options, or equity compensation from your employer?",
    options: [
      { label: "Yes, RSUs", value: "rsu" },
      { label: "Yes, stock options", value: "options" },
      { label: "Yes, both", value: "both" },
      { label: "No", value: "no" }
    ],
    showIf: function(answers) { return answers.nationality !== "other"; }
  },
  {
    id: "nisa_ideco",
    text: "Do you contribute to NISA (Nippon Individual Savings Account) or iDeCo?",
    hint: "These Japanese tax-advantaged accounts may not be recognized by the US tax system.",
    options: [
      { label: "Yes, NISA only", value: "nisa" },
      { label: "Yes, iDeCo only", value: "ideco" },
      { label: "Yes, both", value: "both" },
      { label: "No", value: "no" }
    ],
    showIf: function(answers) { return answers.nationality !== "other"; }
  },
  {
    id: "dual_income",
    text: "Do you earn income that is taxed in both the US and Japan?",
    hint: "For example: salary from a Japanese employer while having US tax obligations, or US-source income while living in Japan.",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No, only taxed in one country", value: "no" },
      { label: "Not sure", value: "unsure" }
    ],
    showIf: function(answers) { return answers.nationality !== "other"; }
  },
  {
    id: "wire_transfer",
    text: "Do you send or receive international wire transfers exceeding 1 million yen (approximately $7,000)?",
    hint: "Japanese banks report transfers over this amount to tax authorities.",
    options: [
      { label: "Yes, regularly", value: "regular" },
      { label: "Yes, occasionally", value: "occasional" },
      { label: "No", value: "no" }
    ],
    showIf: function(answers) { return answers.nationality !== "other"; }
  }
];
