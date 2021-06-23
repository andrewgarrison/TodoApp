import { ColorProps } from '@chakra-ui/react';

export type Colors = ColorProps['color'];

export enum Categories {
  Productivity = 'PRODUCTIVITY',
  Errands = 'ERRANDS',
  Work = 'WORK',
  Cleaning = 'CLEANING',
  Fitness = 'FITNESS',
  Personal = 'PERSONAL',
  Other = 'OTHER',
}

export type CategoryNames = keyof typeof Categories;

export interface ITodo {
  title: string;
  id: string;
  description?: string;
  category?: CategoryNames;
  dueDate?: Date;
}

export type FormType = 'Add' | 'Edit';
