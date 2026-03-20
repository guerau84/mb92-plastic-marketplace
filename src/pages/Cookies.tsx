import ExternalScript from '@/components/ExternalScript';
import { Cookie } from 'lucide-react'

function Cookies() {
    return (
        <>
            <div className='flex justify-center align-center p-20'>
                <p className='text-center font-bold flex justify-center align-center'><Cookie size={24}/><span className='p-2 text-xl'>Cookies</span></p>
            </div>
            <div className='text-center p-10'>
               <ExternalScript id="CookieDeclaration" src="https://consent.cookiebot.com/bcd7f3d1-ed69-41f4-af45-f0ba03976ebd/cd.js"/> 
            </div>
        </>
    )
}
export default Cookies;