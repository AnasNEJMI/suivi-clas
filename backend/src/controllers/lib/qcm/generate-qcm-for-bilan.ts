import { prisma } from '../../../db/prisma.js';
import { shuffle } from './helper-functions.js';

export async function generateQcmForBilan(bilanId : number, studentId: number, lessonId:number){
    const existing = await prisma.qcm.findUnique({ where: { bilanId }, select: { id: true } })
    if (existing) return existing;
    
    const bankQuestions = await prisma.qcmBankQuestion.findMany({
        where : {lessonId},
        select : {id : true, difficulty : true}})

    if(bankQuestions.length === 0) return null;

    const grouped = {
        e : bankQuestions.filter(q => q.difficulty === 'e'),
        m : bankQuestions.filter(q => q.difficulty === 'm'),
        h : bankQuestions.filter(q => q.difficulty === 'h'),
    };

    const selected = [...shuffle(grouped.e).slice(0, 4), ...shuffle(grouped.m).slice(0, 4), ...shuffle(grouped.h).slice(0, 2)]
    
    if(selected.length === 0) return null;

    return prisma.qcm.create({
        data : {studentId, bilanId, lessonId, qcmQuestions : {create : selected.map(q => ({bankQuestionId : q.id}))}},
        select : {id : true},
    })
}