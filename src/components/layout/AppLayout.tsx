import { ReactNode } from "react"
import LeftPane from "./LeftPane";

interface ChildrenProps {
    children: ReactNode
}
function AppLayout({ children }: ChildrenProps) {
    return (
        <div className="w-full h-[100vh] grid grid-cols-7">
            <div className="col-span-1 bg-white">
                <LeftPane />
            </div>
            <main className="col-span-6 lg:px-7 px-3 h-[100vh] overflow-y-auto py-5">{children}</main>
        </div>
    )
}

export default AppLayout;