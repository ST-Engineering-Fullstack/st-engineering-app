export enum ROUTE_NAME {
  CSV_MANAGEMENT = 'csv-management',
}
export const MY_ROUTE = {
  HOME: '/',
  NOT_FOUND: '*',
  CSV_MANAGEMENT: {
    self: `/${ROUTE_NAME.CSV_MANAGEMENT}`,
    edit: (id: string) => `/${ROUTE_NAME.CSV_MANAGEMENT}/${id}`,
  },
} as const; 