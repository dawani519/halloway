export type Shipment = {
    id: string;
    destination: string;
    cost: number;
    status: string;
    createdAt: EpochTimeStamp;
    tracking_number: string;
  };
  