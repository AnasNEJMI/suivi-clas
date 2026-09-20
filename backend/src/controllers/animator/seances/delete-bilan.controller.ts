import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../../utils/response.utils.js";
import { prisma } from "../../../db/prisma.js";
import { ApiError } from "../../../classes/ApiError.class.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/internal/prismaNamespace.js";
import z from "zod";

const deleteBilanParamsSchema  = z.object({
    bilanId:   z.coerce.number().int().positive(),
});

type DeleteBilanResponse = {
    data : DeleteBilanEntry | null
}

type DeleteBilanEntry = {
    id : number,
    studentId : number,
    scolarYearId : number,
    seanceId : number,
    animatorId : number,
}
export async function animatorDeleteBilanHandler(
    req : Request,
    res : Response,
    next : NextFunction
){
    try{
        const parsed = deleteBilanParamsSchema.safeParse(req.params)
        if (!parsed.success) {
        throw ApiError.validationError('Paramètres invalides : ' + parsed.error.message)
        }

        const { bilanId }   = parsed.data
        const animatorId    = req.user!.id

        const bilan = await prisma.bilan.findUnique({
            where:  { id: bilanId },
            select: {
                id: true,
                studentId : true,
                submittedById : true,
                seance : {select : {id : true, scolarYearId : true}},
                qcm: {
                    select: {
                        id: true,
                    },
                },
            },
        })

        if (!bilan) {
        throw ApiError.internalError('Bilan introuvable.')
        }
    
        if (bilan.submittedById !== animatorId) {
        throw ApiError.unauthorized('Vous n\'êtes pas autorisé à supprimer ce bilan.')
        }

        await prisma.$transaction(async tx => {
            if (bilan.qcm) {
                await tx.qcmQuestion.deleteMany({
                    where: { qcmId: bilan.qcm.id },
                })
                await tx.qcm.delete({
                    where: { id: bilan.qcm.id },
                })
            }

            await tx.bilan.delete({
                where: { id: bilanId },
            })
        })

        return sendSuccess<DeleteBilanResponse>(res, { data : {
            id : bilan.id,
            studentId : bilan.studentId,
            animatorId : bilan.submittedById,
            seanceId : bilan.seance.id,
            scolarYearId : bilan.seance.scolarYearId!
        } })
    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            console.error('[animatorDeleteBilanHandler] Prisma error:', error);
            return next(ApiError.internalError());
        }
        next(error);
    }
}