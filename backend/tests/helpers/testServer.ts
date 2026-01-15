import {Express} from 'express';
import app from '../../src/app'

let server : Express;

export function getTestServer() : Express{
    if(!server){
        server = app;
    }

    return server;
}