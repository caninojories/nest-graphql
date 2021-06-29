
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface FiltersInput {
    name: string;
    subFilter: Sub;
}

export interface InsertOneInput {
    count: number;
    filters: string[];
    lastName: string;
    name: string;
}

export interface SignupInput {
    email: Email;
    firstName: string;
    lastName: string;
    password: string;
}

export interface Sub {
    category: string[];
    naics: string[];
    sic: string[];
}

export interface AuthType {
    email: Email;
    token: string;
}

export interface CompanyModel {
    _id?: string;
    industry?: Industry;
    name?: string;
}

export interface ContactModel {
    _id?: string;
    company?: CompanyModel;
    firstName: string;
    lastName: string;
}

export interface CreditHistoryModel {
    _id?: string;
    amount: number;
    updateAt: DateTime;
    value: number;
}

export interface FilterModel {
    _id?: string;
    description?: string;
    name: string;
    subFilter: SubFilter;
}

export interface Industry {
    category: string;
    naics: string;
    sic: string;
}

export interface LinkedInType {
    URL: string;
}

export interface Linkedin {
    accessToken: string;
    expiresIn: number;
}

export interface ListModel {
    _id?: string;
    count: number;
    filters: FilterModel[];
    name: string;
    timesDownloaded: number;
    user: UserModel;
}

export interface IMutation {
    accessToken(code: string): AuthType | Promise<AuthType>;
    insertOne(list: InsertOneInput): ListModel | Promise<ListModel>;
    signup(user: SignupInput): AuthType | Promise<AuthType>;
}

export interface IQuery {
    findMany(filters: FiltersInput[]): ContactModel[] | Promise<ContactModel[]>;
    getLinkedinURL(): LinkedInType | Promise<LinkedInType>;
    users(): UserModel[] | Promise<UserModel[]>;
}

export interface SubFilter {
    category: string[];
    naics: string[];
    sic: string[];
}

export interface SubscriptionStripeModel {
    _id?: string;
    cost: number;
    description: string;
    name: string;
}

export interface UserModel {
    _id?: string;
    email: Email;
    firstName: string;
    lastName: string;
    linkedin?: Linkedin;
    password?: string;
    phoneNumber?: string;
}

export type DateTime = any;
export type Email = any;
