
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface InsertUserInput {
    email: Email;
    firstName: string;
    lastName: string;
    password: string;
}

export interface SignupInput {
    email: Email;
    firstName: string;
    lastName: string;
    password: string;
}

export interface Auth {
    email: Email;
    token: string;
}

export interface LinkedIn {
    URL: string;
}

export interface IMutation {
    accessToken(code: string): boolean | Promise<boolean>;
    insertOne(user: InsertUserInput): User | Promise<User>;
    signup(user: SignupInput): Auth | Promise<Auth>;
}

export interface IQuery {
    getLinkedinURL(): LinkedIn | Promise<LinkedIn>;
    users(): User[] | Promise<User[]>;
}

export interface User {
    _id?: string;
    email: Email;
    firstName: string;
    lastName: string;
    password: string;
    userRole?: string;
}

export type Email = any;
