import { Request, Response, NextFunction } from 'express'
import z from 'zod'
import { prisma } from '../../db/prisma.js'
import { ApiError } from '../../classes/ApiError.class.js'
import { sendSuccess } from '../../utils/response.utils.js'
import { PrismaClientKnownRequestError } from '../../generated/prisma/internal/prismaNamespace.js'

const paramsSchema = z.object({ bilanId: z.coerce.number().int().positive() })

// Opening the same bilan again within this window is the same "reading"
const READING_WINDOW_MS = 30 * 60 * 1000

// POST /api/student/bilans/:bilanId/view
export async function studentBilanViewHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = paramsSchema.safeParse(req.params)
    if (!parsed.success) throw ApiError.validationError('Paramètres invalides.')

    const studentId = req.user!.id
    const { bilanId } = parsed.data

    // A student can only mark their own bilans
    const bilan = await prisma.bilan.findFirst({ where: { id: bilanId, studentId }, select: { id: true } })
    if (!bilan) throw ApiError.unauthorized('Bilan introuvable.')

    const now         = new Date()
    const windowStart = new Date(now.getTime() - READING_WINDOW_MS)

    const tracked = await prisma.$transaction(async tx => {
      // Atomic throttle: if two requests arrive together, only one passes
      const { count } = await tx.bilan.updateMany({
        where: {
          id: bilanId, studentId,
          OR: [{ lastViewedAt: null }, { lastViewedAt: { lt: windowStart } }],
        },
        data: { viewCount: { increment: 1 }, lastViewedAt: now },
      })
      if (count === 0) return false   // same reading, already counted

      await tx.bilan.updateMany({ where: { id: bilanId, firstViewedAt: null }, data: { firstViewedAt: now } })
      return true
    })

    return sendSuccess(res, { tracked })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('[studentBilanViewHandler] Prisma error:', error)
      return next(ApiError.internalError())
    }
    next(error)
  }
}