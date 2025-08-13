import GlobalNavBar from "../components/NavBars/NavBar_1";
import { redirect } from "next/navigation";

export default function Page() {
    return (
        redirect("/admin/dashboard")
    );
}
