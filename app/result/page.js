'use client'
import { useEffec, useState } from "react"
import {useRouter} from 'next/navigation'
import getStripe from "@/utils/get-stripe"
import {useSearchParams} from 'next/navigation'

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchCheckoutSession = async () => {
            if (!session_id) return

            try {
                const res = await fetch(
                    '/api/checkout_session?session_id=${session_id}',
                )
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                setError('An error has occured')
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if (loading){
        return(
            <Container maxWidth = "100vw" sx={{
                textAlign: 'center', mt: 4
            }}>
                <CircularProgress />
                <Typography variant="h6"> Loading... </Typography>
            </Container>
        )
    }

    if (error){
        
    }
}