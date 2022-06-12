import { useEffect, useState } from "react";

export const useResize = () => {
    const [device, setDevice] = useState(null);
    useEffect(()=>{
        setDevice(window.innerWidth >= 758 ? "desktop" : "mobile")
    }, []);
    return device;
}