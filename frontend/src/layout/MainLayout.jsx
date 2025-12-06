import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';

const MainLayout = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
            <Navbar />
            
            <div className="flex flex-1 overflow-hidden">
                {/* Only show sidebar if user is logged in */}
                {user && <Sidebar />}
                
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
