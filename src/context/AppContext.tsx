import React, { useContext, useState } from "react";

type useAppProps = {
    drawer?: {
        drawerProgress: number,
        drawerStatus: number,
        setDrawerProgress: (param: any) => any,
        setDrawerStatus: (param: any) => any
    }
}

export const AppContext = React.createContext<useAppProps>({} as useAppProps)

const AppProvider: React.FC<AppProviderProps> = (props) => {

    const [drawerProgress, setDrawerProgress] = useState(0)
    const [drawerStatus, setDrawerStatus] = useState(0)

    return (
        <AppContext.Provider value={{
            drawer: {
                drawerProgress,
                drawerStatus,
                setDrawerProgress,
                setDrawerStatus
            }
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const app: useAppProps = useContext(AppContext)

    return app;
}

interface AppProviderProps {
    [key: string]: any
}

export default AppProvider;