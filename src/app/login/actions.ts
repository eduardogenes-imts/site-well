'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const password = formData.get('password')
  
  // A senha para acessar será "admin" provisoriamente ou lida da variável de ambiente
  const VALID_PASSWORD = process.env.SITE_PASSWORD || 'welldone'

  if (password === VALID_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('site-auth', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 semana
    })
    
    redirect('/')
  }
  
  return { error: 'Senha incorreta' }
}
