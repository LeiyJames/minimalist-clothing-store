export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  colors: {
    name: string;
    value: string;
  }[];
  modelPath: string;
  images: {
    main: string;
    details: string[];
  };
  features: string[];
  materials: {
    name: string;
    percentage: number;
  }[];
}
