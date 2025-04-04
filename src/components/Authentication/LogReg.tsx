import React from "react"
import Login from "./Login"
import Register from "./Register"
import {Box, Tab, Tabs, Typography} from "@mui/material"

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}
const LogReg = (props) => {
    const {user} = props
    const isAuthed = user.name !== null && user.roles !== null

    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box sx={{width: "100%"}}>
            {!isAuthed && (
                <>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            centered
                        >
                            <Tab label="Login" {...a11yProps(0)} />
                            <Tab label="Register" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box>
                            <Login />
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box>
                            <Register />
                        </Box>
                    </CustomTabPanel>
                </>
            )}

            {isAuthed && <Register />}
        </Box>
    )
}
export default LogReg
