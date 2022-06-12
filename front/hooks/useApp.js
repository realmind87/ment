import { useContext } from 'react';
import { AppContext } from '../pages/_app';

const useApp = () => {
    return useContext(AppContext)
}

export default useApp;