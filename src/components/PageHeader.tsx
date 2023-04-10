import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

const lightColor = 'rgba(255, 255, 255, 0.7)';

export default function PageHeader({ title, toolbar, className }: { title: string, toolbar?: React.ReactNode | React.ReactNode[], className?: string }) {
    const toolbarItems =  Array.isArray(toolbar)? toolbar as React.ReactNode[] : [toolbar];

    return (
        <AppBar
            component="div"
            color="primary"
            position="static"
            elevation={0}
            sx={{ zIndex: 0 }}
            className={className}
        >
            <Toolbar>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs>
                        <Typography color="inherit" variant="h5" component="h1">
                            {title && title}
                        </Typography>
                    </Grid>

                    {toolbarItems.map((item, index) => (
                        <Grid key={index} item>
                            {item}
                        </Grid>
                    ))}
                </Grid>
            </Toolbar>
        </AppBar>

    )
}