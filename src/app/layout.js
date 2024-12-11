//import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/componets/menu";
import Script from "next/script";

//import NarBar from "@/componets/menu";
export const metadata={
    title:"- web con next -",
    deScription:"Frontend para aplicacion web"
}
export default function RootLayout({children}){
    return(
        <html>
            <body>
                <NavBar/>
                {children}
                <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous"></Script>
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossOrigin="anonymous"></Script>
            </body>
        </html>
    );
}