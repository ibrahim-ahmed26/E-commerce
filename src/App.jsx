
import { Provider } from "react-redux";
import AppLayout from "./components/AppLayout";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}
