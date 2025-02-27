import "./Hero.css"
import akatsukiteam from "../../assets/img/akatsukiteam.png"
import FuzzyText from "../../blocks/TextAnimations/FuzzyText/FuzzyText"

const Hero = () => {
    return (
        <section>
            <div className="akatsuki-title">
                <FuzzyText
                    fontSize="15rem"
                    fontWeight={900}
                    fontFamily="Roboto"
                    color="#fff"
                    enableHover={true}
                    baseIntensity={0.18}
                    hoverIntensity={0.5}
                >
                    AKATSUKI
                </FuzzyText> 
                
                <span className="akatsuki-kanji">暁</span>
            </div>

            <div className='hero'>
                <img src={akatsukiteam} alt="" />
            </div>
        </section>
    )
}

export default Hero