import { z } from 'zod'
import { defPost } from '@/router'

export const post = defPost(
  z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(8).max(20),
  }),
  (q) => {
    return {
      name: q.username,
    }
  }
)
