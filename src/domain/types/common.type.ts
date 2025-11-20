import { FieldInputProps, FormikProps } from 'formik';

export type ID = string | number | undefined;

export interface Identifiable {
  id?: ID;
}

export interface BaseDTO extends Identifiable {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface RenderProps {
  field: FieldInputProps<string>;
  form: FormikProps<string>;
}
