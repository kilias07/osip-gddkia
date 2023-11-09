// "use client";

// import React, {
//   ReactNode,
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// // import { type Cart } from "@/api/types";

// // const useMasurementsState = () => useState<>([]);

// // export const CartContext = createContext<
// //   ReturnType<typeof useMasurementsState> | []
// // >([]);

// // export const useMasurments = () => {
// //   const measurements = useContext(CartContext);
// //   if (!measurements) {
// //     throw new Error("useMeasurements must be used within a CartProvider");
// //   }
// //   return measurements;
// // };

// // const CartProvider = ({ children }: { children: ReactNode }) => {
// //   const [measurements, setmMasurements] = useMasurementsState();

// //   return (
// //     <CartContext.Provider value={[measurements, setmMasurements]}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export default CartProvider;

// interface AppState {
//   counter: number;
//   // Add other state properties here
// }

// interface AppContextProps {
//   appState: AppState;
//   incrementCounter: () => void;
//   resetCounter: () => void;
// }

// export const AppContext = createContext<AppContextProps | null>(null);

// const AppProvider: React.FC = ({ children }) => {
//   const [appState, setAppState] = useState<AppState>({
//     counter: 0,
//     // Initialize other state properties here
//   });

//   useEffect(() => {
//     const storedState = sessionStorage.getItem("appState");
//     if (storedState) {
//       setAppState(JSON.parse(storedState));
//     }
//   }, []);

//   useEffect(() => {
//     sessionStorage.setItem("appState", JSON.stringify(appState));
//   }, [appState]);

//   const incrementCounter = () => {
//     setAppState((prevState) => ({
//       ...prevState,
//       counter: prevState.counter + 1,
//     }));
//   };
//   const resetCounter = () => {
//     setAppState((prevState) => ({
//       ...prevState,
//       counter: 0,
//     }));
//   };
//   return (
//     <AppContext.Provider value={{ appState, incrementCounter, resetCounter }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
// export default AppProvider;
