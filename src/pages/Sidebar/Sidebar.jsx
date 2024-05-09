import { Link } from "react-router-dom"
import nav from "./Sidebar.module.css"
export default function Navbar(){
return(
    <nav className={nav.navbar}>
        <ul className={nav.list}  id={nav.header_list} >
            <li>
                <Link to="Dashboard">
                <img className={nav.img_sid} src="/images/dashboard.png" alt="dashboard"/>
                <span className={nav.nav_item}>Tableau de Board</span>
                </Link>
            </li>
            <li>
                <Link to="/project">
                <img className={nav.img_sid} src="/images/project.png" alt="dashboard img"/>
                <span className={nav.nav_item}>Projets</span>
                </Link>
            </li>
            <li>
                <Link to="/departements">
                <img className={nav.img_sid} src="/images/chat.png" alt="dashboard img"/>
                <span className={nav.nav_item}>Forum Thématique</span>
                </Link>
            </li>
        </ul>

        <ul className={nav.list}  id={nav.footer_list}>
        <li>
                <Link to="/login">
                <img className={nav.img_sid} src="/images/disconnect.png" alt="dashboard img"/>
                <span className={nav.nav_item}>Se déconnecter</span>
                </Link>
            </li>

            <li className={nav.img_sid_pos}>
                <Link to="#">
                <img className={nav.img_sid} src="/images/param.png" alt="dashboard img"/>
                <span className={nav.nav_item}>Réglages</span>
                </Link>
            </li>

        </ul>


    </nav>
)


}









// import { Link } from "react-router-dom"
// import sid from "./Sidebar.module.css"
// export default function Navbar(){
// return(
//     <nav className={sid.nav_sid}>
    
//         <ul className={sid.header_list}>
//             <li className={sid.list_li}>
//                 <Link to="Dashboard">
//                 <img src="/icon.png" alt="/images/dashboard" img/>
//                 <span className={sid.nav_item}>Tableau de Board</span>
//                 </Link>
//             </li>
//             <li className={sid.list_li}>
//                 <Link to="/project">
//                 <img className={sid.img_sid} src="/images/project.png" alt="dashboard img"/>
//                 <span className={sid.nav_item}>Projets</span>
//                 </Link>
//             </li>
//             <li className={sid.list_li}>
//                 <Link to="/Messagerie">
//                 <img className={sid.img_sid} src="/images/chat.png" alt="dashboard img"/>
//                 <span className={sid.nav_item}>Forum Thématique</span>
//                 </Link>
//             </li>
//         </ul>

//         <ul className={sid.footer_list}>
        
//         <li className={sid.list_li}>
//                 <Link to="/login">
//                 <img className={sid.img_sid} src="/images/disconnect.png" alt="dashboard img"/>
//                 <span className={sid.nav_item}>Se déconnecter</span>
//                 </Link>
//             </li>

//             <li className={sid.list_li}>
//                 <Link to="#">
//                 <img className={sid.img_sid} src="/images/param.png" alt="dashboard img"/>
//                 <span className={sid.nav_item}>Réglages</span>
//                 </Link>
//             </li>
//         </ul>
//         <img className={sid.vector_sid} src="/images/vectorsidebar.png" alt="dashboard img"/>

//     </nav>
// )

// }