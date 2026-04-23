import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Marketplace from "./components/Marketplace";
import WalletPage from "./components/WalletPage";
import WalletConnectModal from "./components/WalletConnectModal";
import { ConnectionProvider, useConnection } from "./context/ConnectionContext";

const GlobalWalletModal = () => {
  const { walletOpen, setWalletOpen, setConnection } = useConnection();
  return (
    <WalletConnectModal
      open={walletOpen}
      onClose={() => setWalletOpen(false)}
      onConnected={(data) => {
        setConnection(data);
        setWalletOpen(false);
      }}
    />
  );
};

function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/wallet" element={<WalletPage />} />
          </Routes>
          <GlobalWalletModal />
        </BrowserRouter>
      </ConnectionProvider>
    </div>
  );
}

export default App;
