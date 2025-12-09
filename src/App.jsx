
import { Provider } from "react-redux";
import AppLayout from "./components/AppLayout";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout />
      <Toaster position="top-center" reverseOrder={false}/>
    </Provider>
  );
}
