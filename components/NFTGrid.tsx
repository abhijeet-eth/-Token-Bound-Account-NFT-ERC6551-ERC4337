import {NFT as NFTType} from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NFT from "./NFT";
import {nftDropAddress} from "../const/constants";  

type Props = {
    isLoading: boolean;
    nfts:NFTType[] | undefined;
    emptyText?:string;
}

export default function NFTGrid({isloading, nfts, emptyText}:Props){
    return(
        <>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {nfts && nfts.length > 0 ? (
                        nfts.map((nft) => (
                            <Link
                                key = {nft.metadata.id}
                                href = {`/token/${nftDropAddress}/${nft.metadata.id}`}
                                className = {styles.card}
                            >
                                <NFT 
                                nft ={nft} />
                            </Link>
                        ))
                    ) : ( 
                        <p>{emptyText}</p>
                    ) }
                </div>
            </div>
        </>
    )
}