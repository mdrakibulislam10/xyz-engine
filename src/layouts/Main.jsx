import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const Main = () => {
    return (
        <div className='mx-1 md:mx-12 my-1 md:my-4'>
            <Navbar />

            <Outlet />

            <Footer />
        </div>
    );
};

export default Main;