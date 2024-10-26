import { z } from "zod";
export type Tool = {
  title: string;
  name: string;
  description: string;
  icon: string;
  overview: {
    title: string;
    description: string;
    features: string[];
  };
  schema: z.ZodTypeAny;
};
export const createField = <T extends z.ZodTypeAny>(
  schema: T,
  config: {
    label: string;
    placeholder: string;
    type: "text" | "number" | "checkbox" | "toggle" | "file";
  }
) => {
  return schema.describe(JSON.stringify(config));
};
export const lessonPlanSchema = z.object({
  title: createField(z.string(), {
    label: "Title",
    placeholder: "Lesson Plan Title",
    type: "text",
  }),
  gradeLevel: createField(z.string(), {
    label: "Grade Level",
    placeholder: "Lesson Plan Grade Level",
    type: "text",
  }),
  subject: createField(z.string(), {
    label: "Subject",
    placeholder: "Lesson Plan Subject",
    type: "text",
  }),
});
export const quizSchema = z.object({
  title: createField(z.string(), {
    label: "Title",
    placeholder: "Quiz Title",
    type: "text",
  }),
  gradeLevel: createField(z.string(), {
    label: "Grade Level",
    placeholder: "Quiz Grade Level",
    type: "text",
  }),
  subject: createField(z.string(), {
    label: "Subject",
    placeholder: "Quiz Subject",
    type: "text",
  }),
  numberOfQuestions: createField(z.number(), {
    label: "Number of Questions",
    placeholder: "Number of Questions",
    type: "number",
  }),
});
export const toolsConfig: Tool[] = [
  {
    title: "Lesson Plan",
    name: "lessonplan",
    description: "Create comprehensive and engaging lesson plans",
    icon: "📚",
    overview: {
      title: "Lesson Plan Generator",
      description:
        "Streamline your lesson planning process with our intuitive tool",
      features: [
        "Customizable templates for various subjects and grade levels",
        "Integration with curriculum standards",
        "Activity and resource suggestions",
        "Learning objectives and assessment alignment",
        "Time management and pacing guides",
      ],
    },
    schema: lessonPlanSchema,
  },
  {
    title: "Quiz Creator",
    name: "quizcreator",
    description: "Design effective quizzes and assessments",
    icon: "🧪",
    overview: {
      title: "Interactive Quiz Builder",
      description: "Create engaging quizzes to assess student understanding",
      features: [
        "Multiple question types (multiple choice, short answer, etc.)",
        "Automatic grading and feedback options",
        "Customizable difficulty levels",
        "Question bank for easy reuse",
        "Analytics and performance tracking",
      ],
    },
    schema: quizSchema,
  },
];

export const prompts = {
  lessonplan: (formData: FormData) => {
    const title = formData.get("title");
    const gradeLevel = formData.get("gradeLevel");
    const subject = formData.get("subject");

    return `
    You are an expert learning assistant. Generate a comprehensive learning plan based on the following content:
    title: ${title}
    gradeLevel: ${gradeLevel}
    subject: ${subject}

    ${followFormat("learning plan")}
    
    `;
  },
  quizcreator: (formData: FormData) => {
    const title = formData.get("title");
    const gradeLevel = formData.get("gradeLevel");
    const subject = formData.get("subject");
    const numberOfQuestions = formData.get("numberOfQuestions");
    return `
    You are an expert learning assistant. Generate a quiz based on the following content:
    title: ${title}
    gradeLevel: ${gradeLevel}
    subject: ${subject}
    numberOfQuestions: ${numberOfQuestions}

    ${followFormat("quiz")}
    `;
  },
};

const followFormat = (type: string) => {
  return `Choose the appropriate elements to structure the ${type} effectively using TipTap editor possible elements. The content should follow this format:

{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [{ "type": "text", "text": "Main Title" }]
    },
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "Paragraph content" }]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "List item" }] }]
        }
      ]
    }
    // ... other elements as needed
  ]
}

Use your judgment to decide where to use each element type to create a well-structured and readable lesson plan.`;
};
