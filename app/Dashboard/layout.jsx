import Sidebar from "@/components/Sidebar"
import Propnavbar from "@/components/PropietarioNav"
import {getCurrentUser} from '@/util/getUser.js'

export default async function DashboardLayout({ children }) {

    const propietario = await getCurrentUser()
    return (
        
        <>
            <Propnavbar propietario={propietario}></Propnavbar>
            <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 70px)' }}>
                <Sidebar />
                <main  style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: '#f4f6f8'
                }}>
                    {children}
                </main>
            </div>
        </>
    )
}