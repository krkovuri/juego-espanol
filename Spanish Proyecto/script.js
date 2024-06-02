document.addEventListener("DOMContentLoaded", function () {
  const questions = {
    // imperfect tense questions
    "imperfect-100": {
      name: "Imperfect Tense for $100",
      question:
        "A menudo (often), we use this tense in Spanish. In your own words, what is the imperfect tense?",
      answer:
        'Used to describe repeated or habitual actions in the past. Similar to using the phase "was walking" in English.',
    },
    "imperfect-200": {
      name: "Imperfect Tense for $200",
      question:
        'Fill in the blanks with the correct imperfect form: "Cuando _____ (ser) niño, yo me _____ (torcer) mi tobillo con frecuencia."',
      answer: "era, torcía",
    },
    "imperfect-300": {
      name: "Imperfect Tense for $300",
      question:
        "Sus pies le _____ todos los días después de caminar tanto (doler)",
      answer: "dolía",
    },
    "imperfect-400": {
      name: "Imperfect Tense for $400",
      question:
        'Translate the sentence "When I was sick, I coughed a lot and had a fever" into Spanish.',
      answer: "Cuando estaba enfermo, tosía mucho y tenía fiebre.",
    },
    "imperfect-500": {
      name: "Imperfect Tense for $500",
      question:
        'Translate the sentence "We used to not like going to the dentist or the doctor" into Spanish.',
      answer: "A nosotros no nos gustaba ir al dentista o el doctor.",
    },
    // adverb questions
    "adverbs-100": {
      name: "Adverbs for $100",
      question: "Explain how you form an adverb from an adjective in Spanish.",
      answer:
        'For most adjectives, you can form the corresponding adverb by adding "-mente" to the feminine singular form of the adjective. Some adverbs have irregular forms, such as "bien" (adj: bueno)',
    },
    "adverbs-200": {
      name: "Adverbs for $200",
      question:
        'How would you say "I drove slowly down the street" in Spanish?',
      answer: "Conduje despacio por la calle.",
    },
    "adverbs-300": {
      name: "Adverbs for $300",
      question: "_____ pude terminar mi tarea _____ (Barely, on time)",
      answer: "Apenas, a tiempo",
    },
    "adverbs-400": {
      name: "Adverbs for $400",
      question:
        'Contrast the meanings of the adverbs "bastante" and "casi." Use both in a sentence.',
      answer:
        'Bastante means "enough" or "quite" in English. Casi means "almost" in English.',
    },
    "adverbs-500": {
      name: "Adverbs for $500",
      question:
        "Use 3 different adverbs to describe how you would behave if you were feeling mareado/a.",
      answer: "Lentamente, cuidadosamente, despacio",
    },
    // por vs para questions
    "por-para-100": {
      name: "Por vs Para for $100",
      question: "Fui a la farmacia _____ comprar las aspirinas.",
      answer: "para",
    },
    "por-para-200": {
      name: "Por vs Para for $200",
      question:
        "Estuvimos en Montevideo _____ una semana y paseamos _____ toda la ciudad.",
      answer: "por, por",
    },
    "por-para-300": {
      name: "Por vs Para for $300",
      question: "_____ tí, este sitio web no es fiable.",
      answer: "Para",
    },
    "por-para-400": {
      name: "Por vs Para for $400",
      question: "La cámara digital es un regalo _____ Enrique.",
      answer: "para",
    },
    "por-para-500": {
      name: "Por vs Para for $500",
      question: "Cuando conducía _____ la autopista, vi un accidente.",
      answer: "por",
    },
    // mandatos formales questions
    "mandatos-formales-100": {
      name: "Formal Commands for $100",
      question:
        'How would you say "Tell me your email address and phone number" in Spanish?',
      answer: "Dígame su dirección electrónica y número de teléfono celular.",
    },
    "mandatos-formales-200": {
      name: "Formal Commands for $200",
      question: 'How would you say "Turn off your laptop, please" in Spanish?',
      answer: "Apague su computadora portátil, por favor.",
    },
    "mandatos-formales-300": {
      name: "Formal Commands for $300",
      question: "Señor, _____ (take) esta receta a la farmacia.",
      answer: "lleve",
    },
    "mandatos-formales-400": {
      name: "Formal Commands for $400",
      question: 'How would you say "Please save the file, sir" in Spanish',
      answer: "Por favor guarde el archivo, señor.",
    },
    "mandatos-formales-500": {
      name: "Formal Commands for $500",
      question:
        "Give 3 formal commands that your doctor would say to you during a regular checkup.",
      answer: "Abre la boca, levante el brazo, y respire hondo.",
    },
    // constructions with se questions
    "se-constructions-100": {
      name: "Constructions with se for $100",
      question:
        'Other than using it as a reflexive pronoun, what are 2 other uses of the word "se"?',
      answer:
        "Se can be used to describe accidental events. Example: 'Se me cayó la pluma' (I dropped the pen). Se can also be used to form passive constructions, where the subject receives the action of the verb without indicating who performed the action. Example: 'Se habla español aquí' (Spanish is spoken here).",
    },
    "se-constructions-200": {
      name: "Constructions with se for $200",
      question: "_____ ustedes se les olvidaron los libros.",
      answer: "A",
    },
    "se-constructions-300": {
      name: "Constructions with se for $300",
      question:
        "Translate the sentence 'He broke the coffee maker' into Spanish.",
      answer: "Él se rompió la cafetera.",
    },
    "se-constructions-400": {
      name: "Constructions with se for $400",
      question:
        "Translate the sentence 'One eats well in this dining room' into Spanish.",
      answer: "Se come bien en este comedor.",
    },
    "se-constructions-500": {
      name: "Constructions with se for $500",
      question: "Translate the sentence 'We damaged the radio' into Spanish.",
      answer: "Se nos daño el radio.",
    },
    // relative pronouns questions
    "pronombres-relativos-100": {
      name: "Relative Pronouns for $100",
      question:
        "What are the the two main relative pronouns in Spanish? Provide an example for each.",
      answer:
        "The two main relative pronouns in Spanish are 'que' and 'quien/quienes'. 'Que' is used to introduce restrictive relative clauses, while 'quien/quienes' is used to introduce non-restrictive relative clauses. Example: 'El libro que está en la mesa es mío' (The book that is on the table is mine). 'Mi hermano, quien es médico, vive en Madrid' (My brother, who is a doctor, lives in Madrid).",
    },
    "pronombres-relativos-200": {
      name: "Relative Pronouns for $200",
      question:
        "Translate the sentence 'The man who is parking is my friend' into Spanish.",
      answer: "El hombre que está estacionando es mi amigo.",
    },
    "pronombres-relativos-300": {
      name: "Relative Pronouns for $300",
      question:
        "Translate the sentence 'She is the one who got her driver's licence' into Spanish.",
      answer: "Ella es la que consiguió la licencia de conducir.",
    },
    "pronombres-relativos-400": {
      name: "Relative Pronouns for $400",
      question:
        "Translate the sentence 'The mechanics, who are from different countries, speak Spanish' into Spanish.",
      answer:
        "Los mecánicos, quienes son de diferentes países, hablan español.",
    },
    "pronombres-relativos-500": {
      name: "Relative Pronouns for $500",
      question:
        "Translate the sentence 'What I like about you is your generocity' into Spanish.",
      answer: "Lo que me gusta de ti es tu generosidad.",
    },
  };
  const mainDiv = document.querySelector(".question-page");
  const id = mainDiv.id;

  const questionNameElement = document.querySelector(".question-name");
  const questionElement = document.querySelector(".question");
  const answerElement = document.querySelector(".answer");

  questionNameElement.textContent = questions[id].name;
  questionElement.textContent = questions[id].question;
  answerElement.textContent = questions[id].answer;

  answerElement.classList.add("hidden");

  document.querySelector(".enter").addEventListener("click", function () {
    answerElement.classList.remove("hidden");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      history.back();
    }
  });
});
