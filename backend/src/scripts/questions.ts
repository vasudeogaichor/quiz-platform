export const questions: any = [
  {
    text: "Solve for x: 2x + 5 = 13",
    options: [
      { id: "a", text: "x = 4", isCorrect: true },
      { id: "b", text: "x = 6", isCorrect: false },
      { id: "c", text: "x = 3", isCorrect: false },
      { id: "d", text: "x = 5", isCorrect: false },
    ],
    difficulty: 3,
    topic: "algebra",
    explanation:
      "Subtract 5 from both sides: 2x = 8, then divide both sides by 2: x = 4",
    weight: 1,
  },
  {
    text: "Which expression is equivalent to 3(x + 2) - 2(x - 1)?",
    options: [
      { id: "a", text: "x + 8", isCorrect: true },
      { id: "b", text: "5x + 1", isCorrect: false },
      { id: "c", text: "x + 4", isCorrect: false },
      { id: "d", text: "5x + 4", isCorrect: false },
    ],
    difficulty: 5,
    topic: "algebra",
    explanation:
      "Expand 3(x + 2) = 3x + 6, expand -2(x - 1) = -2x + 2, combine like terms: 3x + 6 - 2x + 2 = x + 8",
    weight: 2,
  },
  {
    text: "Solve the quadratic equation: x² - 5x + 6 = 0",
    options: [
      { id: "a", text: "x = 2 or x = 3", isCorrect: true },
      { id: "b", text: "x = -2 or x = -3", isCorrect: false },
      { id: "c", text: "x = 1 or x = 4", isCorrect: false },
      { id: "d", text: "x = -1 or x = 6", isCorrect: false },
    ],
    difficulty: 8,
    topic: "algebra",
    explanation:
      "Using factoring: (x - 2)(x - 3) = 0, therefore x = 2 or x = 3",
    weight: 3,
  },

  {
    text: "What is the area of a triangle with base 6 units and height 8 units?",
    options: [
      { id: "a", text: "24 square units", isCorrect: true },
      { id: "b", text: "48 square units", isCorrect: false },
      { id: "c", text: "14 square units", isCorrect: false },
      { id: "d", text: "12 square units", isCorrect: false },
    ],
    difficulty: 3,
    topic: "geometry",
    explanation:
      "Area of triangle = ½ × base × height = ½ × 6 × 8 = 24 square units",
    weight: 1,
  },
  {
    text: "In a right triangle, if one angle is 30°, what is another angle (excluding the right angle)?",
    options: [
      { id: "a", text: "60°", isCorrect: true },
      { id: "b", text: "45°", isCorrect: false },
      { id: "c", text: "30°", isCorrect: false },
      { id: "d", text: "15°", isCorrect: false },
    ],
    difficulty: 5,
    topic: "geometry",
    explanation:
      "In a right triangle, angles sum to 180°. One angle is 90° and another is 30°, so the third angle must be 60° (180° - 90° - 30° = 60°)",
    weight: 2,
  },

  {
    text: "What is the SI unit of force?",
    options: [
      { id: "a", text: "Newton", isCorrect: true },
      { id: "b", text: "Joule", isCorrect: false },
      { id: "c", text: "Watt", isCorrect: false },
      { id: "d", text: "Pascal", isCorrect: false },
    ],
    difficulty: 3,
    topic: "physics",
    explanation:
      "The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kilogram at 1 meter per second squared",
    weight: 1,
  },
  {
    text: "Calculate the work done when a force of 10 N moves an object 5 meters in the direction of the force.",
    options: [
      { id: "a", text: "50 Joules", isCorrect: true },
      { id: "b", text: "15 Joules", isCorrect: false },
      { id: "c", text: "25 Joules", isCorrect: false },
      { id: "d", text: "2 Joules", isCorrect: false },
    ],
    difficulty: 5,
    topic: "physics",
    explanation: "Work = Force × distance = 10 N × 5 m = 50 Joules",
    weight: 2,
  },

  {
    text: "What is the chemical formula for water?",
    options: [
      { id: "a", text: "H₂O", isCorrect: true },
      { id: "b", text: "CO₂", isCorrect: false },
      { id: "c", text: "O₂", isCorrect: false },
      { id: "d", text: "H₂O₂", isCorrect: false },
    ],
    difficulty: 3,
    topic: "chemistry",
    explanation:
      "Water consists of two hydrogen atoms and one oxygen atom, hence H₂O",
    weight: 1,
  },
  {
    text: "Which of these represents a chemical change?",
    options: [
      { id: "a", text: "Rusting of iron", isCorrect: true },
      { id: "b", text: "Melting of ice", isCorrect: false },
      { id: "c", text: "Cutting paper", isCorrect: false },
      { id: "d", text: "Dissolving sugar", isCorrect: false },
    ],
    difficulty: 5,
    topic: "chemistry",
    explanation:
      "Rusting is a chemical change because it creates a new substance (iron oxide) and is irreversible",
    weight: 2,
  },

  {
    text: "What is the primary function of mitochondria in a cell?",
    options: [
      { id: "a", text: "Energy production", isCorrect: true },
      { id: "b", text: "Protein synthesis", isCorrect: false },
      { id: "c", text: "Storage", isCorrect: false },
      { id: "d", text: "Cell division", isCorrect: false },
    ],
    difficulty: 5,
    topic: "biology",
    explanation:
      "Mitochondria are known as the powerhouse of the cell because they produce energy through cellular respiration",
    weight: 2,
  },
  {
    text: "Which blood type is known as the universal donor?",
    options: [
      { id: "a", text: "O negative", isCorrect: true },
      { id: "b", text: "AB positive", isCorrect: false },
      { id: "c", text: "B negative", isCorrect: false },
      { id: "d", text: "A positive", isCorrect: false },
    ],
    difficulty: 5,
    topic: "biology",
    explanation:
      "O negative blood can be given to patients of all blood types, making it the universal donor type",
    weight: 2,
  },

  {
    text: "Which of these is a compound sentence?",
    options: [
      {
        id: "a",
        text: "I like pizza, and my sister prefers pasta.",
        isCorrect: true,
      },
      {
        id: "b",
        text: "The tall tree swayed in the wind.",
        isCorrect: false,
      },
      {
        id: "c",
        text: "After the rain stopped, we went outside.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "The energetic puppy played with its toy.",
        isCorrect: false,
      },
    ],
    difficulty: 5,
    topic: "english",
    explanation:
      "A compound sentence contains two independent clauses joined by a coordinating conjunction (and)",
    weight: 2,
  },
  {
    text: "Identify the metaphor in: 'Life is a roller coaster with ups and downs.'",
    options: [
      {
        id: "a",
        text: "Comparing life to a roller coaster",
        isCorrect: true,
      },
      { id: "b", text: "Mentioning ups and downs", isCorrect: false },
      { id: "c", text: "There is no metaphor", isCorrect: false },
      { id: "d", text: "Using the word 'life'", isCorrect: false },
    ],
    difficulty: 5,
    topic: "english",
    explanation:
      "This metaphor directly compares life to a roller coaster without using 'like' or 'as'",
    weight: 2,
  },

  {
    text: "What is the median of the numbers: 3, 7, 8, 5, 12?",
    options: [
      { id: "a", text: "7", isCorrect: true },
      { id: "b", text: "8", isCorrect: false },
      { id: "c", text: "5", isCorrect: false },
      { id: "d", text: "6", isCorrect: false },
    ],
    difficulty: 3,
    topic: "mathematics",
    explanation:
      "Arrange in order: 3,5,7,8,12. With 5 numbers, the median is the middle number (7)",
    weight: 1,
  },
  {
    text: "Calculate the mean of: 2, 4, 6, 8, 10",
    options: [
      { id: "a", text: "6", isCorrect: true },
      { id: "b", text: "5", isCorrect: false },
      { id: "c", text: "7", isCorrect: false },
      { id: "d", text: "8", isCorrect: false },
    ],
    difficulty: 3,
    topic: "mathematics",
    explanation: "Sum (30) divided by count (5) equals 6",
    weight: 1,
  },

  {
    text: "What is the slope of a line passing through points (2,3) and (4,7)?",
    options: [
      { id: "a", text: "2", isCorrect: true },
      { id: "b", text: "3", isCorrect: false },
      { id: "c", text: "4", isCorrect: false },
      { id: "d", text: "1", isCorrect: false },
    ],
    difficulty: 8,
    topic: "algebra",
    explanation: "Slope = (y₂-y₁)/(x₂-x₁) = (7-3)/(4-2) = 4/2 = 2",
    weight: 3,
  },
  {
    text: "Simplify: √48",
    options: [
      { id: "a", text: "4√3", isCorrect: true },
      { id: "b", text: "2√12", isCorrect: false },
      { id: "c", text: "6√2", isCorrect: false },
      { id: "d", text: "3√4", isCorrect: false },
    ],
    difficulty: 8,
    topic: "algebra",
    explanation: "√48 = √(16 × 3) = √16 × √3 = 4√3",
    weight: 3,
  },

  {
    text: "A car accelerates from 0 to 20 m/s in 5 seconds. What is its acceleration?",
    options: [
      { id: "a", text: "4 m/s²", isCorrect: true },
      { id: "b", text: "5 m/s²", isCorrect: false },
      { id: "c", text: "2 m/s²", isCorrect: false },
      { id: "d", text: "10 m/s²", isCorrect: false },
    ],
    difficulty: 8,
    topic: "physics",
    explanation: "Acceleration = change in velocity/time = (20-0)/5 = 4 m/s²",
    weight: 3,
  },

  {
    text: "Balance this equation: __ H₂ + __ O₂ → __ H₂O",
    options: [
      { id: "a", text: "2, 1, 2", isCorrect: true },
      { id: "b", text: "1, 1, 1", isCorrect: false },
      { id: "c", text: "2, 2, 2", isCorrect: false },
      { id: "d", text: "1, 2, 2", isCorrect: false },
    ],
    difficulty: 8,
    topic: "chemistry",
    explanation:
      "2H₂ + O₂ → 2H₂O balances both hydrogen and oxygen atoms on both sides",
    weight: 3,
  },

  {
    text: "What is the binary representation of the decimal number 13?",
    options: [
      { id: "a", text: "1101", isCorrect: true },
      { id: "b", text: "1011", isCorrect: false },
      { id: "c", text: "1110", isCorrect: false },
      { id: "d", text: "1001", isCorrect: false },
    ],
    difficulty: 8,
    topic: "computing",
    explanation: "13 in binary is 1101 (8 + 4 + 0 + 1 = 13)",
    weight: 3,
  },
  {
    text: "Solve for x: 5x - 10 = 20",
    options: [
      { id: "a", text: "x = 4", isCorrect: false },
      { id: "b", text: "x = 6", isCorrect: true },
      { id: "c", text: "x = 3", isCorrect: false },
      { id: "d", text: "x = 5", isCorrect: false },
    ],
    difficulty: 2,
    topic: "algebra",
    explanation:
      "Add 10 to both sides: 5x = 30, then divide both sides by 5: x = 6",
    weight: 1,
  },
  {
    text: "Simplify the expression: 4(2x + 3) - 2(x - 1)",
    options: [
      { id: "a", text: "6x + 10", isCorrect: false },
      { id: "b", text: "6x + 14", isCorrect: true },
      { id: "c", text: "10x + 10", isCorrect: false },
      { id: "d", text: "10x + 14", isCorrect: false },
    ],
    difficulty: 3,
    topic: "algebra",
    explanation:
      "Expand 4(2x + 3) = 8x + 12, expand -2(x - 1) = -2x + 2, combine like terms: 8x + 12 - 2x + 2 = 6x + 14",
    weight: 1,
  },
  {
    text: "Solve for x: 2(x + 3) = 4(x - 1)",
    options: [
      { id: "a", text: "x = 5", isCorrect: true },
      { id: "b", text: "x = 3", isCorrect: false },
      { id: "c", text: "x = 4", isCorrect: false },
      { id: "d", text: "x = 2", isCorrect: false },
    ],
    difficulty: 4,
    topic: "algebra",
    explanation:
      "Expand 2(x + 3) = 2x + 6, expand 4(x - 1) = 4x - 4, combine like terms: 2x + 6 = 4x - 4, subtract 2x from both sides: 6 = 2x - 4, add 4 to both sides: 10 = 2x, divide both sides by 2: x = 5",
    weight: 2,
  },
  {
    text: "Simplify the expression: 3(2x - 1) - 2(3x + 2)",
    options: [
      { id: "a", text: "-x - 7", isCorrect: true },
      { id: "b", text: "x - 7", isCorrect: false },
      { id: "c", text: "-x + 7", isCorrect: false },
      { id: "d", text: "x + 7", isCorrect: false },
    ],
    difficulty: 4,
    topic: "algebra",
    explanation:
      "Expand 3(2x - 1) = 6x - 3, expand -2(3x + 2) = -6x - 4, combine like terms: 6x - 3 - 6x - 4 = -7",
    weight: 1,
  },
  {
    text: "Solve for x: 3(x - 2) = 2(x + 3)",
    options: [
      { id: "a", text: "x = 12", isCorrect: true },
      { id: "b", text: "x = 10", isCorrect: false },
      { id: "c", text: "x = 8", isCorrect: false },
      { id: "d", text: "x = 6", isCorrect: false },
    ],
    difficulty: 5,
    topic: "algebra",
    explanation:
      "Expand 3(x - 2) = 3x - 6, expand 2(x + 3) = 2x + 6, combine like terms: 3x - 6 = 2x + 6, subtract 2x from both sides: x - 6 = 6, add 6 to both sides: x = 12",
    weight: 2,
  },
  {
    text: "Simplify the expression: 2(3x - 4) - 3(2x + 1)",
    options: [
      { id: "a", text: "-11", isCorrect: true },
      { id: "b", text: "11", isCorrect: false },
      { id: "c", text: "-1", isCorrect: false },
      { id: "d", text: "1", isCorrect: false },
    ],
    difficulty: 5,
    topic: "algebra",
    explanation:
      "Expand 2(3x - 4) = 6x - 8, expand -3(2x + 1) = -6x - 3, combine like terms: 6x - 8 - 6x - 3 = -11",
    weight: 1,
  },
  {
    text: "Solve for x: 4(x - 2) = 3(x + 1)",
    options: [
      { id: "a", text: "x = 11", isCorrect: true },
      { id: "b", text: "x = 9", isCorrect: false },
      { id: "c", text: "x = 7", isCorrect: false },
      { id: "d", text: "x = 5", isCorrect: false },
    ],
    difficulty: 6,
    topic: "algebra",
    explanation:
      "Expand 4(x - 2) = 4x - 8, expand 3(x + 1) = 3x + 3, combine like terms: 4x - 8 = 3x + 3, subtract 3x from both sides: x - 8 = 3, add 8 to both sides: x = 11",
    weight: 2,
  },
  {
    text: "Simplify the expression: 5(2x - 3) - 3(3x + 2)",
    options: [
      { id: "a", text: "x - 21", isCorrect: true },
      { id: "b", text: "-x - 21", isCorrect: false },
      { id: "c", text: "x + 21", isCorrect: false },
      { id: "d", text: "-x + 21", isCorrect: false },
    ],
    difficulty: 6,
    topic: "algebra",
    explanation:
      "Expand 5(2x - 3) = 10x - 15, expand -3(3x + 2) = -9x - 6, combine like terms: 10x - 15 - 9x - 6 = x - 21",
    weight: 1,
  },
];
