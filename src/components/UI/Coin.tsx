// Make sure to import your images
import sparkles from '../../assets/images/coins/sparklesS.gif';
import cb from '../../assets/images/coins/BronzeCoinR.png';
import cs from '../../assets/images/coins/SilverCoinR.png';
import cg from '../../assets/images/coins/GoldCoinR.png';
import cd from '../../assets/images/coins/RainbowCoinR.png';


export type coinType = "gold" | "silver" |"bronze"|"diamond"

const coinBind = {
    "bronze" : cb,
    "silver" : cs,
    "gold" : cg,
    "diamond" : cd 
} as const

type propCoin = {
    type : coinType
}

const Coin = (props : propCoin) => {
  return (
    // 1. Container: 'relative' establishes the stacking context
    // 'inline-block' keeps the div size wrapped around the image
    <div className="relative inline-block">
      
      {/* 2. Base Layer: The Coin */}
      <img 
        src={coinBind[props.type]} 
        alt="Gold Coin" 
        className="w-full h-full object-contain"
      />

      {/* 3. Overlay Layer: The Sparkles */}
      {/* 'absolute' takes it out of flow, 'inset-0' stretches it to edges */}
      {props.type == "gold" || props.type == "diamond" ? <img 
        src={sparkles} 
        alt="Sparkles" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90" 
      /> : <></>}
      
    </div>
  );
};

export default Coin;