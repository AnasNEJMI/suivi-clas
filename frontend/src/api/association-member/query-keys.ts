
export const associationMemberQueryKeys = {
    me : ['association-member', 'profile'] as const,
    presenceStats : ['association-member', 'stats', 'presence'] as const,
    visitStats : ['association-member', 'stats', 'visits'] as const,
    animatorStats : ['association-member', 'stats', 'animators'] as const,
    qcmStats : ['association-member', 'stats', 'qcms'] as const,
}