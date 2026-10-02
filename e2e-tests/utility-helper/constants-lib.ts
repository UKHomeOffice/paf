import * as path from 'path';

export const ConstantsLib = {
    PAF_SERVICE_NAME: 'PAF',
    TEXT: 'Text',
    FIRST_NAME: 'Firstname',
    LAST_NAME: 'Lastname',
    NICKNAME: 'Nickname',
    ADDRESS_LINE_1: '49 Sydenham Road',
    ADDRESS_LINE_2: 'Croydon',
    TOWN_OR_CITY: 'Croydon',
    COUNTY: 'Surrey',
    POSTCODE: 'CR0 2EE',
    COUNTRY: 'Poland',
    COUNTRY_UK: 'United Kingdom',
    NATIONALITY: 'Spain',
    AIRLINE: 'British Airways',
    TRAIN_COMPANY: 'Eurostar',
    ORGANISATION_TYPE: 'Restaurant',
    OCCUPATION: 'Chef',
    TELEPHONE: '02087364536',
    TRAVEL_DETAILS: '0000000000',
    SAS_HOF_EMAIL: requiredEnv('SAS_HOF_EMAIL'),
    WEBSITE: 'https://www.example.com',
    COMPANY_NAME: 'Test UK Ltd',
    FLIGHT_NUMBER: 'BA123',
    DOB: '01/01/1980',
    FUTURE_DATE: '01/01/2099',
    DEPARTURE_TIME: '12:00',
    ARRIVAL_TIME: '13:00',
    UPLOAD_FILE: path.join(__dirname, '..', 'test-data', 'VPN_Guide_7.36MB.pdf'),
    TIME_HOUR: '13',
    TIME_MINUTE: '45',
} as const;


function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}