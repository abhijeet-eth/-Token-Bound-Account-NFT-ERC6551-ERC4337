import {
  ThirdwebSDKProvider,
  useAddress,
  useBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import React from "react";
import {
  activeChain,
  nftDropAddress,
  tokenAddress,
} from "../../const/constants";
import { Signer } from "ethers";
import style from "../../styles/Token.module.css";
// import toast from "react-hot-toast";
// import toastStyle from "../../util/toastConfig";
interface ConnectedProps {
  signer: Signer | undefined;
}

interface ConnectedProps {
  signer: Signer | undefined;
}

const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer }) => {
  return (
    <ThirdwebSDKProvider signer={signer} activeChain={activeChain}>
      <ClaimTokens />
    </ThirdwebSDKProvider>
  );
};

const ClaimTokens = () => {
  const address = useAddress();
  const { data: tokenBalance } = useBalance(tokenAddress);
  return (
    <div>
      <p>Smart Wallet Address: {address}</p>
      <h1>Claim Tokens:</h1>
      <p>Token Balance: {tokenBalance?.displayValue}</p>
      <Web3Button
        contractAddress={tokenAddress}
        action={(contract) => contract.erc20.claim(10)}
      >
        Claim Tokens
      </Web3Button>
      <br />
      <h1>Claim NFT:</h1>
      <Web3Button
        contractAddress={nftDropAddress}
        action={(contract) => contract.erc1155.claim(0, 1)}
      >
        Claim NFT
      </Web3Button>
      
    </div>
  );
};

export default SmartWalletConnected;
