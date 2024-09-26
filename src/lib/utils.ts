"use client"
import Cookies from "js-cookie"
import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"

export function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay))
}

export const isLocal = () => {
    const {host} = window.location
    return host.includes("localhost")
}

export const getSite = () => {
    let name = "main"

    const {host} = window.location
    const web = host.includes("example.co.uk")
    if (web && !isLocal()) {
        name = "web"
    } else if (!web && !isLocal()) {
        name = "main"
    } else {
        if (typeof localStorage !== "undefined" && isLocal()) {
            name = localStorage.getItem("site") || "main"
        }
    }
    return name
}

export const siteSwitch = (dispatch, currSite, setSite) => {
    let name = "main"
    if (currSite == null) {
        name = "web"
    }
    if (currSite == "main") {
        name = "web"
    }
    if (currSite == "web") {
        name = "main"
    }
    dispatch(
        setSite({
            site: name,
        }),
    )
}

export const convDate = (date) => {
    // const dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit' }
    date = date != null ? date : new Date()
    const dateOptions: Intl.DateTimeFormatOptions = {month: "2-digit", year: "2-digit"}
    return new Date(date).toLocaleDateString("en-GB", dateOptions)
}

let gqluri = `${process.env.SERVER_DEV}/graphql`
if (process.env.APP_ENV === "prod") {
    gqluri = `${process.env.SERVER_PROD}/graphql`
}
const token = Cookies.get("token")
export const appClient = (uri = gqluri, tkn = token) => {
    const httpLink = createHttpLink({
        uri,
        credentials: "include",
    })
    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                // authorization: token ? `Bearer ${tkn}` : "",
                authorization: tkn ? `${tkn}` : "",
            },
        }
    })
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })
}
