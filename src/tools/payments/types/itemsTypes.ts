export interface Iitem {
    _id: string;
    name: string;
    type: 'TRAVEL_PACKAGE' | 'PROPERTY';
    description: string;
    price: number;
    location?: string;
    duration?: number; // For travel packages
    amenities?: string[]; // For properties
    images: string[];
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IBooking {
    userId : string ;  // set userId : ''  
    itemId : string ;                                      //* packageId or propertyId
    itemType : string ;                                    //* 'package' | 'property'
    status : 'initiated' | 'pending' | 'paid' | 'cancelled' ;            //* 'initiated' | 'reserved' | 'paid' | 'cancelled'
    totalPrice : number ;
    paymentId : string ;
    updatedAt : string ;
    paymentStatus : 'pending' | 'paid' | 'failed' ;
    expiresAt : Date ;

} 