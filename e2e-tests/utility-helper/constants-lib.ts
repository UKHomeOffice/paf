import * as path from 'path';

export class ConstantsLib {
    static readonly PAF_SERVICE_NAME = 'PAF';
    static readonly TEXT = 'Text';
    static readonly FIRST_NAME = 'Firstname';
    static readonly LAST_NAME = 'Lastname';
    static readonly NICKNAME = 'Nickname';
    static readonly ADDRESS_LINE_1 = '49 Sydenham Road';
    static readonly ADDRESS_LINE_2 = 'Croydon';
    static readonly TOWN_OR_CITY = 'Croydon';
    static readonly COUNTY = 'Surrey';
    static readonly POSTCODE = 'CR0 2EE';
    static readonly COUNTRY = 'Poland';
    static readonly COUNTRY_UK = 'United Kingdom';
    static readonly NATIONALITY = 'Spain';
    static readonly AIRLINE = 'British Airways';
    static readonly TRAIN_COMPANY = 'Eurostar';
    static readonly ORGANISATION_TYPE = 'Restaurant';
    static readonly OCCUPATION = 'Chef';
    static readonly TELEPHONE = '02087364536';
    static readonly TRAVEL_DETAILS = '0000000000';
    static readonly SAS_HOF_EMAIL = requiredEnv('SAS_HOF_EMAIL');
    static readonly WEBSITE = 'https://www.example.com';
    static readonly COMPANY_NAME = 'Test UK Ltd';
    static readonly FLIGHT_NUMBER = 'BA123';
    static readonly DOB = '01/01/1980';
    static readonly FUTURE_DATE = '01/01/2099';
    static readonly DEPARTURE_TIME = '12:00';
    static readonly ARRIVAL_TIME = '13:00';
    static readonly UPLOAD_FILE = path.join(__dirname, '..', 'test-data', 'VPN_Guide_7.36MB.pdf');
    static readonly TIME_HOUR = '13';
    static readonly TIME_MINUTE = '45';
}


function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}