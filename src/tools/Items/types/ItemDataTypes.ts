// ? ################### Category Types for TS
  interface IOption {
      name: string;
      values: string[];
    }
  export interface ICategory {
      name: string;
      slug: string;
      description?: string;
      parent?: string;
      options: IOption[];
      image?: string;
      isActive: boolean;
    }
// ? ################### Category Types for TS
// ? ################### Item Types for TS
    interface IVariantOption {
      name: string; //color :red
      value: string; //size:lg
    }
    interface IVariant {
      options: IVariantOption[];
      images: { secure_url: string; publicId: string }[];
      price: number | null ;
      inventory: boolean | null
    }
    export interface IItems {
      _id?: string ;
      name: string;
      description: string;
      recommended : boolean;
      images: { secure_url: string; publicId: string }[];
      variants: IVariant[];
      price: number | null;
      discount: number | null;
      category: string ;
      shortDesc: string;
      inventory: number | null;

    }
// ? ################### Item Types for TS
