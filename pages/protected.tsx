import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Copyright from "@/src/components/Copyright"
import Link from "@/src/components/Link"
import { protectedService } from '@/src/services';

export default function ProtectedPage() {
    const { data: session } = useSession()
    const [content, setContent] = useState()

    // Fetch content from protected route
    useEffect(() => {
        const fetchData = async () => {
            const json = await protectedService._protected();
            if (json.content) {
                setContent(json.content)
            }
        }
        fetchData()
    }, [session])

    // If no session exists, display access denied message
    if (!session) {
        return (
            <Container maxWidth="lg">
                <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <Typography variant="h4" component="h1" gutterBottom className="text-red">
                        Acces denied
                    </Typography>
                    <Button variant="contained" component={Link} noLinkStyle href="/">
                        Go to the home page
                    </Button>
                </Box>
            </Container>
        )
    }

    // If session exists, display content
    return (
        <Container maxWidth="lg">
        <Box
            sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Protected Page
            </Typography>
            <strong>{content ?? "\u00a0"}</strong>
            <Box maxWidth="sm">
                <Button variant="contained" component={Link} noLinkStyle href="/">
                    Go to the home page
                </Button>
            </Box>
            <Copyright />
        </Box>
        </Container>
    )
}