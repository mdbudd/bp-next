import blogs from "@/components/Drawer/page-list.json"

function generateSiteMap(posts, host) {
    if (host.includes("example.co.uk")) {
        return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${`${host}`}</loc>
     </url>
     ${posts
         .map((item) => {
             if (item.slug !== "/") {
                 return `
       <url>
           <loc>${`${host}blog/${item.slug}`}</loc>
       </url>
     `
             }
         })
         .join("")}
   </urlset>
 `
    } else {
        return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>${`${host}`}</loc>
      </url>
     
    </urlset>
  `
    }
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(context) {
    let protocol = "http://"
    if (process.env.APP_ENV === "prod") {
        protocol = "https://" // change when going live live
    }
    let url = new URL(`${protocol}${context.req.headers.host}`)
    // We generate the XML sitemap with the posts data
    const sitemap = await generateSiteMap(blogs, url.toString())

    context.res.setHeader("Content-Type", "text/xml")
    // // we send the XML to the browser
    context.res.write(sitemap)
    context.res.end()

    return {
        props: {},
    }
}

export default SiteMap