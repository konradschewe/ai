import { ResponseSchema, SchemaType } from '@google/generative-ai';
import { TaskType } from './task';

export const PLANNER_MODEL_SCHEMA: ResponseSchema = {
  type: SchemaType.OBJECT,
  description: 'The schema for the planner model.',
  nullable: false,
  properties: {
    inquiries: {
      type: SchemaType.ARRAY,
      description: 'The inquiries to make.',
      nullable: false,
      items: {
        type: SchemaType.STRING,
        description: 'The inquiry to make.',
        nullable: false,
      },
    },
    tasks: {
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
            enum: Object.values(TaskType),
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
              fileContent: {
                type: SchemaType.STRING,
                description: 'The content of the file.',
                nullable: true,
              },
              command: {
                type: SchemaType.STRING,
                description: 'The command to run including all arguments.',
                nullable: true,
              },
            },
          },
        },
      },
    },
  },
};
