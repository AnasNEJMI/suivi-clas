
import {Request, Response, NextFunction} from 'express';
import { prisma } from '../db/prisma.js';
import { ApiError } from '../classes/ApiError.class.js';
import { comparePassword } from '../utils/auth.utils.js';
import { createSession } from '../utils/session.utils.js';
import { SESSION_CONFIG } from '../configs/session.config.js';
import { sendSuccess } from '../utils/response.utils.js';
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.js';
import { User, UserType } from '../types/data.types.js';
import { Gender } from '../generated/prisma/enums.js';

type LoginInput = {
    username : string,
    password : string,
    userType : UserType
}

type loginSuccessResponse = {
    user : User
}


export async function loginHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const {username, password, userType} = req.body as LoginInput;
        console.log('username :', username);
        console.log('password :', password);
        
        //animator login
        if(userType === 'animator'){
            const animator = await prisma.animator.findUnique({
                where : {
                    username : username
                }
            });

            console.log('animator retrieved : ', animator);

            if(!animator){
                throw ApiError.invalidCredentials();
            }

            const isPasswordValid = await comparePassword(password, animator.passwordHash);

            if(!isPasswordValid){
                throw ApiError.invalidCredentials();
            }

            //create session
            const session = await createSession(
                'animator',
                animator.id,
                req.ip,
                req.headers['user-agent']
            )

            //set cookie
            res.cookie(
                SESSION_CONFIG.COOKIE_NAME,
                session.id,
                SESSION_CONFIG.COOKIE_OPTIONS
            )

             //return response
            return sendSuccess<loginSuccessResponse>(
                res,
                {
                    user : {
                        id : animator.id,
                        username : animator.username,
                        firstName : animator.firstName,
                        lastName : animator.lastName,
                        userType : 'animator',
                        gender : animator.gender === Gender.f? 'f' : 'm',
                        class : null,
                        level : null,
                        association : null,
                        createdAt : animator.createdAt,
                    }
                }
            )
        }

        //student login
        if(userType === 'student'){
            const student = await prisma.student.findUnique({
                where : {
                    username : username
                },
                include : {
                    class : {
                        select : {
                            id : true,
                            label : true,
                            association : {
                                select : {
                                    id : true,
                                    label : true,
                                }
                            }
                        }
                    },
                    level : {
                        select : {
                            id : true,
                            label : true,
                        }
                    }
                }
            });

            console.log('student retrieved : ', student);

            if(!student){
                throw ApiError.invalidCredentials();
            }

            if(!student.class){
                throw ApiError.invalidCredentials();
            }

            if(!student.level){
                throw ApiError.invalidCredentials();
            }

            if(!student.class.association){
                throw ApiError.invalidCredentials();
            }

            const isPasswordValid = await comparePassword(password, student.passwordHash);

            if(!isPasswordValid){
                throw ApiError.invalidCredentials();
            }

            //create session
            const session = await createSession(
                'student',
                student.id,
                req.ip,
                req.headers['user-agent']
            )

            //set cookie
            res.cookie(
                SESSION_CONFIG.COOKIE_NAME,
                session.id,
                SESSION_CONFIG.COOKIE_OPTIONS
            )

             //return response
            return sendSuccess<loginSuccessResponse>(
                res,
                {
                    user : {
                        id : student.id,
                        username : student.username,
                        firstName : student.firstName,
                        lastName : student.lastName,
                        userType : 'student',
                        gender : student.gender === Gender.f? 'f' : 'm',
                        class : {id : student.class.id, label : student.class.label}, //todo
                        level : {id : student.level.id, label : student.level.label},
                        association : {id : student.class.association.id, label : student.class.association.label},
                        createdAt : student.createdAt,
                    }
                }
            )
        }

        //associationMember login
        if(userType === 'associationMember'){
            const associationMember = await prisma.associationMember.findUnique({
                where : {
                    username : username
                },
                include : {
                    association : {
                        select : {
                            id : true,
                            label : true,
                        }
                    }
                }
            });

            console.log('associationMember retrieved : ', associationMember);

            if(!associationMember){
                throw ApiError.invalidCredentials();
            }

            if(!associationMember.association){
                throw ApiError.invalidCredentials();
            }

            const isPasswordValid = await comparePassword(password, associationMember.passwordHash);

            if(!isPasswordValid){
                throw ApiError.invalidCredentials();
            }

            //create session
            const session = await createSession(
                'associationMember',
                associationMember.id,
                req.ip,
                req.headers['user-agent']
            )

            //set cookie
            res.cookie(
                SESSION_CONFIG.COOKIE_NAME,
                session.id,
                SESSION_CONFIG.COOKIE_OPTIONS
            )

             //return response
            return sendSuccess<loginSuccessResponse>(
                res,
                {
                    user : {
                        id : associationMember.id,
                        username : associationMember.username,
                        firstName : associationMember.firstName,
                        lastName : associationMember.lastName,
                        userType : 'associationMember',
                        gender : associationMember.gender === Gender.f? 'f' : 'm',
                        class : null, //todo
                        level : null,
                        association : {id : associationMember.association.id, label : associationMember.association.label},
                        createdAt : associationMember.createdAt,
                    }
                }
            )
        }
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            console.log('prisma error : ', error);
            next(ApiError.internalError())
        }else{
            next(error);
        }
    }
}