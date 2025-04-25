import { ResponseSchema, SchemaType } from '@google/generative-ai';

export const PLANNER_MODEL_SCHEMA: ResponseSchema = {
  type: SchemaType.ARRAY,
  description: 'The planned tasks.',
  nullable: false,
  items: {
    type: SchemaType.OBJECT,
    description: 'The actions to take in the correct order.',
    properties: {
      type: {
        type: SchemaType.STRING,
        description: 'The type of the action to take.',
        nullable: false,
        format: 'enum',
        enum: [
          'create-dir',
          'create-file',
          'update-file',
          'delete-dir',
          'delete-file',
        ],
      },
      params: {
        type: SchemaType.OBJECT,
        description: 'The parameters for the task.',
        nullable: false,
        properties: {
          path: {
            type: SchemaType.STRING,
            description: 'The path to the file or directory.',
            nullable: false,
          },
          content: {
            type: SchemaType.STRING,
            description: 'The content of the file.',
            nullable: true,
          },
        },
      },
    },
  },
};
